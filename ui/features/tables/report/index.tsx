'use client';

import DataTable from '@/ui/components/data-table/index';
import { getReportsTableColumns } from './columns';
import { ReportResponse } from '@/lib/types';
import { ReactNode, useState } from 'react';
import PaginationProps from '@/lib/ui-types/PaginationProps.interface';
import SearchProps from '@/lib/ui-types/SearchProps.interface';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/lib/constants/PATHS';
import ReportForTable from '@/lib/ui-types/ReportForTable.interface';

interface Props {
  data: ReportForTable[];
  pagination?: PaginationProps;
  search?: SearchProps;
  headerAppendix?: ReactNode;
  deactivateSelection?: boolean;
  loading?: boolean;
}

export default function ReportsTable({
  data,
  pagination,
  search,
  headerAppendix,
  deactivateSelection,
  loading,
}: Props) {
  const [openReportDetail, setOpenReportDetail] = useState(false);
  const [selected, setSelected] = useState<ReportForTable | null>(null);
  const router = useRouter();

  const reportsTableColumns = getReportsTableColumns({
    onView: (item) => {
      router.push(PATHS.dashboard.reports.single(item.id));
    },
    deactivateSelection,
  });

  return (
    <DataTable
      columns={reportsTableColumns}
      data={data}
      externalPagination={pagination}
      search={search?.search}
      setSearch={search?.setSearch}
      headerAppendix={headerAppendix}
      loading={loading}
    />
  );
}
