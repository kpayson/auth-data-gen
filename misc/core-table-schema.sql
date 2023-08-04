CREATE TABLE `User` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `lastLogin` timestamp NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `displayName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `givenName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `middleName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `familyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `identityIssuer` varchar(1024) DEFAULT NULL, 
  `picture` mediumtext DEFAULT NULL,
  `totpSecret` varchar(32) DEFAULT NULL,
  `strikeCount` int(11) DEFAULT NULL,
  `lastStrike` datetime DEFAULT NULL,
  `lockedOut` tinyint(1) DEFAULT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `externalGroups` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`externalGroups`)),
  `_userProfileClaims` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`_userProfileClaims`)),
  `_providerClaims` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`_providerClaims`)),
  `_customClaims` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`_customClaims`)),
  `upn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `commonName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amr` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amr`)),
  `isBlocked` tinyint(1) DEFAULT 0,
  `passwordHash` varchar(512) DEFAULT NULL,
  `userStatus` varchar(255) DEFAULT 'Active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Users_email_identityIssuer` (`identityIssuer`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


CREATE TABLE `Tenant` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `tenantId` varchar(255) NOT NULL,
  `secrets` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`secrets`)),
  `tileConfig` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tileConfig`)),
  `settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`settings`)),
  `loginEventSettings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`loginEventSettings`)),
  `userAlertSettings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`userAlertSettings`)),
  `notification` varchar(4096) DEFAULT NULL,
  `emailSettings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`emailSettings`)),
  `emailSecrets` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`emailSecrets`)),
  `activeX509CertificateFingerprint` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `createdByUserId` int(11) DEFAULT NULL,
  `ownerUserId` int(11) DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `visibility` varchar(255) DEFAULT 'public',
  `isArchived` tinyint(1) NOT NULL DEFAULT 0,
  `latestLogin` timestamp NULL DEFAULT NULL,
  `archivedDate` timestamp NULL DEFAULT NULL,
  `tenantStatus` varchar(255) DEFAULT NULL,
  `notifiedSamlCertExpiration` tinyint(1) NOT NULL DEFAULT 0,
  `notifiedSamlCertExpirationDate` timestamp NULL DEFAULT NULL,
  `notificationExpirationDate` timestamp NULL DEFAULT NULL,
  `cookieConsentSettings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cookieConsentSettings`)),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Tenant_tenantId` (`tenantId`),
  UNIQUE KEY `UQ_Tenant_title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `TenantUser` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `userId` int(3) NOT NULL,
  `tenantId` int(3) NOT NULL,
  `picture` mediumtext DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `givenName` varchar(255) DEFAULT NULL,
  `familyName` varchar(255) DEFAULT NULL,
  `isBlocked` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId_tenantId_UNIQUE_CONST` (`userId`,`tenantId`),
  KEY `tenantId_CONST` (`tenantId`),
  CONSTRAINT `tenantId_CONST` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userId_CONST` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `Client` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `clientId` varchar(255) NOT NULL,
  `clientSecret` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(1024) DEFAULT '',
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`config`)),
  `loginEventSettings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`loginEventSettings`)),
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `clientUri` varchar(1024) DEFAULT '',
  `tenantId` int(3) NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `activeX509CertificateFingerprint` varchar(255) DEFAULT NULL,
  `lastClientSecretUpdate` timestamp NULL DEFAULT current_timestamp(),
  `clientSecretExpirationHasBeenNotified` tinyint(1) NOT NULL DEFAULT 0,
  `notifyExpirationBeforeSeconds` bigint(20) DEFAULT 0,
  `lastClientSecretExpirationNotifiedDate` timestamp NULL DEFAULT NULL,
  `supportsAccountLinking` tinyint(1) DEFAULT 0,
  `shouldUsePreviouslySelectedConnection` tinyint(1) DEFAULT 0,
  `secretLifetimeInDays` int(11) DEFAULT NULL,
  `notifiedSamlCertExpiration` tinyint(1) NOT NULL DEFAULT 0,
  `notifiedSamlCertExpirationDate` timestamp NULL DEFAULT NULL,
  `customErrorSettings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`customErrorSettings`)),
  `accessRequestTemplateId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Client_clientId_tenantId` (`clientId`,`tenantId`),
  UNIQUE KEY `UQ_Client_name_tenantId` (`tenantId`,`name`),
  KEY `IX_client_tenantId_idx` (`tenantId`),
  CONSTRAINT `FK_Client_tenantId` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `Role` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `tenantId` int(3) NOT NULL,
  `clientId` int(3) NOT NULL,
  `isClientRole` tinyint(1) DEFAULT NULL,
  `namespaceId` int(11) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Role_TenantID_ClientId_Name_NamespaceId` (`tenantId`,`clientId`,`name`,`namespaceId`),
  KEY `role_clientId_FK` (`clientId`),
  KEY `FK_Role_namespaceId` (`namespaceId`),
  CONSTRAINT `FK_Role_namespaceId` FOREIGN KEY (`namespaceId`) REFERENCES `Namespace` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `role_clientId_FK` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_tenantID_FK` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `Permission` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `clientId` int(3) NOT NULL,
  `tenantId` int(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Permission_name_clientId` (`name`,`clientId`),
  KEY `client_FK_idx` (`clientId`),
  KEY `IX_Permission_tenantId` (`tenantId`),
  CONSTRAINT `FK_Permission_resourceServerId` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Permission_tenantId` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `RolePermission` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `roleId` int(3) NOT NULL,
  `permissionId` int(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roleId_permissionId_UNIQUE` (`roleId`,`permissionId`),
  KEY `role_id_FK_idx` (`roleId`),
  KEY `permission_id_FK` (`permissionId`),
  CONSTRAINT `permission_id_FK` FOREIGN KEY (`permissionId`) REFERENCES `Permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_id_FK` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `ClientPermission` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `clientId` int(3) NOT NULL,
  `permissionId` int(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clientId_FK_idx` (`clientId`),
  KEY `permissionId_FK` (`permissionId`),
  CONSTRAINT `clientId_FK` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permissionId_FK` FOREIGN KEY (`permissionId`) REFERENCES `Permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `Namespace` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenantId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `namespaceParentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Namespace_Name_Id` (`name`,`id`),
  KEY `FK_Namespace_tenantId` (`tenantId`),
  KEY `FK_Namespace_namespaceParentId` (`namespaceParentId`),
  CONSTRAINT `FK_Namespace_namespaceParentId` FOREIGN KEY (`namespaceParentId`) REFERENCES `Namespace` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `FK_Namespace_tenantId` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `Group` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `tenantID` int(3) NOT NULL,
  `description` text DEFAULT NULL,
  `namespaceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_Groups_Name_TenantID_NamespaceId` (`name`,`tenantID`,`namespaceId`),
  KEY `groupconst` (`tenantID`),
  KEY `FK_Groups_namespaceId` (`namespaceId`),
  KEY `IX_Groups_name` (`name`),
  CONSTRAINT `FK_Groups_namespaceId` FOREIGN KEY (`namespaceId`) REFERENCES `Namespace` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `groupconst` FOREIGN KEY (`tenantID`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `ClientGroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(3) NOT NULL,
  `groupId` int(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_ClientGroup_clientId_groupId` (`clientId`,`groupId`),
  KEY `FK_ClientGroup_groupId` (`groupId`),
  KEY `FK_ClientGroup_clientId` (`clientId`),
  CONSTRAINT `FK_ClientGroup_clientId` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ClientGroup_groupId` FOREIGN KEY (`groupId`) REFERENCES `Group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `GroupRole` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roleID_groupID_const_UNIQUE` (`roleId`,`groupId`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `FK_GroupRole_groupId` (`groupId`),
  CONSTRAINT `FK_GroupRole_groupId` FOREIGN KEY (`groupId`) REFERENCES `Group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_GroupRole_roleId` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `UserGroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(3) NOT NULL,
  `groupId` int(3) NOT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_UserGroups_userId_groupId` (`userId`,`groupId`),
  KEY `IX_UserGroups_groupId` (`groupId`),
  KEY `IX_UserGroups_userId` (`userId`),
  CONSTRAINT `FK_UserGroups_groupId` FOREIGN KEY (`groupId`) REFERENCES `Group` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_UserGroups_userId` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `IdentityProvider` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `tenantId` int(3) NOT NULL,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`config`)),
  `type` varchar(255) NOT NULL,
  `mfaType` varchar(32) DEFAULT NULL,
  `mfaSettings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`mfaSettings`)),
  `icon` mediumtext DEFAULT NULL,
  `sortOrder` int(2) DEFAULT NULL,
  `verifyEmail` tinyint(1) DEFAULT NULL,
  `loginTooltip` varchar(255) DEFAULT NULL,
  `issuer` varchar(255) NOT NULL,
  `userAlertSettings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`userAlertSettings`)),
  `secrets` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`secrets`)),
  `externalSecretId` varchar(255) DEFAULT NULL,
  `isShareable` tinyint(1) DEFAULT NULL,
  `isTrusted` tinyint(1) DEFAULT NULL,
  `notifiedSamlCertExpiration` tinyint(1) NOT NULL DEFAULT 0,
  `notifiedSamlCertExpirationDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_IdentityProvider_name_tenantId` (`name`,`tenantId`),
  KEY `IX_IdentityProvider_tenantId` (`tenantId`),
  CONSTRAINT `FK_IdentityProvider_tenantId` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;