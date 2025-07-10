'use client';

import { ProposalResponse } from 'lib/types/proposalResponse';
import DataTable from '@/ui/components/data-table/index';
import { getProposalsTableColumns } from './columns';
import { useMeStore } from '@/lib/stores/me.stores';
import { useState } from 'react';
import { CommissionSideBar } from './components/commission-sidebar';
import { ProposalDetailSideBar } from './components/proposal-detail';
import { Button } from '@/ui/components/button';
import { AddProposalSideBar } from './components/add-proposal-sidebar';
import { EditProposalSideBar } from './components/edit-proposal-sidebar';
import { UserType } from '@/lib/types/UserType.enum';

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
  const [openCommission, setOpenCommission] = useState(false);
  const [openAddProposal, setOpenAddProposal] = useState(false);
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
        headerAppendix={
          userTypeId === UserType.User && (
            <Button onClick={() => setOpenAddProposal(true)}>
              افزودن پروپوزال
            </Button>
          )
        }
      />
      <CommissionSideBar
        open={openCommission}
        onOpenChange={setOpenCommission}
        selected={selected}
      />
      <ProposalDetailSideBar
        open={openProposalDetail}
        onOpenChange={setOpenProposalDetail}
        selected={selected}
      />
      <AddProposalSideBar
        open={openAddProposal}
        onOpenChange={() => setOpenAddProposal(false)}
      />

      <EditProposalSideBar
        open={openEditProposal}
        onOpenChange={() => setOpenEditProposal(false)}
        selected={selected!}
      />
    </>
  );
}
