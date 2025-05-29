export default interface Proposal {
  id: number;
  info: string;
  state: number;
  title: string;
  RFP_id: number;
  user_id: number;
  file_id: number;
  comment: string;
}

export type ProposalForTable = Pick<
  Proposal,
  'id' | 'title' | 'state' | 'user_id'
>;
