'use client';

import { AllocateResponse } from '@/lib/types';
import DataTable from '@/ui/components/data-table/index';
import { useState } from 'react';
import { getAllocateTableColumns } from './columns';
import { AllocateDetailSideBar } from './components/allocateDetailSidebar';

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

  const allocatesTableColumns = getAllocateTableColumns({
    onView: (item) => {
      setSelected(item);
      setIsOpenAllocateDetails(true);
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
    </>
  );
}
