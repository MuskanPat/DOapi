import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("dispatch_order_mines")
export class DispatchOrderMine {
  @PrimaryGeneratedColumn()
  doNumber!: string;

  @Column({ name: "isDoWithPo", type: "boolean" })
  isDoWithPo!: boolean;

  @Column({ name: "poNumber", type: "varchar", length: 255 })
  poNumber!: string;

  @Column({ name: "poItemNumber", type: "int" })
  poItemNumber!: number;

  @Column({ name: "quantity", type: "int" })
  quantity!: number;

  @Column({ name: "deliveredQuantity", type: "int" })
  deliveredQuantity!: number;

  @Column({ name: "coalGradeName", type: "varchar", length: 255 })
  coalGradeName!: string;

  @Column({ name: "mineName", type: "varchar", length: 255 })
  mineName!: string;

  @Column({ name: "coalType", type: "varchar", length: 255 })
  coalType!: string;

  @Column({ name: "transporterNames", type: "varchar", length: 255 })
  transporterNames!: string;

  @Column({ name: "remarks", type: "text" })
  remarks!: string;

  @Column({ name: "doIssueDate", type: "date" })
  doIssueDate!: Date;

  @Column({ name: "doStartDate", type: "date" })
  doStartDate!: Date;

  @Column({ name: "isGrace", type: "boolean" })
  isGrace!: boolean;

  @Column({ name: "doEndDate", type: "date" })
  doEndDate!: Date;

  @Column({ name: "doStatus", type: "varchar", length: 255 })
  doStatus!: string;

  @Column({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ name: "createdBy", type: "varchar", length: 255 })
  createdBy!: string;

  @Column({
    name: "updatedAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({ name: "updatedBy", type: "varchar", length: 255 })
  updatedBy!: string;
}
