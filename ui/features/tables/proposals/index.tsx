import { ProposalResponse } from 'lib/types/proposalResponse';
import DataTable from '@/ui/components/data-table/index';
import { getProposalsTableColumns } from './columns';
import { useMeStore } from '@/lib/stores/me.stores';

interface Props {
  data: ProposalResponse[];
}

export default function ProposalsTable({ data }: Props) {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);
  const proposalsTableColumns = getProposalsTableColumns(userTypeId!);

  return <DataTable columns={proposalsTableColumns} data={data} />;
}
