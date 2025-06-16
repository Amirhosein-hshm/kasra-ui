import Proposal, { ProposalForTable } from '@/lib/types/models/Proposal';
import ProposalsTable from '@/ui/features/tables/proposals';

export default function ProposalsPage() {
  return <ProposalsTable data={MOCK_PROPOSALS} />;
}

const MOCK_PROPOSALS: ProposalForTable[] = [
  {
    id: 1,
    title: 'پروپوزال 1',
    state: 0,
    user_id: 1,
  },
  {
    id: 2,
    title: 'پروپوزال 2',
    state: 0,
    user_id: 2,
  },
  {
    id: 3,
    title: 'پروپوزال 3',
    state: 0,
    user_id: 3,
  },
  {
    id: 4,
    title: 'پروپوزال 4',
    state: 0,
    user_id: 4,
  },
  {
    id: 5,
    title: 'پروپوزال 5',
    state: 0,
    user_id: 5,
  },
  {
    id: 6,
    title: 'پروپوزال 6',
    state: 0,
    user_id: 6,
  },
  {
    id: 7,
    title: 'پروپوزال 7',
    state: 0,
    user_id: 7,
  },
  {
    id: 8,
    title: 'پروپوزال 8',
    state: 0,
    user_id: 8,
  },
  {
    id: 9,
    title: 'پروپوزال 9',
    state: 0,
    user_id: 9,
  },
  {
    id: 10,
    title: 'پروپوزال 10',
    state: 0,
    user_id: 10,
  },
  {
    id: 11,
    title: 'پروپوزال 11',
    state: 0,
    user_id: 11,
  },
];
