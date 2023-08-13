import { DBSeeder, SeedEntity, countDictionary } from "./dbSeeder";
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
import { DbExporter, ExportEntity } from "./dbExporter";
import { DBImporter } from "./dbImporter";

import fs from 'fs';

(async () => {

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

    await seeder.seedDatabase(seedEntities);


    const exporter = new DbExporter(poolConfig);
    const exportEntities: ExportEntity[] = [
        {
            name: "Group"
        },

        {

            name: "Client",
            exportFields: "*",
            excludedFields: ['clientSecret'],
            primaryKeyField: "id",
            filters: []

        },
        {
            name: "Role",
            exportFields: "*",
        },
        {
            name: "Tenant",
            exportFields: ['title', 'description', 'tenantId', 'secrets'],
            excludedFields: [],
            primaryKeyField: "id",
            filters: ['id=7'],
        },

        {
            name: "RolePermission"
        },
        {
            name: "Namespace"
        },

        {
            name: "GroupRole"
        },
        {
            name: "IdentityProvider"
        },
        {
            name: "Permission"
        }
    ]
    const exportData = await exporter.exportDB(exportEntities);
    try {
        const jsonData = JSON.stringify(
            exportData,
            (key, value) => {
                return typeof value === 'bigint'
                    ? value.toString()
                    : value // return everything else unchanged
            },
            4
        );
        console.log(jsonData);
        fs.writeFileSync(config.dbExportPath, jsonData);
    }
    catch (e) {
        console.log(e);
    }


    await seeder.truncAllTables(seedEntities);

    const importer = new DBImporter(poolConfig);
    const importJson = fs.readFileSync(config.dbExportPath, 'utf-8');
    const importData = JSON.parse(importJson);

    importer.importDB(importData);



})();