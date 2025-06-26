export default interface Report {
  id: number;
  status: number;
  percent: number;
  project_id: number;
  comment: string;
}

export type ReportForTable = Pick<
  Report,
  'id' | 'status' | 'percent' | 'project_id'
>;
