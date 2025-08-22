'use client';

import { useResearcherMasters, useTablePagination } from '@/lib/hooks';
import MastersTable from '../features/tables/masters';

export default function MastersPage() {
  const {
    queryParams,
    info,
    pageCount,
    pageIndex,
    pageSize,
    setInfo,
    setPageIndex,
    setPageSize,
  } = useTablePagination();

  const researcherMastersQuery = useResearcherMasters(queryParams);
  const isLoading = researcherMastersQuery.isLoading;
  const isFetching = researcherMastersQuery.isFetching;
  const data = researcherMastersQuery.data;

  return (
    <MastersTable
      data={data || []}
      pageIndex={pageIndex}
      pageSize={pageSize}
      pageCount={pageCount}
      setPageIndex={setPageIndex}
      setPageSize={setPageSize}
      search={info}
      setSearch={setInfo}
      isFetching={isFetching}
      isInitialLoading={isLoading}
    />
  );
}
