import { ProposalResponse } from 'lib/types/proposalResponse';
import DataTable from '@/ui/components/data-table/index';
import { getProposalsTableColumns } from './columns';
import { useMeStore } from '@/lib/stores/me.stores';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { useState } from 'react';
import { CommissionSideBar } from './commission-sidebar';

interface Props {
  data: ProposalResponse[];
}

export default function ProposalsTable({ data }: Props) {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ProposalResponse | null>(null);
  const proposalsTableColumns = getProposalsTableColumns(userTypeId!, {
    onView: (item) => {
      setSelected(item);
      setOpen(true);
    },
  });

  return (
    <>
      <DataTable columns={proposalsTableColumns} data={data} />
      <CommissionSideBar
        open={open}
        onOpenChange={setOpen}
        selected={selected}
      />
    </>
  );
}
