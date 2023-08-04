import {createPool, PoolConfig, Connection} from 'mariadb';

export interface SeedEntity{
    name: string // Table name

    // A query that will return all possible foreign key or key combinations to choose from
    // ex
    // Select role.id as roleId, permission.id as permissionId 
    // From role, permission
    // Where role.clientId = permission.clientId
    foreignKeyValuesQuery?: string;

    // if the table is for a many to many relationship then the foreign key combination is unique.
    isManyToManyRelation: boolean;

    // a function that will generate an entity with mock data
    // parameter keys: an object with property names that match the foreign key columns of the entity
    // parameter i: an incrementing index that can be used in generating data values
    dataGen: (keys?: any, i?: number) => any

}

// A raw count or percentage of or count per <parent>
export type countDictionary = { [entityName: string]: number }

export class DBSeeder {

    private _connectionPromise: any = null;
    private _entityCounts: { [entityName: string]: number }

    constructor(dbConfig: PoolConfig, entityCounts: countDictionary) {
        const pool = createPool(dbConfig);
        this._connectionPromise = pool.getConnection();
        this._entityCounts = entityCounts;
    }

    private pickRandomElement(array: any[]) {
        if (array.length === 0) {
          return undefined;
        }
      
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    private randomSort(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
      }
    
    private async generateInsertDataWithUniqueForeignKeys(entity: SeedEntity, connection: Connection) {
        const count = this._entityCounts[entity.name] || 1;
        const foreignKeyValueSet = entity.foreignKeyValuesQuery ? await connection.query(entity.foreignKeyValuesQuery) : [];
        const foreignKeyValueSetSorted = this.randomSort(foreignKeyValueSet);
        const insertData = [...Array(Math.min(count,foreignKeyValueSet.length)).keys()].map((i)=>{
            return entity.dataGen(foreignKeyValueSetSorted[i],i)
        }); 
        return insertData;
    }

    private async generateInsertDataWithRandomForeignKey(entity: SeedEntity, connection: Connection) {
        const count = this._entityCounts[entity.name] || 1;
        const foreignKeyValueSet = entity.foreignKeyValuesQuery ? await connection.query(entity.foreignKeyValuesQuery) : [];
        const insertData = [...Array(count).keys()].map((i)=>{
            return entity.dataGen(this.pickRandomElement(foreignKeyValueSet),i)
        }); 
        return insertData;
    }
    

    private async SeedEntity(entity: SeedEntity, connection: Connection) {
        const count = this._entityCounts[entity.name] || 1;
        console.log("entity="+entity.name)
        console.log(entity.foreignKeyValuesQuery );
        const foreignKeyValueSet = entity.foreignKeyValuesQuery ? await connection.query(entity.foreignKeyValuesQuery) : [];

        const insertData = entity.isManyToManyRelation ? 
            await this.generateInsertDataWithUniqueForeignKeys(entity, connection) :
            await this.generateInsertDataWithRandomForeignKey(entity, connection);

        const insertFields = Object.keys(insertData[0]);
        const insertFieldList = insertFields.join(',');
        const valuePlaceHolderList = [...Array(insertFields.length).keys()].map(()=>'?').join(',');
        const insertQuery = `INSERT INTO \`${entity.name}\` (${insertFieldList}) Values(${valuePlaceHolderList})`;
        
        for(const row of insertData) {
            const insertRes = await connection.query(insertQuery,Object.values(row));
            console.log(insertRes);
        }

        console.log(foreignKeyValueSet);
    }

    public async TruncAllTables(seedEntities: SeedEntity[]) {
        const conn = await this._connectionPromise;
        await conn.query("SET FOREIGN_KEY_CHECKS=0");
        for(const entity of seedEntities) {
            await conn.query("truncate `" + entity.name + "`");
        }
        await conn.query("SET FOREIGN_KEY_CHECKS=1");
    }

    public async SeedDatabase(seedEntities: SeedEntity[]) {
        const connection = await this._connectionPromise;

        for (const entity of seedEntities) {
            try {
                await this.SeedEntity(entity, connection); 
            }
            catch(e) {
                console.error("Error seeding entity: " + entity.name)
                console.error(e);
            }
            
        }
    }
}
