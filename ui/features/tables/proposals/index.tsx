'use client';

import { useMeStore } from '@/lib/stores/me.stores';
import { ProposalResponse } from '@/lib/types';
import { UserType } from '@/lib/types/UserType.enum';
import DataTable from '@/ui/components/data-table/index';
import { useState } from 'react';
import AcceptProposalModal from '../../modals/accept-proposal.modal';
import { getProposalsTableColumns } from './columns';
import { AssignSupervisorToProposalSidebar } from './components/assign-supervisor-to-proposal-sidebar';
import { EditProposalSideBar } from './components/edit-proposal-sidebar';
import { ProposalDetailSideBar } from './components/proposal-detail';
import RequestEditProposalModal from '../../modals/request-edit-proposal.modal';

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
  isInitialLoading: boolean;
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
  isInitialLoading,
}: Props) {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);
  const isResearcher = userTypeId === UserType.Researcher;
  const isExplorer = userTypeId === UserType.Explorer;

  const [isOpenAssignSupervisor, setIsOpenAssignSupervisor] = useState(false);
  const [isOpenEditRequestModal, setIsOpenEditRequestModal] = useState(false);

  const [isOpenConfirmProposal, setIsOpenConfirmProposal] = useState(false);

  const [openProposalDetail, setOpenProposalDetail] = useState(false);
  const [openEditProposal, setOpenEditProposal] = useState(false);

  const [selected, setSelected] = useState<ProposalResponse | null>(null);

  const proposalsTableColumns = getProposalsTableColumns(userTypeId!, {
    onOpenConfirmProposal: (item) => {
      setSelected(item);
      setIsOpenConfirmProposal(true);
    },
    onEditProposal: (item) => {
      setSelected(item);
      setOpenEditProposal(true);
    },
    onOpenProposalDetail: (item) => {
      setSelected(item);
      setOpenProposalDetail(true);
    },
    onOpenAssignProposal(item) {
      setSelected(item);
      setIsOpenAssignSupervisor(true);
    },
    onRequestEditProposal(proposal) {
      setSelected(proposal);
      setIsOpenEditRequestModal(true);
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
        loading={isInitialLoading}
      />

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

      <AssignSupervisorToProposalSidebar
        open={isOpenAssignSupervisor}
        onOpenChange={() => setIsOpenAssignSupervisor(false)}
        selected={selected!}
      />

      <AcceptProposalModal
        open={isResearcher && !!selected && isOpenConfirmProposal}
        onOpenChange={(state) => setIsOpenConfirmProposal(state)}
        proposalToAccept={selected}
      />

      <RequestEditProposalModal
        open={isExplorer && !!selected && isOpenEditRequestModal}
        onOpenChange={(state) => setIsOpenEditRequestModal(state)}
        proposalToEdit={selected}
      />
    </>
  );
}
