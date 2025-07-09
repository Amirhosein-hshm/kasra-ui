'use client';

import { RFPResponse } from '@/lib/types';
import DataTable from '@/ui/components/data-table/index';
import { getRfpsTableColumns } from './columns';
import { Button } from '@/ui/components/button';
import { useState } from 'react';
import { AddRFPSidebar } from './components/addRfpSidbar';
import { EditRFPSidebar } from './components/EditRfpSidbar';

interface Props {
  data: RFPResponse[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  search: string;
  setSearch: (v: string) => void;
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
}: Props) {
  const [openRfpAdd, setOpenRfpAdd] = useState(false);
  const [selected, setSelected] = useState<RFPResponse | null>(null);

  const [openRfpEdit, setOpenRfpEdit] = useState(false);

  const rfpsTableColumns = getRfpsTableColumns({
    onView: (item) => {
      setSelected(item);
      // setOpenRfpDetail(true);
    },
    onOpenRfpEdit: (item) => {
      setSelected(item);
      setOpenRfpEdit(true);
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
        headerAppendix={
          <Button onClick={() => setOpenRfpAdd(true)}>افزودن RFP</Button>
        }
      />
      <AddRFPSidebar
        open={openRfpAdd}
        onOpenChange={() => setOpenRfpAdd(false)}
      />
      <EditRFPSidebar
        /* @ts-ignore */
        selected={{ ...selected, RFP_field_id: 22 }!}
        open={openRfpEdit}
        onOpenChange={() => setOpenRfpEdit(false)}
      />
    </>
  );
}
