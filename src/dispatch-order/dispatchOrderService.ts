import joi, { Schema } from "joi";
import { DataSource } from "typeorm";
import DispatchOrderRepository from "./dispatchOrderRepository";
import { DispatchOrderMine } from "../entities/dispatchOrderMine";

export const updateDOValidationSchema: Schema<Partial<DispatchOrderMine>> = joi
  .object({
    doNumber: joi.string().required(),
    isDoWithPo: joi.boolean(),
    poNumber: joi.string(),
    poItemNumber: joi.number(),
    quantity: joi.number(),
    deliveredQuantity: joi.number(),
    coalGradeName: joi.string(),
    mineName: joi.string(),
    coalType: joi.string(),
    transporterNames: joi.string(),
    remarks: joi.string(),
    doIssueDate: joi.date(),
    doStartDate: joi.date(),
    isGrace: joi.boolean(),
    doEndDate: joi.date(),
    doStatus: joi.string(),
    createdBy: joi.string(),
    updatedBy: joi.string(),
  })
  .required();

export default class DispatchOrderService {
  private dispatchOrderRepository: DispatchOrderRepository;
  private dbHandler: DataSource;

  constructor(dbHandler: DataSource) {
    this.dbHandler = dbHandler;
    this.dispatchOrderRepository = new DispatchOrderRepository(this.dbHandler);
  }

  //get all records
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

  //get DO by doNumber
  public async getDOByNumber(doNumber: string) {
    try {
      return this.dispatchOrderRepository.getDOByNumber(doNumber);
    } catch (error) {
      throw new Error(
        `Failed to fetch DispatchOrderMine by number: ${error.message}`
      );
    }
  }

  //Create a new DO
  public async createDo(input: DispatchOrderMine) {
    console.log("Input Data:", input);

    console.log(`Checking for existing DO with DO_number: ${input.doNumber}`);
    const existingDo = await this.dispatchOrderRepository.getDOByNumber(
      input.doNumber
    );
    console.log(`Existing DO: ${JSON.stringify(existingDo)}`);

    if (existingDo) {
      throw new Error(
        "A dispatch order with the same DO number already exists"
      );
    }
    console.log("Creating a new Dispatch Order...");

    const newDO = await this.dispatchOrderRepository.createDO(input);
    console.log("New Dispatch Order created:", newDO);

    return newDO;
  }
  catch(error) {
    console.error("Database error:  ", error);
    throw error;
  }

  //Update a DO
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

  //Delete a DO
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

// public async createDo(input: DispatchOrderMine) {
//   console.log("Input Data:", input);

//   const { error } = createDOValidationSchema.validate(input);
//   if (error) {
//     throw new Error(`Input validation failed: ${error.message}`);
//   }
//   console.log(`Checking for existing DO with DO_number: ${input.doNumber}`);

//   const existingDo = await this.dispatchOrderRepository.getDOByNumber(
//     input.doNumber
//   );
//   console.log(`Existing DO: ${JSON.stringify(existingDo)}`);

//   if (existingDo) {
//     throw new Error(
//       "A dispatch order with the same DO number already exists"
//     );
//   }
//   console.log("Creating a new Dispatch Order...");

//   const newDO = await this.dispatchOrderRepository.createDO(input);
//   console.log("New Dispatch Order created:", newDO);

//   return newDO;
// }
// catch(error) {
//   console.error("Database error:  ", error);
//   throw error;
// }

// public async createDo(doNumber: string) {
//   try {
//     console.log(`Checking for existing DO with DO_number: ${doNumber}`);

//     const existingDo = await this.dispatchOrderRepository.getDOByNumber(
//       doNumber
//     );
//     console.log(`Existing DO: ${JSON.stringify(existingDo)}`);

//     if (existingDo) {
//       throw new Error(
//         "A dispatch order with the same DO number already exists"
//       );
//     }
//     const newDO = new DispatchOrderMine(); //we create a new DispatchOrderMine object
//     newDO.doNumber = doNumber; // here we set the doNumber property

//     const createdDO = await this.dispatchOrderRepository.createDO(newDO);
//     return createdDO;
//   } catch (error) {
//     console.error("Database error: ", error);
//     throw error;
//   }
// }
