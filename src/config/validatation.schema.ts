import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // env
  EXE_ENV: Joi.string().valid('dev', 'prod').required(),
  PORT: Joi.number().required(),

  // JWT
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRY: Joi.string()
    .regex(/^[1-9]\d{0,1}[dhms]$/)
    .required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRY: Joi.string()
    .regex(/^[1-9]\d{0,1}[dhms]$/)
    .required(),

  // database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});

// https://joi.dev/api/?v=17.12.2#anyvalidatevalue-options
export const validationOptions = {
  allowUnkown: true,
  abortEarly: false,
};
