"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHandler = void 0;
const DisptachOrderMine_1 = require("../entities/DisptachOrderMine");
class DatabaseHandler {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getDispatchOrders() {
        const repository = this.dataSource.getRepository(DisptachOrderMine_1.DispatchOrderMine);
        return repository.find();
    }
    async createDispatchOrder(newDispatchOrder) {
        const repository = this.dataSource.getRepository(DisptachOrderMine_1.DispatchOrderMine);
        const result = await repository.save(newDispatchOrder);
        return result;
    }
    async getDispatchOrderByNumber(DO_number) {
        const repository = this.dataSource.getRepository(DisptachOrderMine_1.DispatchOrderMine);
        return repository.findOne({ where: { DO_number } });
    }
    async updateDispatchOrder(DO_number, updatedDispatchOrder) {
        const repository = this.dataSource.getRepository(DisptachOrderMine_1.DispatchOrderMine);
        const result = await repository.update(DO_number, updatedDispatchOrder);
        return result;
    }
    async deleteDispatchOrder(DO_number) {
        const repository = this.dataSource.getRepository(DisptachOrderMine_1.DispatchOrderMine);
        const result = await repository.delete(DO_number);
        return result;
    }
}
exports.DatabaseHandler = DatabaseHandler;
//# sourceMappingURL=databaseHandler.js.map