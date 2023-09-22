// databaseHandler.ts
import { DataSource } from "typeorm";
import { DispatchOrderMine } from "../entities/DisptachOrderMine";

export class DatabaseHandler {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getDispatchOrders() {
    const repository = this.dataSource.getRepository(DispatchOrderMine);
    return repository.find();
  }

  async createDispatchOrder(newDispatchOrder: DispatchOrderMine) {
    const repository = this.dataSource.getRepository(DispatchOrderMine);
    const result = await repository.save(newDispatchOrder);
    return result;
  }

  async getDispatchOrderByNumber(DO_number: number) {
    const repository = this.dataSource.getRepository(DispatchOrderMine);
    return repository.findOne({ where: { DO_number } });
  }

  async updateDispatchOrder(
    DO_number: number,
    updatedDispatchOrder: DispatchOrderMine
  ) {
    const repository = this.dataSource.getRepository(DispatchOrderMine);
    const result = await repository.update(DO_number, updatedDispatchOrder);
    return result;
  }

  async deleteDispatchOrder(DO_number: number) {
    const repository = this.dataSource.getRepository(DispatchOrderMine);
    const result = await repository.delete(DO_number);
    return result;
  }
}
