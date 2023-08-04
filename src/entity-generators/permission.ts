import { SeedEntity } from "../dbSeeder";
import { faker } from '@faker-js/faker';

export const permissionEntity: SeedEntity = {
    name: 'Permission',
    dataGen: (keys, i) => {
        const permission = {
            name: faker.word.words(1),
            description: faker.word.words(3),
            tenantId: keys.tenantId,
            clientId: keys.clientId
        }
        return permission
    },
    isManyToManyRelation: false,
    foreignKeyValuesQuery: "Select Tenant.id as tenantId, Client.id as clientId from Client inner join Tenant on Client.TenantId = Tenant.id"
};