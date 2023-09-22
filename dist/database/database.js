"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = exports.dbHandler = exports.dbConfig = void 0;
// database.ts
const typeorm_1 = require("typeorm");
const DisptachOrderMine_1 = require("../entities/DisptachOrderMine");
const databaseHandler_1 = require("./databaseHandler");
exports.dbConfig = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [DisptachOrderMine_1.DispatchOrderMine],
    synchronize: true,
};
const dataSource = new typeorm_1.DataSource(exports.dbConfig);
exports.dbHandler = new databaseHandler_1.DatabaseHandler(dataSource);
const connectDatabase = async () => {
    try {
        console.log("Connecting with database...");
        await dataSource.initialize();
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        console.log("Disconnecting database...");
        await dataSource.destroy();
        console.log("Database disconnected successfully");
    }
    catch (error) {
        console.error("Error during database disconnect:", error);
        process.exit(1);
    }
};
exports.disconnectDatabase = disconnectDatabase;
//# sourceMappingURL=database.js.map