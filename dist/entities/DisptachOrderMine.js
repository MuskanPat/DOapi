"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchOrderMine = void 0;
const typeorm_1 = require("typeorm");
let DispatchOrderMine = class DispatchOrderMine {
};
exports.DispatchOrderMine = DispatchOrderMine;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DispatchOrderMine.prototype, "DO_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_DO_with_PO", type: "boolean" }),
    __metadata("design:type", Boolean)
], DispatchOrderMine.prototype, "is_DO_with_PO", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PO_number", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], DispatchOrderMine.prototype, "PO_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PO_item_number", type: "int" }),
    __metadata("design:type", Number)
], DispatchOrderMine.prototype, "PO_item_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], DispatchOrderMine.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "delivered_quantity", type: "int" }),
    __metadata("design:type", Number)
], DispatchOrderMine.prototype, "delivered_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "coal_grade_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], DispatchOrderMine.prototype, "coal_grade_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "mine_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], DispatchOrderMine.prototype, "mine_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "coal_type", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], DispatchOrderMine.prototype, "coal_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "transporter_names", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], DispatchOrderMine.prototype, "transporter_names", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], DispatchOrderMine.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "DO_issue_date", type: "date" }),
    __metadata("design:type", Date)
], DispatchOrderMine.prototype, "DO_issue_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "DO_start_date", type: "date" }),
    __metadata("design:type", Date)
], DispatchOrderMine.prototype, "DO_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_grace", type: "boolean" }),
    __metadata("design:type", Boolean)
], DispatchOrderMine.prototype, "is_grace", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "DO_end_date", type: "date" }),
    __metadata("design:type", Date)
], DispatchOrderMine.prototype, "DO_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "DO_status", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], DispatchOrderMine.prototype, "DO_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "created_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], DispatchOrderMine.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_by", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], DispatchOrderMine.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "updated_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], DispatchOrderMine.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_by", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], DispatchOrderMine.prototype, "updated_by", void 0);
exports.DispatchOrderMine = DispatchOrderMine = __decorate([
    (0, typeorm_1.Entity)("dispatch_order_mines")
], DispatchOrderMine);
//# sourceMappingURL=DisptachOrderMine.js.map