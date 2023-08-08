/**
 * @description The clients supported by LabShare Auth
 */
export enum CLIENT_TYPE {
  SAML = 'saml',
  WSFED = 'wsfed',
  WEB = 'web',
  NATIVE = 'native'
}

export enum CLIENT_TASK_TYPE {
  SECRET_NOTIFICATION = 'secretNotification',
  SECRET_UPDATE = 'secretUpdate'
}
