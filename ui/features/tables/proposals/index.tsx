import { ProposalResponse } from 'lib/types/proposalResponse';
import DataTable from '@/ui/components/data-table/index';
import { proposalsTableColumns } from './columns';

interface Props {
  data: ProposalResponse[];
}

export default function ProposalsTable({ data }: Props) {
  return <DataTable columns={proposalsTableColumns} data={data} />;
}
