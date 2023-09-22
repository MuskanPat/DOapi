import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {
  connectDatabase,
  disconnectDatabase,
  dbHandler,
} from "./database/database";
import { dispatchOrderRouter } from "./routes/disptachOrderRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/dispatchorder", dispatchOrderRouter(dbHandler));

const signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
};

let server;
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();
    console.log("Database connected successfully");

    server = app.listen({ port }, () =>
      console.log(`Server listening at port: ${port}`)
    );
  } catch (error) {
    console.error("Server startup error:", error);
    await stopServer();
  }
};

const stopServer = async () => {
  try {
    await disconnectDatabase();
    if (server) {
      await server.close();
    }
  } catch (error) {
    console.error("Error during server shutdown:", error);
  } finally {
    process.exit(1);
  }
};

const shutdown = async (signal: any, value: any) => {
  await stopServer();
  console.log(`Server stopped by ${signal} with value ${value}`);
  process.exit(128 + value);
};

Object.keys(signals).forEach((signal: any) => {
  process.on(signal, async () => {
    console.log(`Process received a ${signal} signal`);
    await shutdown(signal, signals[signal]);
  });
});

startServer();
