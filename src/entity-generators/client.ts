import { SeedEntity } from "../dbSeeder";
import { faker } from '@faker-js/faker';

export const clientEntity: SeedEntity =
{
    name: 'Client',
    dataGen: (keys, i) => {
        const clientTypes = ['web', 'native'];
        const client = {
            clientId: faker.string.alphanumeric(10),
            clientSecret: faker.string.alphanumeric(20),
            name: faker.word.noun(),
            description: faker.word.words(4),
            config: '{"callbackUrls":["http://localhost:8080"],"logout":{"frontchannelLogout":{"enabled":true},"showLogoutPrompt":true},"grantTypes":["implicit","authorization_code"],"responseTypes":["code","id_token token","code id_token"],"postLogoutRedirectUris":["http://localhost:8080"],"tokenEndpointAuthMethod":"none"}',
            tenantId: keys.tenantId,
            type: clientTypes[Math.floor(Math.random() * clientTypes.length)]
        }
        return client
    },
    foreignKeyValuesQuery: "Select id as tenantId from Tenant",
    isManyToManyRelation: false
};