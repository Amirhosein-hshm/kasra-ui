'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  initialQueries?: Record<string, string>;
}

export function useTablePagination(props?: Props) {
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
  const [additionalQueries, setAdditionalQueries] = useState<
    Record<string, string>
  >(props?.initialQueries ?? {});

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (pageIndex + 1).toString());
    if (info) {
      params.set('info', info);
    } else {
      params.delete('info');
    }
    Object.entries(additionalQueries).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.replace(`?${params.toString()}`);
  }, [pageIndex, info, router, searchParams, additionalQueries]);

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
    additionalQueries,
    setAdditionalQueries,
  };
}
