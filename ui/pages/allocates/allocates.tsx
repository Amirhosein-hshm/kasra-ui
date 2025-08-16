'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, startTransition } from 'react';
import {
  useBrokerAllocates,
  useUserAllocates,
  useResearcherAllocates,
  useExplorerAllocates,
  useDataTableRequirements,
} from '@/lib/hooks';
import { useDebounced } from '@/lib/utils/hooks/useDebounce';
import AllocatesTable from '@/ui/features/tables/allocations';
import { useMeStore } from '@/lib/stores/me.stores';

export default function AllocatePage() {
  const router = useRouter();

  const {
    searchParams,
    debouncedInfo,
    pageIndex,
    pageSize,
    searchInput,
    setPageIndex,
    setSearchInput,
    pageFromUrl,
    infoFromUrl,
    queryParams,
  } = useDataTableRequirements();

  useEffect(() => {
    setPageIndex(pageFromUrl - 1);
    setSearchInput(infoFromUrl);
  }, [pageFromUrl, infoFromUrl]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (pageIndex + 1).toString());
    if (debouncedInfo) params.set('info', debouncedInfo);
    else params.delete('info');

    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  }, [pageIndex, debouncedInfo]);

  useEffect(() => {
    setPageIndex(0);
  }, [debouncedInfo]);

  const userTypeId = useMeStore((s) => s.user?.userTypeId);

  const brokerQ = useBrokerAllocates(userTypeId!, queryParams);

  const userQ = useUserAllocates(userTypeId!, queryParams);

  const researcherQ = useResearcherAllocates(userTypeId!, queryParams);

  const explorerQ = useExplorerAllocates(userTypeId!, queryParams);

  const data = brokerQ.data || userQ.data || researcherQ.data || explorerQ.data;
  const isInitialLoading =
    (brokerQ.isLoading ||
      userQ.isLoading ||
      researcherQ.isLoading ||
      explorerQ.isLoading) &&
    !data;

  const total = 30;

  return (
    <AllocatesTable
      data={data ?? []}
      pageIndex={pageIndex}
      pageSize={pageSize}
      pageCount={Math.ceil(total / pageSize)}
      setPageIndex={setPageIndex}
      setPageSize={() => {}}
      search={searchInput}
      setSearch={setSearchInput}
      isFetching={
        brokerQ.isFetching ||
        userQ.isFetching ||
        researcherQ.isFetching ||
        explorerQ.isFetching
      }
      isInitialLoading={isInitialLoading}
    />
  );
}
