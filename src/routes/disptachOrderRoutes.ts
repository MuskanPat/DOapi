import express from "express";
import DispatchOrderService from "../dispatch-order/dispatch-order-service";
import { updateDOValidationSchema } from "../dispatch-order/dispatch-order-service";

export function dispatchOrderRouter(
  dispatchOrderService: DispatchOrderService
): express.Router {
  const router = express.Router();

  // Get all orders
  router.get("/all", async (req, res) => {
    try {
      const dispatchOrders = await dispatchOrderService.getAllRecords();
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
      const result = await dispatchOrderService.createDo(newDispatchOrder);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Get an order by ID
  router.get("/get/:DO_number", async (req, res) => {
    const { DO_number } = req.params;

    try {
      const dispatchOrder = await dispatchOrderService.getDOByNumber(DO_number);
      if (!dispatchOrder) {
        return res.status(404).json({ error: "Dispatch Order not found" });
      }
      return res.status(200).json(dispatchOrder);
    } catch (error) {
      console.error("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Update a complete order by ID
  router.put("/update/:DO_number", async (req, res) => {
    const { DO_number } = req.params;
    try {
      const updatedDispatchOrder = req.body;

      const result = await dispatchOrderService.updateDO(
        DO_number,
        updatedDispatchOrder
      );

      if (!result) {
        return res.status(404).json({ error: "Dispatch Order not found" });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.error("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Delete an order by ID
  router.delete("/delete/:DO_number", async (req, res) => {
    const { DO_number } = req.params;

    try {
      const result = await dispatchOrderService.deleteDO(DO_number);
      if (result === true) {
        return res.status(404).json({ error: "Dispatch Order not found" });
      }
      return res.status(204).end();
    } catch (error) {
      console.error("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Partially update an order by ID
  router.patch("/partial/:DO_number", async (req, res) => {
    const { DO_number } = req.params;
    try {
      const updatedFields = req.body;

      const { error } = updateDOValidationSchema.validate(updatedFields);
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const result = await dispatchOrderService.updateDO(
        DO_number,
        updatedFields
      );

      if (!result) {
        return res.status(404).json({ error: "Dispatch Order not found" });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.error("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
}
