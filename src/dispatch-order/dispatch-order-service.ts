import joi, { Schema } from "joi";
import { DataSource } from "typeorm";
import DispatchOrderRepository from "./dispatch-order-repository";
import DoCreateInput from "./do-create-input";
import { DispatchOrderMine } from "../entities/DisptachOrderMine";

const createDOValidationSchema: Schema<DoCreateInput> = joi
  .object({
    DO_number: joi.string().required(),
    is_DO_with_PO: joi.boolean(),
    PO_number: joi.string(),
    PO_item_number: joi.number(),
    quantity: joi.number(),
    delivered_quantity: joi.number(),
    coal_grade_name: joi.string(),
    mine_name: joi.string(),
    coal_type: joi.string(),
    transporter_names: joi.string(),
    remarks: joi.string(),
    DO_issue_date: joi.date(),
    DO_start_date: joi.date(),
    is_grace: joi.boolean(),
    DO_end_date: joi.date(),
    DO_status: joi.string(),
    created_by: joi.string(),
    updated_by: joi.string(),
  })
  .required();

export const updateDOValidationSchema: Schema<Partial<DispatchOrderMine>> = joi
  .object({
    DO_number: joi.string(),
    is_DO_with_PO: joi.boolean(),
    PO_number: joi.string(),
    PO_item_number: joi.number(),
    quantity: joi.number(),
    delivered_quantity: joi.number(),
    coal_grade_name: joi.string(),
    mine_name: joi.string(),
    coal_type: joi.string(),
    transporter_names: joi.string(),
    remarks: joi.string(),
    DO_issue_date: joi.date(),
    DO_start_date: joi.date(),
    is_grace: joi.boolean(),
    DO_end_date: joi.date(),
    DO_status: joi.string(),
    created_by: joi.string(),
    updated_by: joi.string(),
  })
  .required();

export default class DispatchOrderService {
  private dispatchOrderRepository: DispatchOrderRepository;
  private dbHandler: DataSource;

  constructor(
    dispatchOrderRepository: DispatchOrderRepository,
    dbHandler: DataSource
  ) {
    this.dispatchOrderRepository = dispatchOrderRepository;
    this.dbHandler = dbHandler;
  }

  public async getAllRecords() {
    try {
      const dispatchOrders = await this.dispatchOrderRepository.getAllDO();
      return dispatchOrders;
    } catch (error) {
      throw new Error(
        `Failed to fetch all DispatchOrderMine records: ${error.message}`
      );
    }
  }

  public async createDo(input: DispatchOrderMine) {
    const { error } = createDOValidationSchema.validate(input);
    if (error) {
      throw new Error(`Input validation failed: ${error.message}`);
    }
    console.log(`Checking for existing DO with DO_number: ${input.DO_number}`);

    const existingDo = await this.dispatchOrderRepository.getDOByNumber(
      input.DO_number
    );
    console.log(`Existing DO: ${JSON.stringify(existingDo)}`);

    if (existingDo) {
      throw new Error(
        "A dispatch order with the same DO number already exists"
      );
    }
    const newDO = await this.dispatchOrderRepository.createDO(input);

    return newDO;
  }
  catch(error) {
    console.error("Database error: ", error);
    throw error;
  }

  public async getDOByNumber(DO_number: string) {
    try {
      return this.dispatchOrderRepository.getDOByNumber(DO_number);
    } catch (error) {
      throw new Error(
        `Failed to fetch DispatchOrderMine by number: ${error.message}`
      );
    }
  }

  public async updateDO(
    doNumber: string,
    updatedFields: Partial<DispatchOrderMine>
  ) {
    try {
      const { error } = updateDOValidationSchema.validate(updatedFields);
      if (error) {
        throw new Error(`Input validation failed: ${error.message}`);
      }

      const existingDispatchOrder =
        await this.dispatchOrderRepository.getDOByNumber(doNumber);

      if (!existingDispatchOrder) {
        throw new Error(`Dispatch Order with DO number ${doNumber} not found`);
      }

      Object.assign(existingDispatchOrder, updatedFields);

      const updatedDispatchOrder = await this.dispatchOrderRepository.updateDO(
        doNumber,
        existingDispatchOrder
      );

      return updatedDispatchOrder;
    } catch (error) {
      console.error("Database error: ", error);
      throw error;
    }
  }

  async deleteDO(doNumber: string): Promise<boolean> {
    try {
      const existingDO = await this.getDOByNumber(doNumber);

      if (!existingDO) {
        return false;
      }
      const entityManager = this.dbHandler.manager;
      await entityManager.remove(existingDO);

      return true;
    } catch (error) {
      throw new Error(`Failed to delete DispatchOrderMine: ${error.message}`);
    }
  }
}
