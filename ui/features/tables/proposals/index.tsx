'use client';

import { ProposalResponse } from 'lib/types/proposalResponse';
import DataTable from '@/ui/components/data-table/index';
import { getProposalsTableColumns } from './columns';
import { useMeStore } from '@/lib/stores/me.stores';
import { useState } from 'react';
import { CommissionSideBar } from './components/commission-sidebar';
import { ProposalDetailSideBar } from './components/proposal-detail';

interface Props {
  data: ProposalResponse[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  search: string;
  setSearch: (v: string) => void;
}

export default function ProposalsTable({
  data,
  pageIndex,
  pageSize,
  pageCount,
  setPageIndex,
  setPageSize,
  search,
  setSearch,
}: Props) {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);

  const [openProposalDetail, setOpenProposalDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ProposalResponse | null>(null);

  const proposalsTableColumns = getProposalsTableColumns(userTypeId!, {
    onView: (item) => {
      setSelected(item);
      setOpen(true);
    },
    onOpenProposalDetail: (item) => {
      setSelected(item);
      setOpenProposalDetail(true);
    },
  });

  return (
    <>
      <DataTable
        columns={proposalsTableColumns}
        data={data}
        externalPagination={{
          pageIndex,
          pageSize,
          pageCount,
          setPageIndex,
          setPageSize,
        }}
        search={search}
        setSearch={setSearch}
      />

      <CommissionSideBar
        open={open}
        onOpenChange={setOpen}
        selected={selected}
      />

      <ProposalDetailSideBar
        open={openProposalDetail}
        onOpenChange={setOpenProposalDetail}
        selected={selected}
      />
    </>
  );
}
