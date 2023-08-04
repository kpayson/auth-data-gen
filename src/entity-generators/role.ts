import { SeedEntity } from "../dbSeeder";
import { faker } from '@faker-js/faker';

export const roleEntity: SeedEntity = {
    name: 'Role',
    dataGen: (keys, i) => {
        const role = {
            name: 'read:' + faker.word.noun(),
            description: faker.word.words(5),
            tenantId: keys.tenantId,
            clientId: keys.clientId
        }
        return role;
    },
    isManyToManyRelation: false,
    foreignKeyValuesQuery: "Select Tenant.id as tenantId, Client.id as clientId from Client inner join Tenant on Client.TenantId = Tenant.id"
};
