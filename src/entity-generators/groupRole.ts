import { SeedEntity } from "../dbSeeder";

export const groupRoleEntity: SeedEntity = {
    name: 'GroupRole',
    dataGen: (keys, i)=> {
        const groupRole = {
            groupId: keys.groupId,
            roleId: keys.roleId
        };
        return groupRole;
    },
    isManyToManyRelation: true,
    foreignKeyValuesQuery: "Select `Group`.id as groupId, `Role`.id as roleId From `Group`, `Role` where `Group`.tenantId = `Role`.tenantId"
}
