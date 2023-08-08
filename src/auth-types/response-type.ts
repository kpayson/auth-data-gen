'use strict';

export enum RESPONSE_TYPE {
  TOKEN = 'id_token token',
  CODE = 'code',
  CODE_ID_TOKEN = 'code id_token',
  CODE_ID_TOKEN_TOKEN = 'code id_token token',
  CODE_TOKEN = 'code token',
  ID_TOKEN = 'id_token',
  NONE = 'none'
}
