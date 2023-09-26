// database.ts
import { DataSource, DataSourceOptions } from "typeorm";
import { DispatchOrderMine } from "../entities/DisptachOrderMine";

export const dbConfig: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [DispatchOrderMine],
  synchronize: true,
};

const dataSource = new DataSource(dbConfig);
let dbHandler: DataSource;

export const connectDatabase = async () => {
  try {
    console.log("Connecting with database...");
    dbHandler = await dataSource.initialize();
    console.log("Database connected successfully");
    return dbHandler;
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    console.log("Disconnecting database...");
    await dataSource.destroy();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Error during database disconnect:", error);
    process.exit(1);
  }
};
