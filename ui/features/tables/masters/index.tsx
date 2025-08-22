'use client';

import { MasterResponse } from '@/lib/types';
import { Button } from '@/ui/components/button';
import DataTable from '@/ui/components/data-table/index';
import { useState } from 'react';
import { getMasterTableColumns } from './columns';
import { AddMasterSidebar } from './components/MasterSidebar';

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
  const [selected, setSelected] = useState<MasterResponse | null>(null);

  const [isOpenAddMasterSidebar, setIsOpenAddMasterSidebar] = useState(false);

  const MastersTableColumns = getMasterTableColumns({
    onEdit: (item) => {
      setSelected(item);
    },
    onDelete: (item) => {
      setSelected(item);
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
          <Button
            className="ml-2"
            onClick={() => setIsOpenAddMasterSidebar(true)}
          >
            افزودن استاد راهنما
          </Button>
        }
      />

      <AddMasterSidebar
        open={isOpenAddMasterSidebar}
        onOpenChange={(state) => setIsOpenAddMasterSidebar(state)}
      />
    </>
  );
}
