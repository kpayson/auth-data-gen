import { SeedEntity } from "../dbSeeder";
import { faker } from '@faker-js/faker';

export const groupEntity: SeedEntity = {
    name: 'Group',
    dataGen: (keys, i)=> {
        const group = {
            name: 'read:' + faker.word.noun(),
            description: faker.word.words(5),
            tenantId: keys.tenantId,
            namespaceId: keys.namespaceId,
        };
        return group;
    },
    isManyToManyRelation: false,
    foreignKeyValuesQuery: `
        Select Tenant.id as tenantId, Namespace.id as namespaceId 
        From Tenant Left Join Namespace on Namespace.tenantId = Tenant.id`
}
