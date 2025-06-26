export default interface RFP {
  id: number;
  RFP_field_id: number;
  file_id: number;
  info: string;
}

export type RFPForTable = Pick<RFP, 'id' | 'info'>;
