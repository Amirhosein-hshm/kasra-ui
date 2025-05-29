import { ProposalForTable } from '@/lib/types/models/Proposal';
import DataTable from '@/ui/components/data-table/index';
import { proposalsTableColumns } from './columns';

interface Props {
  data: ProposalForTable[];
}

export default function ProposalsTable({ data }: Props) {
  return <DataTable columns={proposalsTableColumns} data={data} />;
}
