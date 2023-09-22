import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("dispatch_order_mines")
export class DispatchOrderMine {
  @PrimaryGeneratedColumn()
  DO_number!: number;

  @Column({ name: "is_DO_with_PO", type: "boolean" })
  is_DO_with_PO!: boolean;

  @Column({ name: "PO_number", type: "varchar", length: 255 })
  PO_number!: string;

  @Column({ name: "PO_item_number", type: "int" })
  PO_item_number!: number;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ name: "delivered_quantity", type: "int" })
  delivered_quantity!: number;

  @Column({ name: "coal_grade_name", type: "varchar", length: 255 })
  coal_grade_name!: string;

  @Column({ name: "mine_name", type: "varchar", length: 255 })
  mine_name!: string;

  @Column({ name: "coal_type", type: "varchar", length: 255 })
  coal_type!: string;

  @Column({ name: "transporter_names", type: "varchar", length: 255 })
  transporter_names: string;

  @Column({ type: "text" })
  remarks: string;

  @Column({ name: "DO_issue_date", type: "date" })
  DO_issue_date!: Date;

  @Column({ name: "DO_start_date", type: "date" })
  DO_start_date!: Date;

  @Column({ name: "is_grace", type: "boolean" })
  is_grace!: boolean;

  @Column({ name: "DO_end_date", type: "date" })
  DO_end_date!: Date;

  @Column({ name: "DO_status", type: "varchar", length: 255 })
  DO_status!: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @Column({ name: "created_by", type: "varchar", length: 255 })
  created_by: string;

  @Column({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;

  @Column({ name: "updated_by", type: "varchar", length: 255 })
  updated_by: string;
}
