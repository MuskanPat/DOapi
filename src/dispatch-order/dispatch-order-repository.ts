// import { DataSource } from 'typeorm';

// export default class DispatchOrderRepository {
//     dhHandler: DataSource;

//     getDoByNumber(doNumber: string): Promise<any>{
//         return Promise.resolve({});
//     }
// }

//----------------------------------------------------------------
import { DataSource } from "typeorm";
import { DispatchOrderMine } from "../entities/DisptachOrderMine";

export default class DispatchOrderRepository {
  dbHandler: DataSource;

  constructor(dbHandler: DataSource) {
    this.dbHandler = dbHandler;
  }

  async getAllDO(): Promise<DispatchOrderMine[]> {
    try {
      const repository = this.dbHandler.getRepository(DispatchOrderMine);
      const dispatchOrders = await repository.find();
      return dispatchOrders;
    } catch (error) {
      throw new Error(
        `Failed to fetch all DispatchOrderMine records: ${error.message}`
      );
    }
  }

  async createDO(
    dispatchOrderData: DispatchOrderMine
  ): Promise<DispatchOrderMine> {
    try {
      const repository = this.dbHandler.getRepository(DispatchOrderMine);
      const newDispatchOrder = repository.create(dispatchOrderData);

      await repository.save(newDispatchOrder);

      return newDispatchOrder;
    } catch (error) {
      throw new Error(`Failed to create DispatchOrderMine: ${error.message}`);
    }
  }

  async getDOByNumber(
    DO_number: string
  ): Promise<DispatchOrderMine | undefined> {
    try {
      const repository = this.dbHandler.getRepository(DispatchOrderMine);
      const dispatchOrder = await repository.findOne({ where: { DO_number } });

      return dispatchOrder;
    } catch (error) {
      throw new Error(
        `Failed to fetch DispatchOrderMine by number: ${error.message}`
      );
    }
  }

  async updateDO(
    doNumber: string,
    updatedFields: Partial<DispatchOrderMine>
  ): Promise<DispatchOrderMine | undefined> {
    try {
      const repository = this.dbHandler.getRepository(DispatchOrderMine);

      const existingDO = await this.getDOByNumber(doNumber);

      if (!existingDO) {
        throw new Error(`Dispatch Order with DO number ${doNumber} not found`);
      }
      repository.merge(existingDO, updatedFields);

      const updatedDispatchOrder = await repository.save(existingDO);

      return updatedDispatchOrder;
    } catch (error) {
      throw new Error(`Failed to update DispatchOrderMine: ${error.message}`);
    }
  }

  async deleteDO(doNumber: string): Promise<void> {
    try {
      const existingDO = await this.getDOByNumber(doNumber);

      if (!existingDO) {
        throw new Error(`Dispatch Order with doNumber ${doNumber} not found`);
      }

      const entityManager = this.dbHandler.manager;

      await entityManager.remove(existingDO);
    } catch (error) {
      throw new Error(`Failed to delete DispatchOrderMine: ${error.message}`);
    }
  }
}
