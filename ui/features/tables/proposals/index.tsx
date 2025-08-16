'use client';

import { useMeStore } from '@/lib/stores/me.stores';
import { ProposalResponse } from '@/lib/types';
import DataTable from '@/ui/components/data-table/index';
import { useState } from 'react';
import { getProposalsTableColumns } from './columns';
import { EditProposalSideBar } from './components/edit-proposal-sidebar';
import { ProposalDetailSideBar } from './components/proposal-detail';
import Modal from '@/ui/components/modal/modal';
import { UserType } from '@/lib/types/UserType.enum';
import { useQueryClient } from '@tanstack/react-query';
import {
  useEditExplorerProposal,
  useEditProposalAndCreateProject,
  useExplorerUsersSupervisor,
} from '@/lib/hooks';
import { toast } from 'sonner';
import { Button } from '@/ui/components/button';
import { useForm } from 'react-hook-form';
import { AssignSupervisorToProposalSidebar } from './components/assign-supervisor-to-proposal-sidebar';

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

  const queryClient = useQueryClient();

  const [isOpenAssignSupervisor, setIsOpenAssignSupervisor] = useState(false);

  const explorerForm = useForm({
    defaultValues: {
      supervisor_id: -1,
    },
  });
  const {
    mutateAsync: assignSupervisorToProposal,
    isPending: isPendingAssignSupervisorToProposal,
  } = useEditExplorerProposal();
  const handleSubmitExplorerForm = explorerForm.handleSubmit((data) => {
    if (selected)
      assignSupervisorToProposal({
        proposalId: selected.id,
        payload: {
          supervisorId: data.supervisor_id,
          // FIXME:
          comment: '',
        },
      })
        .then(() => {
          toast.success('تعیین ناظر انجام شد');
          setIsOpenAssignSupervisor(false);
          queryClient.invalidateQueries();
        })
        .catch(() => {
          toast.error('تعیین ناظر موفقیت آمیز نبود');
        });
  });

  const {
    mutateAsync: editProposalAndCreateProject,
    isPending: editProposalAndCreateProjectIsPending,
  } = useEditProposalAndCreateProject();
  const handleSubmitEditProposalAndCreateProject = async (accept: boolean) => {
    if (!isResearcher || !selected) return;
    editProposalAndCreateProject({
      proposalId: selected.id,
      accept,
    })
      .then(() => {
        toast.success(`پروپوزال ${accept ? 'تایید' : 'رد'} شد`);
        handleCloseConfirmProposal();
        queryClient.invalidateQueries();
      })
      .catch(() => {
        toast.error('تایید پروپوزال موفقیت آمیز نبود');
      });
  };

  const [isOpenConfirmProposal, setIsOpenConfirmProposal] = useState(false);
  const handleCloseConfirmProposal = () => {
    setIsOpenConfirmProposal(false);
  };

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

      <Modal
        open={isOpenConfirmProposal}
        onOpenChange={handleCloseConfirmProposal}
        title={`تایید پروپوزال ${selected?.id}`}
        size="xl"
        disableOutsideClose
        showDefaultFooter={false}
        customFooter={
          <div className="flex w-full gap-2 justify-end">
            <Button
              className="w-20"
              loading={editProposalAndCreateProjectIsPending}
              variant="outline"
              onClick={() => handleSubmitEditProposalAndCreateProject(false)}
            >
              رد
            </Button>
            <Button
              className="w-20"
              loading={editProposalAndCreateProjectIsPending}
              onClick={() => handleSubmitEditProposalAndCreateProject(true)}
            >
              تایید
            </Button>
          </div>
        }
      >
        این پروپوزال را تایید میکنید؟
      </Modal>
    </>
  );
}
