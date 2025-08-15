'use client';

import { AllocateResponse } from '@/lib/types';
import DataTable from '@/ui/components/data-table/index';
import { useState } from 'react';
import { getAllocateTableColumns } from './columns';
import { AllocateDetailSideBar } from './components/allocateDetailSidebar';
import { AddProjectTitleSideBar } from './components/addProjectTitle';
import { useMeStore } from '@/lib/stores/me.stores';
import Modal from '@/ui/components/modal/modal';
import { Button } from '@/ui/components/button';
import { useEditResearcherAllocate } from '@/lib/hooks';
import { toast } from 'sonner';

interface Props {
  data: AllocateResponse[];
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

export default function AllocatesTable({
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
  const [selected, setSelected] = useState<AllocateResponse | null>(null);

  const [isOpenAllocateDetails, setIsOpenAllocateDetails] = useState(false);

  const [isOpenAddProjectTitle, setIsOpenAddProjectTitle] = useState(false);

  const [isOpenConfirmeAllocate, setIsOpenConfirmeAllocate] = useState(false);

  const handleCloseConfrimeAllocate = () => {
    setIsOpenConfirmeAllocate(false);
  };

  const {
    mutateAsync: runEditResearcherAllocate,
    isPending: editResearcherLoading,
  } = useEditResearcherAllocate({});

  const handleRejectResearcherAllocate = async () => {
    try {
      await runEditResearcherAllocate({
        allocateId: selected?.id!,
        params: { accept: false },
      });
      toast.success('موضوع پروژه رد شد');
      handleCloseConfrimeAllocate();
    } catch (e) {
      toast.error('خطا در انجام عملیات');
    }
  };

  const handleAcceptResearcherAllocate = async () => {
    try {
      await runEditResearcherAllocate({
        allocateId: selected?.id!,
        params: { accept: true },
      });
      toast.success('تایید موضوع پروژه');
      handleCloseConfrimeAllocate();
    } catch (e) {
      toast.error('خطا در انجام عملیات');
    }
  };
  const userTypeId = useMeStore((s) => s.user?.userTypeId);

  const allocatesTableColumns = getAllocateTableColumns(userTypeId!, {
    onView: (item) => {
      setSelected(item);
      setIsOpenAllocateDetails(true);
    },
    onOpenAddProjectTitle: (item) => {
      setSelected(item);
      setIsOpenAddProjectTitle(true);
    },

    onOpenConfrimeAllocate: (item) => {
      setSelected(item);
      setIsOpenConfirmeAllocate(true);
    },
  });

  return (
    <>
      <DataTable
        columns={allocatesTableColumns}
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
      <AllocateDetailSideBar
        open={isOpenAllocateDetails}
        onOpenChange={setIsOpenAllocateDetails}
        selected={selected}
      />
      <AddProjectTitleSideBar
        onOpenChange={setIsOpenAddProjectTitle}
        open={isOpenAddProjectTitle}
        selected={selected}
      />
      <Modal
        open={isOpenConfirmeAllocate}
        onOpenChange={handleCloseConfrimeAllocate}
        title={`تایید موضوع پروژه ${selected?.projectTitle}`}
        size="xl"
        disableOutsideClose
        showDefaultFooter={false}
        customFooter={
          <div className="flex w-full gap-2 justify-end">
            <Button
              className="w-20"
              loading={editResearcherLoading}
              variant="outline"
              onClick={handleRejectResearcherAllocate}
            >
              رد
            </Button>
            <Button
              className="w-20"
              loading={editResearcherLoading}
              onClick={handleAcceptResearcherAllocate}
            >
              تایید
            </Button>
          </div>
        }
      >
        این موضوع را برای این پروژه تایید میکنید؟
      </Modal>
    </>
  );
}
