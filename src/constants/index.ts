export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const IMAGE_TYPE = ["image/jpeg", "image/png", "image/jpg"];

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)+$/,
  PHONE: /((09|03|07|08|05)+([0-9]{8})\b)/g,
  USERNAME_MIN_LENGTH: 1,
  USERNAME_MAX_LENGTH: 50,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{6,30}$/,
  CARD_NUMBER: /^(\d{4}\s?){4}$/,
  EXPIRATION_DATE: /^(0[1-9]|1[0-2])\/\d{2}$/,
  SECURITY_CODE: /^[0-9]{3,4}$/,
  SECURITY_CODE_REPLACE: /\D/g,
  HOLDER_NAME: /^[A-Z\s]+$/,
  NUMBER: /^\d*(\.\d+)?$/,
  REPLACEMENT: {
    NUMBER: /\d/,
  },
};

export enum TYPE_INPUT {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  CURRENCY = "CURRENCY",
  PASSWORD = "PASSWORD",
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  INTEGER = "INTEGER",
  BOOLEAN = "BOOLEAN",
  ARRAY_NUMBER = "ARRAY_NUMBER",
}

