import * as dotenv from "dotenv";
dotenv.config();

export const {
  APP_PORT,
  OPENAI_API_KEY,
  DEV_API,
  PROD_API,
  CLIENT_DEV_API,
  CLIENT_PROD_API,
  MODE,
  OPENAI_ORGANIZATION,
} = process.env;
