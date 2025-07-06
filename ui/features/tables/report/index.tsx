'use client';

import DataTable from '@/ui/components/data-table/index';
import { getReportsTableColumns } from './columns';
import { ReportResponse } from '@/lib/types';
import { useState } from 'react';

interface Props {
  data: ReportResponse[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  search: string;
  setSearch: (v: string) => void;
}

export default function ReportsTable({
  data,
  pageIndex,
  pageSize,
  pageCount,
  setPageIndex,
  setPageSize,
  search,
  setSearch,
}: Props) {
  const [openReportDetail, setOpenReportDetail] = useState(false);
  const [selected, setSelected] = useState<ReportResponse | null>(null);

  const reportsTableColumns = getReportsTableColumns({
    onView: (item) => {
      setSelected(item);
      setOpenReportDetail(true);
    },
    onOpenReportDetail: (item) => {
      setSelected(item);
      setOpenReportDetail(true);
    },
  });

  return (
    <DataTable
      columns={reportsTableColumns}
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
