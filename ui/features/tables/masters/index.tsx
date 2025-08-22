'use client';

import { MasterResponse } from '@/lib/types';
import { Button } from '@/ui/components/button';
import DataTable from '@/ui/components/data-table/index';
import { useState } from 'react';
import { getMasterTableColumns } from './columns';
import { MasterSidebar } from './components/MasterSidebar';

interface Props {
  data: MasterResponse[];
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

export default function MastersTable({
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
  const [masterToUpdate, setMasterToUpdate] = useState<MasterResponse | null>(
    null
  );

  const [isOpenMasterSidebar, setIsOpenMasterSidebar] = useState(false);
  function handleMasterSidebarOpenChange(state) {
    if (!state) {
      // Clean up state on closing sidebar
      setMasterToUpdate(null);
    }
    setIsOpenMasterSidebar(state);
  }

  const MastersTableColumns = getMasterTableColumns({
    onEdit: (item) => {
      setMasterToUpdate(item);
      setIsOpenMasterSidebar(true);
    },
  });

  return (
    <>
      <DataTable
        columns={MastersTableColumns}
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
        headerAppendix={
          <Button className="ml-2" onClick={handleMasterSidebarOpenChange}>
            افزودن استاد راهنما
          </Button>
        }
      />

      <MasterSidebar
        open={isOpenMasterSidebar}
        onOpenChange={handleMasterSidebarOpenChange}
        selected={masterToUpdate}
      />
    </>
  );
}
