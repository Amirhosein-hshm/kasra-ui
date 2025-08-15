'use client';

import { useMeStore } from '@/lib/stores/me.stores';
import { ProposalResponse } from '@/lib/types';
import DataTable from '@/ui/components/data-table/index';
import { useState } from 'react';
import { getProposalsTableColumns } from './columns';
import { EditProposalSideBar } from './components/edit-proposal-sidebar';
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
  isFetching: boolean;
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
  isFetching,
}: Props) {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);

  const [openProposalDetail, setOpenProposalDetail] = useState(false);
  const [openCommission, setOpenCommission] = useState(false);
  const [openEditProposal, setOpenEditProposal] = useState(false);

  const [selected, setSelected] = useState<ProposalResponse | null>(null);

  const proposalsTableColumns = getProposalsTableColumns(userTypeId!, {
    onOpenCommission: (item) => {
      setSelected(item);
      setOpenCommission(true);
    },
    onEditProposal: (item) => {
      setSelected(item);
      setOpenEditProposal(true);
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
        isFetching={isFetching}
      />
      {/* <CommissionSideBar
        open={openCommission}
        onOpenChange={setOpenCommission}
        selected={selected}
      /> */}
      <ProposalDetailSideBar
        open={openProposalDetail}
        onOpenChange={setOpenProposalDetail}
        selected={selected}
      />

      <EditProposalSideBar
        open={openEditProposal}
        onOpenChange={() => setOpenEditProposal(false)}
        selected={selected!}
      />
    </>
  );
}
