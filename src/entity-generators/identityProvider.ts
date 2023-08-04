import { SeedEntity } from "../dbSeeder";
import { faker } from '@faker-js/faker';

export const identityProviderEntity: SeedEntity = {
    name: 'IdentityProvider',
    dataGen: (keys, i)=> {
        const name = faker.word.noun()
        const identityProvider = {
            name,
            displayName: name + ' OAuth',
            config: "{\"authorizationURL\":\"https:\/\/accounts.google.com\/o\/oauth2\/auth\",\"tokenURL\":\"https:\/\/accounts.google.com\/o\/oauth2\/token\",\"clientID\":\"123456\",\"clientSecret\":\"asdef\",\"scope\":[\"https:\/\/www.googleapis.com\/auth\/userinfo.email\"],\"logoutUri\":\"https:\/\/accounts.google.com\/logout\",\"features\":{}}",
            tenantId: keys.tenantId,
            type: "google-oauth",
            issuer:"https://accounts.google.com"
        };
        return identityProvider;
    },
    isManyToManyRelation: false,
    foreignKeyValuesQuery: `Select id as tenantId from Tenant`
}


