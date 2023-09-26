export default interface DoCreateInput {
  DO_number: string;
  is_DO_with_PO: boolean;
  PO_number: string;
  PO_item_number: number;
  quantity: number;
  delivered_quantity: number;
  coal_grade_name: string;
  mine_name: string;
  coal_type: string;
  transporter_names: string;
  remarks: string;
  DO_issue_date: Date;
  DO_start_date: Date;
  is_grace: boolean;
  DO_end_date: Date;
  DO_status: string;
  created_by: string;
  updated_by: string;
}
