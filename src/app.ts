import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase, disconnectDatabase } from "./database/database";
import { dispatchOrderRouter } from "./routes/disptachOrderRoutes";
import DispatchOrderService from "./dispatch-order/dispatchOrderService";
import DispatchOrderRepository from "./dispatch-order/dispatchOrderRepository";
import { DataSource } from "typeorm";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let dbHandler: DataSource;
let server: any;
const port = process.env.PORT || 5000;

const signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
};

const startServer = async () => {
  try {
    dbHandler = await connectDatabase();
    console.log("Database connected successfully");

    const dispatchOrderRepository: DispatchOrderRepository =
      new DispatchOrderRepository(dbHandler);

    const dispatchOrderService = new DispatchOrderService(dbHandler);

    app.use("/dispatchorder", dispatchOrderRouter(dispatchOrderService));

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
