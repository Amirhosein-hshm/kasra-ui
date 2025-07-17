'use client';

import { useSupervisorReports, useTablePagination } from '@/lib/hooks';
import ReportForTable from '@/lib/ui-types/ReportForTable.interface';
import { TableSkeleton } from '@/ui/components/loadings/table-loading';
import ReportsTable from '@/ui/features/tables/report';

export default function ReportsPage() {
  const { queryParams, pageIndex, pageSize, info, setPageIndex, setInfo } =
    useTablePagination();

  const supervisorQ = useSupervisorReports(queryParams, {
    enabled: true,
    queryKey: ['supervisorReports', queryParams],
  });
  const dataRaw = supervisorQ.data;
  const isLoading = supervisorQ.isLoading;
  const total = 30;

  if (isLoading || !dataRaw) return <TableSkeleton />;

  const data: ReportForTable[] = dataRaw?.map((data) => ({
    id: data.id,
    // FIXME:
    status: data.state ? '?' : '!',
    project: data.project.title,
    // FIXME:
    percentage: 0,
  }));

  return (
    <ReportsTable
      data={data}
      pagination={{
        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize: () => {},
        pageCount: total,
      }}
      search={{
        search: info,
        setSearch: setInfo,
      }}
    />
  );
}
