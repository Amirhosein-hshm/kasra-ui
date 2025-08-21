'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export function useTablePagination() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageFromUrl = useMemo(() => {
    const raw = searchParams.get('page');
    const page = raw ? parseInt(raw, 10) : 1;
    return isNaN(page) || page < 1 ? 1 : page;
  }, [searchParams]);

  const infoFromUrl = useMemo(() => {
    return searchParams.get('info') || '';
  }, [searchParams]);

  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(pageFromUrl - 1);
  const [info, setInfo] = useState(infoFromUrl);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (pageIndex + 1).toString());
    if (info) {
      params.set('info', info);
    } else {
      params.delete('info');
    }
    router.replace(`?${params.toString()}`);
  }, [pageIndex, info, router, searchParams]);

  const queryParams = useMemo(
    () => ({
      skip: pageIndex * pageSize,
      limit: pageSize,
      info: info || undefined,
    }),
    [pageIndex, pageSize, info]
  );

  const total = 30;
  const pageCount = Math.ceil(total / pageSize);

  const setPageSize = () => {};

  return {
    searchParams,
    router,
    pageIndex,
    setPageIndex,
    setPageSize,
    info,
    setInfo,
    queryParams,
    pageSize,
    pageCount,
    total,
  };
}
