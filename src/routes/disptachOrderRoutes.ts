import express from "express";
import DispatchOrderService from "../dispatch-order/dispatchOrderService";
import { updateDOValidationSchema } from "../dispatch-order/dispatchOrderService";

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

  // Get an order by ID
  router.get("/get/:doNumber", async (req, res) => {
    const { doNumber } = req.params;

    try {
      const dispatchOrder = await dispatchOrderService.getDOByNumber(doNumber);
      if (!dispatchOrder) {
        return res.status(404).json({ error: "Dispatch Order not found" });
      }
      return res.status(200).json(dispatchOrder);
    } catch (error) {
      console.error("Database error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //Create a new order
  router.post("/create", async (req, res) => {
    try {
      const input = req.body;
      console.log("Received Request Body:", req.body);

      const result = await dispatchOrderService.createDo(input);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating Dispatch Order: ", error);
      return res.status(500).json({ error: error.message });
    }
  });

  // Update an order by ID
  router.patch("/partial/:doNumber", async (req, res) => {
    const { doNumber } = req.params;
    try {
      const updatedFields = req.body;

      const { error } = updateDOValidationSchema.validate(updatedFields);
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const result = await dispatchOrderService.updateDO(
        doNumber,
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

  // Delete an order by ID
  router.delete("/delete/:doNumber", async (req, res) => {
    const { doNumber } = req.params;

    try {
      const result = await dispatchOrderService.deleteDO(doNumber);
      if (result === true) {
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
