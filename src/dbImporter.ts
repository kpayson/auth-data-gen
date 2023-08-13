
import { PoolConfig } from 'mariadb';
import { IDBService, MariaDBService } from './dbService'
import { difference, keyBy } from 'lodash';
import { GraphNode, topologicalSort } from './graphUtil';

type FKValuesMap = {[tableName:string]:{[oldKey:string|number]:string|number}};
type InsertErrorInfo = {tableName:string, rowData:any, exception:any};

export class DBImporter {
    private dbService: IDBService;

    constructor(dbConfig: PoolConfig) {
        this.dbService = new MariaDBService(dbConfig)
    }

    private async topoSortTables(tableNames:string[]) {
        const tableDependencyPairs = await this.dbService.tableDependencies(tableNames)
        const dbGraphNodes = tableNames.map(name=> new GraphNode(name));
        const nodeLookup = keyBy(dbGraphNodes, x=>x.value);
        for(const pair of tableDependencyPairs) {
            const node1 = nodeLookup[pair.tableName]
            const node2 = nodeLookup[pair.referencedTableName];
            node2.addNeighbor(node1);
        };
        const sortedNodes = topologicalSort(dbGraphNodes);
        const sortedEntities = sortedNodes.map(x=>x.value);
        return sortedEntities;
    }

    private async insertTableData(tableName: string, rows:any[], fkValuesMap:FKValuesMap) {

        const insertErrors:InsertErrorInfo[] = [];

        const pkField = (await this.dbService.tableAutoPkFields(tableName))[0];
        const tableFields = await this.dbService.allEntityFields(tableName);
        const tableFieldsLookup = keyBy(tableFields, x=>x.fieldName);
        const foreignKeyFields = await this.dbService.foreignKeyFields(tableName);
        const foreignKeyFieldsLookup = keyBy(foreignKeyFields, x=>x.fieldName);
        const pkOldNewMap:{[oldKey:string|number]:string|number} = {};

        for(const row of rows){
            try {
                const objectFields = Object.keys(row);                
                const insertFields = difference(objectFields,[pkField]);
                const insertValues = insertFields.map((fieldName:string)=>{
                    const v = row[fieldName];

                    // if the column is a datetime or timestamp column replace string with Date object
                    const dataType = tableFieldsLookup[fieldName].dataType;
                    const v2 = (v != null) && (dataType === 'datetime' || dataType === 'timestamp') ? new Date(v) : v;

                    // if the column is a foreign key column get the referenced table and then the new pk value 
                    const foreignTable = foreignKeyFieldsLookup[fieldName]?.foreignEntityName || '';
                    const v3 = fkValuesMap[foreignTable] ? (fkValuesMap[foreignTable][v2] || v2) : v2;

                    return v3;
                });
                const insertFieldList = insertFields.join(",");

                const valuePlaceHolderList = [...Array(insertFields.length).keys()].map(()=>'?').join(',');
                const insertQuery = `INSERT INTO \`${tableName}\` (${insertFieldList}) Values(${valuePlaceHolderList})`;
                const queryRes = await this.dbService.insert(insertQuery, insertValues);
                pkOldNewMap[row[pkField]] = queryRes.insertId;
                console.log(queryRes);

            }
            catch(e) {
                insertErrors.push({tableName,rowData:row,exception:e});
                console.error(e);
            }
        }
        return {pkOldNewMap, insertErrors};        
    }

    async importDB(data:{[entityName:string]:any[]}) {

        const tablesWithCols = await this.dbService.tablesWithColumns();

        const tableNames = Object.keys(data);
        const sortedTableNames = await this.topoSortTables(tableNames);
        let insertErrors:any[] = [];
        let fkValuesMap:FKValuesMap = {};

        for(const tableName of sortedTableNames) {
            const rows = data[tableName];
            const res = await this.insertTableData(tableName, rows, fkValuesMap);
            insertErrors = insertErrors.concat(res.insertErrors);
            fkValuesMap[tableName] = res.pkOldNewMap;
        }

        return insertErrors;
    }

}