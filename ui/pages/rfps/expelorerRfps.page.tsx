'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, startTransition } from 'react';
import { useSearchExplorerRfps } from '@/lib/hooks';
import RfpsTable from '@/ui/features/tables/rfps/rfpExpelorer';
import { useDebounced } from '@/lib/utils/hooks/useDebounce';

export default function RfpsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = useMemo(() => {
    const raw = searchParams.get('page');
    const page = raw ? parseInt(raw, 10) : 1;
    return isNaN(page) || page < 1 ? 1 : page;
  }, [searchParams]);

  const infoFromUrl = useMemo(
    () => searchParams.get('info') || '',
    [searchParams]
  );

  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(pageFromUrl - 1);

  const [searchInput, setSearchInput] = useState(infoFromUrl);
  const debouncedInfo = useDebounced(searchInput, 450);

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

  const queryParams = useMemo(
    () => ({
      skip: pageIndex * pageSize,
      limit: pageSize,
      info: debouncedInfo || undefined,
    }),
    [pageIndex, pageSize, debouncedInfo]
  );

  const explorerQ = useSearchExplorerRfps(queryParams);
  const data = explorerQ.data;
  const isInitialLoading = explorerQ.isLoading && !data;

  const total = 30;

  return (
    <RfpsTable
      data={data ?? []}
      pageIndex={pageIndex}
      pageSize={pageSize}
      pageCount={Math.ceil(total / pageSize)}
      setPageIndex={setPageIndex}
      setPageSize={() => {}}
      search={searchInput}
      setSearch={setSearchInput}
      isFetching={explorerQ.isFetching}
      isInitialLoading={isInitialLoading}
    />
  );
}
