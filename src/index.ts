import { DBSeeder, SeedEntity, countDictionary } from "./dbSeeder.js";
import { PoolConfig } from 'mariadb';
import { config } from "./config";
import {
    clientEntity,
    groupEntity,
    groupRoleEntity,
    identityProviderEntity,
    namespaceEntity,
    permissionEntity,
    roleEntity,
    rolePermissionEntity,
    tenantEntity,
    userEntity
} from "./entity-generators"
import { DbExporter, ExportEntity } from "./dbExporter.js";

import fs from 'fs';

const counts: countDictionary = config.seedCounts;
const poolConfig: PoolConfig = config.poolConfig;

const seeder = new DBSeeder(poolConfig, counts);

const seedEntities: SeedEntity[] = [
    userEntity, 
    tenantEntity, 
    clientEntity, 
    roleEntity, 
    permissionEntity, 
    rolePermissionEntity,
    namespaceEntity,
    groupEntity,
    groupRoleEntity,
    identityProviderEntity
];

console.log("starting");

const exporter = new DbExporter(poolConfig);
const exportEntities:ExportEntity[] = [
    {
        name:"Group"
    },

    {
        
        name:"Client",
        exportFields:"*",
        excludedFields:['clientSecret'],
        primaryKeyField:"id",
        filters:[]
        
    },
    {
        name:"Role",
        exportFields:"*",
    },
    {
        name:"Tenant",
        exportFields:['title','description','tenantId'],
        excludedFields:[],
        primaryKeyField:"id",
        filters:['id=7'],
    }, 

    {
        name:"RolePermission"
    },
    {
        name:"Namespace"
    },

    {
        name:"GroupRole"
    },
    {
        name:"IdentityProvider"
    },
    {
        name:"Permission"
    }
]
exporter.exportDB(exportEntities).then(data=>{
    try {
        const jsonData = JSON.stringify(
            data, 
            (key, value) => {
                return typeof value === 'bigint'
                    ? value.toString()
                    : value // return everything else unchanged
                }, 
            4
        );
        console.log(jsonData);
        fs.writeFileSync(config.dbExportPath,jsonData);
    }
    catch(e) {
        console.log(e);
    }      
});

