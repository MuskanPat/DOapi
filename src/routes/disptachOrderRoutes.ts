import express from "express";
import { DatabaseHandler } from "../database/databaseHandler";

export function dispatchOrderRouter(
  dbHandler: DatabaseHandler
): express.Router {
  const router = express.Router();

  // Get all orders
  router.get("/all", async (req, res) => {
    try {
      const dispatchOrders = await dbHandler.getDispatchOrders();
      return res.status(200).json(dispatchOrders);
    } catch (error) {
      console.log("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Create a new order
  router.post("/create", async (req, res) => {
    try {
      const newDispatchOrder = req.body;
      const result = await dbHandler.createDispatchOrder(newDispatchOrder);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Get an order by ID
  router.get("/get/:DO_number", async (req, res) => {
    const { DO_number } = req.params;
    const DO_num = Number(DO_number);

    if (isNaN(DO_num)) {
      return res.status(400).json({ error: "Invalid DO_number" });
    }

    try {
      const dispatchOrder = await dbHandler.getDispatchOrderByNumber(DO_num);
      if (!dispatchOrder) {
        return res.status(404).json({ error: "Dispatch Order not found" });
      }
      return res.status(200).json(dispatchOrder);
    } catch (error) {
      console.error("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Update an order by ID
  router.put("/update/:DO_number", async (req, res) => {
    const { DO_number } = req.params;
    try {
      const updatedDispatchOrder = req.body;
      const DO_num = Number(DO_number);
      if (isNaN(DO_num)) {
        return res.status(400).json({ err: "Invalid DO_num" });
      }
      const result = await dbHandler.updateDispatchOrder(
        DO_num,
        updatedDispatchOrder
      );

      if (result.affected === 0) {
        return res.status(404).json({ error: "Dispatch Order not found" });
      }
      const dispatchOrder = await dbHandler.getDispatchOrderByNumber(DO_num);
      return res.status(200).json(dispatchOrder);
    } catch (error) {
      console.error("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Delete an order by ID
  router.delete("/delete/:DO_number", async (req, res) => {
    const { DO_number } = req.params;
    const DO_num = Number(DO_number);

    if (isNaN(DO_num)) {
      return res.status(400).json({ err: "invalid DO_number" });
    }
    try {
      const result = await dbHandler.deleteDispatchOrder(DO_num);
      if (result.affected === 0) {
        return res.status(404).json({ error: "Dispatch Order not found" });
      }
      return res.status(204).end();
    } catch (error) {
      console.error("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
}
