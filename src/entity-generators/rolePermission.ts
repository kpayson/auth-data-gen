import { SeedEntity } from "../dbSeeder";
import { faker } from '@faker-js/faker';

export const rolePermissionEntity: SeedEntity = {
    name: 'RolePermission',
    dataGen: (keys, i) => {
        const rolePermission = {
            roleId: keys.roleId,
            permissionId: keys.permissionId
        }
        return rolePermission;
    },
    isManyToManyRelation: true,
    foreignKeyValuesQuery: `
        Select Role.id as roleId, Permission.id as permissionId 
        From Role, Permission Where Role.tenantId = Permission.tenantId and Role.clientId = Permission.clientId`
};