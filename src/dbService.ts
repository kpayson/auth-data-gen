import { createPool, PoolConfig, Connection, Pool } from 'mariadb';

export interface ForeignKeyField {
    foreignEntityName: string; //the table being reference
    fieldName: string //the column
}

export interface TableDependencyPair {
    tableName: string;
    referencedTableName: string;
}

export interface IDBService
{
    // execute any sql statement
    query<T>(queryString:string): Promise<T>;

    // return all entity fields (column names) for a given entity (table)
    allEntityFields(entityName:string): Promise<string[]>;

    // return columns in the table that are foreign keys along with the table they reference
    foreignKeyFields(entityName:string): Promise<ForeignKeyField[]>;

    // if table A has a column that is a foreign key into table B then then there is a dependency from A to B
    // return all such pairs
    tableDependencies(tableNames: string[]): Promise<TableDependencyPair[]>;
}

export class MariaDBService implements IDBService
{
    private _tableSchema: string;
    private _connectionPromise:Promise<Connection>;
    
    constructor(dbConfig: PoolConfig) {
        const pool = createPool(dbConfig);
        this._connectionPromise = pool.getConnection();
        this._tableSchema = dbConfig.database!;
    }

    private async getConnection() {
        return await this._connectionPromise;
    }

    async query<T>(queryString: string): Promise<T> {
        const connection = await this.getConnection();
        const res = await connection.query(queryString);
        return res;
    }

    async allEntityFields(entityName: string): Promise<string[]> {
        const columnQuery = `
            Select COLUMN_NAME 
            From INFORMATION_SCHEMA.COLUMNS
            Where TABLE_SCHEMA = '${this._tableSchema}' And
                TABLE_NAME = '${entityName}'
        `;
        const connection = await this.getConnection();
        const columns = await connection.query<{COLUMN_NAME:string}[]>(columnQuery);
        const columnNames = columns.map(x=>x.COLUMN_NAME);
        return columnNames;
    }

    async foreignKeyFields(entityName: string): Promise<ForeignKeyField[]> {
        const foreignKeyQuery = `
            SELECT COLUMN_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE REFERENCED_TABLE_SCHEMA = '${this._tableSchema}' AND
            TABLE_NAME = '${entityName}'`;
        const connection = await this.getConnection();
        const fkResult = await connection.query(foreignKeyQuery);

        const foreignKeyFields :ForeignKeyField[] = fkResult.map((x:any)=>{
            return {
                foreignEntityName: x.REFERENCED_TABLE_NAME,
                fieldName: x.COLUMN_NAME
            }
        })

        return foreignKeyFields;
    }

    async tableDependencies(tableNames: string[]): Promise<TableDependencyPair[]> {
        const quotedTableNames = tableNames.map(name=>`'${name}'`);
        const dependenciesQuery = `
            SELECT Distinct TABLE_NAME, REFERENCED_TABLE_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE REFERENCED_TABLE_SCHEMA = '${this._tableSchema}' And 
            TABLE_NAME in (${quotedTableNames.join(',')}) And
            REFERENCED_TABLE_NAME in (${quotedTableNames.join(',')})
        ` 
        const connection = await this.getConnection();
        const res = await connection.query(dependenciesQuery);
        const pairs:TableDependencyPair[] = res.map((x:any)=>({tableName:x.TABLE_NAME, referencedTableName:x.REFERENCED_TABLE_NAME}))
        return pairs;
    }

} 