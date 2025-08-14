'use client';

import { RFPResponse } from '@/lib/types';
import DataTable from '@/ui/components/data-table/index';
import { getRfpsTableColumns } from './columns';
import { useState } from 'react';
import { RFPDetailSideBar } from './components/rfpDetailSidebar';

interface Props {
  data: RFPResponse[];
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

export default function RfpsTable({
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
  const [selected, setSelected] = useState<RFPResponse | null>(null);

  const [isOpenRfpDetails, setIsOpenRfpDetails] = useState(false);

  const rfpsTableColumns = getRfpsTableColumns({
    onView: (item) => {
      setSelected(item);
      setIsOpenRfpDetails(true);
    },
    onOpenRfpAllocate: (item) => {
      setSelected(item);
    },
  });

  return (
    <>
      <DataTable
        columns={rfpsTableColumns}
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

      <RFPDetailSideBar
        open={isOpenRfpDetails}
        onOpenChange={setIsOpenRfpDetails}
        selected={selected}
      />
    </>
  );
}
