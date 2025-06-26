export default interface Commission {
  id: number;
  info: string;
  date_of_commission: Date;
  proposal_id: number;
  user_supervisor_id: number;
  file_id: number;
  comment: string;
}
