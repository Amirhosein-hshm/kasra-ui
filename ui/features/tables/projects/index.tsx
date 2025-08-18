'use client';

import { useEditAcceptingProject } from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import { ProjectResponse } from '@/lib/types';
import { Button } from '@/ui/components/button';
import DataTable from '@/ui/components/data-table/index';
import Modal from '@/ui/components/modal/modal';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { getProjectsTableColumns } from './columns';

interface Props {
  data: ProjectResponse[];
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

export default function ProjectsTable({
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
  const me = useMeStore();
  const queryClient = useQueryClient();
  const [openProjectDetail, setOpenProjectDetail] = useState(false);
  const [isOpenApproveProject, setIsOpenApproveProject] = useState(false);
  const handleCloseApproveProjectModal = () => {
    setIsOpenApproveProject(false);
  };
  const [selected, setSelected] = useState<ProjectResponse | null>(null);

  const projectsTableColumns = getProjectsTableColumns(
    me.user?.userTypeId ?? -1,
    {
      onView: (item) => {
        setSelected(item);
        setOpenProjectDetail(true);
      },
      onOpenProjectDetail: (item) => {
        setSelected(item);
        setOpenProjectDetail(true);
      },
      onOpenApproveProject: (item) => {
        setSelected(item);
        setIsOpenApproveProject(true);
      },
    }
  );

  const approveProject = useEditAcceptingProject();
  const handleApproveProject = () => {
    if (!selected) return;
    approveProject
      .mutateAsync({ projectId: selected?.id })
      .then(() => {
        toast.success('پروژه تایید شد');
        handleCloseApproveProjectModal();
        queryClient.invalidateQueries();
      })
      .catch(() => {
        toast.error('تایید پروژه موفقیت آمیز نبود');
      });
  };

  return (
    <>
      <DataTable
        columns={projectsTableColumns}
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

      <Modal
        open={isOpenApproveProject}
        onOpenChange={handleCloseApproveProjectModal}
        title={`تایید پروپوزال ${selected?.id}`}
        size="xl"
        disableOutsideClose
        showDefaultFooter={false}
        customFooter={
          <div className="flex w-full gap-2 justify-end">
            <Button
              className="w-20"
              loading={approveProject.isPending}
              variant="outline"
              onClick={handleCloseApproveProjectModal}
            >
              لغو
            </Button>
            <Button
              className="w-20"
              loading={approveProject.isPending}
              onClick={handleApproveProject}
            >
              تایید
            </Button>
          </div>
        }
      >
        آیا از تایید این پروژه اطمینان دارید؟
      </Modal>
    </>
  );
}
