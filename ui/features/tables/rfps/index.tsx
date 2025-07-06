'use client';

import { RFPResponse } from '@/lib/types';
import DataTable from '@/ui/components/data-table/index';
import { getRfpsTableColumns } from './columns';
import { Button } from '@/ui/components/button';
import Link from 'next/link';
import { PATHS } from '@/lib/constants/PATHS';
import { useState } from 'react';

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
  const [openRfpDetail, setOpenRfpDetail] = useState(false);
  const [selected, setSelected] = useState<RFPResponse | null>(null);

  const rfpsTableColumns = getRfpsTableColumns({
    onView: (item) => {
      setSelected(item);
      setOpenRfpDetail(true);
    },
    onOpenRfpDetail: (item) => {
      setSelected(item);
      setOpenRfpDetail(true);
    },
  });

  return (
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
    />
  );
}

const AddRFPButton = () => (
  <Link href={PATHS.dashboard.rfps.create}>
    <Button>افزودن RFP</Button>
  </Link>
);
