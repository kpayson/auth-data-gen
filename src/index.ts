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

seeder.TruncAllTables(seedEntities).then(() => {
    seeder.SeedDatabase(seedEntities).then(() => {
        console.log("Database seed complete")
    })
});

