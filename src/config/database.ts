import { ConnectionOptions } from "typeorm";
import {Customer, Loan, Transaction} from '../models'

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "Welcome12345##",
  database: process.env.POSTGRES_DB || "express-ts",
  entities: [Customer, Loan, Transaction],
  synchronize: true,
};

export default config;