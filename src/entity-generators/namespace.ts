import { SeedEntity } from "../dbSeeder";
import { faker } from '@faker-js/faker';

export const namespaceEntity: SeedEntity = {
    name: 'Namespace',
    dataGen: (keys, i) => {
        const namespace = {
            name: faker.word.words(1),
            description: faker.word.words(3),
            type: 'default',
            tenantId: keys.tenantId
        };
        return namespace;
    },
    isManyToManyRelation: false,
    foreignKeyValuesQuery: 'Select id as tenantId from Tenant'
}