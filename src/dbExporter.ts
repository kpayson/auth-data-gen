
import { PoolConfig } from 'mariadb';
import { IDBService, MariaDBService, TableDependencyPair} from './dbService'
import { difference, keyBy } from 'lodash';
import { GraphNode, topologicalSort } from './graphUtil';


// look up from the table name to a list of possible primary key values for that table in the subset of data being exported
export type ForeignKeyValuesLookup = { [entityName: string]: number[] }

export interface ExportEntity {
    // Table name
    name: string 

    // Table Primary key field - default=id
    primaryKeyField?: string;  

    // where clause restrictions against table ex ["color='blue'", "size > 10"]
    filters?: string[]; 

    // the columns to be in the export json - default=*
    exportFields?: "*" | string[];

    // Can be used in conjunction with exportFields='*' to take everything except certain fields
    excludedFields?: string[];
}

export class DbExporter {

    private dbService: IDBService;

    constructor(dbConfig: PoolConfig) {
        this.dbService = new MariaDBService(dbConfig)
    }

    private async topoSortEntities(entities:ExportEntity[]) {
        const tableNames = entities.map(e=>e.name);
        const tableDependencyPairs = await this.dbService.tableDependencies(tableNames)
        const dbGraphNodes = entities.map(entity=> new GraphNode(entity));
        const nodeLookup = keyBy(dbGraphNodes, x=>x.value.name);
        for(const pair of tableDependencyPairs) {
            const node1 = nodeLookup[pair.tableName]
            const node2 = nodeLookup[pair.referencedTableName];
            node2.addNeighbor(node1);
        };
        const sortedNodes = topologicalSort(dbGraphNodes);
        const sortedEntities = sortedNodes.map(x=>x.value);
        return sortedEntities;
    }

    private async getExportFields(entity:ExportEntity) {
        const exportFields = (entity.exportFields || "*") === "*" ?
            await this.dbService.allEntityFields(entity.name) : entity.exportFields;
        return difference(exportFields, entity.excludedFields || []);
    }

    private async exportEntity(entity: ExportEntity, keyValuesLookup: ForeignKeyValuesLookup) {

        // get the foreign key fields that have a value restriction
        const foreignKeyFields = await this.dbService.foreignKeyFields(entity.name);
        const restrictedForeignKeyFields = foreignKeyFields   
                .filter(f=>(keyValuesLookup[f.foreignEntityName] || []).some(Boolean));

        // create a dictionary to hold the allowed values of foreign key fields
        const foreignFieldValues:ForeignKeyValuesLookup = restrictedForeignKeyFields
            .reduce((prev,curr)=>{
                return {...prev,[curr.fieldName]: keyValuesLookup[curr.foreignEntityName]}
            },{})

        // create an array of "fieldName in (valueList)" strings that will be used in the where clause
        const foreignWhereClauseParts = restrictedForeignKeyFields.map(f=>{
            const vals = foreignFieldValues[f.fieldName].join(',');
            return `${f.fieldName} in (${vals})`
        });

        // combine specified filters with foreign key filters 
        const whereClauseParts = (entity.filters || []).concat(foreignWhereClauseParts);

        // get the fields that will be part of the json export
        const exportFields = await this.getExportFields(entity);

        // get the fields that will be selected from the database (same of export fields with possible addition of primary key)
        const selectFields = exportFields.slice();
        const pkField = entity.primaryKeyField || "id";
        if(!selectFields.some(f=>f===pkField)){ selectFields.unshift(pkField)}
        const selectQuery = `Select ${selectFields.join(',')} From \`${entity.name}\` Where ${whereClauseParts.join(' and ')}`;
        
        // query database for entity values
        const res = await this.dbService.query<any[]>(selectQuery)

        return res;
    }

    public async exportDB(exportEntities: ExportEntity[]) {
        const keyValues:ForeignKeyValuesLookup = {};
        const exportData:{[entityName:string]:any} = {};
        const sortedEntities = await this.topoSortEntities(exportEntities);

        for (const entity of sortedEntities) {
            try {
                const data = await this.exportEntity(entity, keyValues);
                keyValues[entity.name] = data.map((x:any)=>x[entity.primaryKeyField || "id"]);
                exportData[entity.name] = data;
            }
            catch(e) {
                console.error("error exporting entity: " + entity.name);
            }
        }

        return exportData;
    }

}