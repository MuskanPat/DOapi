"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./database/database");
const disptachOrderRoutes_1 = require("./routes/disptachOrderRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/dispatchorder", (0, disptachOrderRoutes_1.dispatchOrderRouter)(database_1.dbHandler));
const signals = {
    SIGHUP: 1,
    SIGINT: 2,
    SIGTERM: 15,
};
let server;
const port = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        console.log("Database connected successfully");
        server = app.listen({ port }, () => console.log(`Server listening at port: ${port}`));
    }
    catch (error) {
        console.error("Server startup error:", error);
        await stopServer();
    }
};
const stopServer = async () => {
    try {
        await (0, database_1.disconnectDatabase)();
        if (server) {
            await server.close();
        }
    }
    catch (error) {
        console.error("Error during server shutdown:", error);
    }
    finally {
        process.exit(1);
    }
};
const shutdown = async (signal, value) => {
    await stopServer();
    console.log(`Server stopped by ${signal} with value ${value}`);
    process.exit(128 + value);
};
Object.keys(signals).forEach((signal) => {
    process.on(signal, async () => {
        console.log(`Process received a ${signal} signal`);
        await shutdown(signal, signals[signal]);
    });
});
startServer();
//# sourceMappingURL=app.js.map