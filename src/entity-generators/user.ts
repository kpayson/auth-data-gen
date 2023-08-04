
import { SeedEntity } from "../dbSeeder";
import { faker } from '@faker-js/faker';

export const userEntity: SeedEntity = {
    name: 'User',
    dataGen: () => {
        const lastname = faker.person.lastName();
        const firstname = faker.person.firstName();
        const username = firstname.substring(0, 1) + lastname;
        const email = username + '@testing.com'

        const user = {
            username: username,
            givenName: firstname,
            familyName: lastname,
            email: email
        }
        return user;
    },
    isManyToManyRelation: false
};
