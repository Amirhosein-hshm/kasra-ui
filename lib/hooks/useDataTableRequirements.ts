'use client';

import { useDebounced } from '@/lib/utils/hooks/useDebounce';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export function useDataTableRequirements() {
  const searchParams = useSearchParams();
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

  const queryParams = useMemo(
    () => ({
      skip: pageIndex * pageSize,
      limit: pageSize,
      info: debouncedInfo || undefined,
    }),
    [pageIndex, pageSize, debouncedInfo]
  );

  return {
    searchParams,
    queryParams,
    pageSize,
    pageIndex,
    searchInput,
    debouncedInfo,
    setPageIndex,
    setSearchInput,
    pageFromUrl,
    infoFromUrl,
  };
}
