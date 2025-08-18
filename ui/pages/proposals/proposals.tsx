'use client';

import {
  useDataTableRequirements,
  useExplorerProposals,
  useResearcherProposals,
  useUserProposals,
} from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import { UserType } from '@/lib/types/UserType.enum';
import { useDebounced } from '@/lib/utils/hooks/useDebounce';
import ProposalsTable from '@/ui/features/tables/proposals';
import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useEffect, useMemo, useState } from 'react';

function ProposalsPageContent() {
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

  const userQ = useUserProposals(userTypeId!, queryParams);
  const explorerQ = useExplorerProposals(userTypeId!, queryParams);
  const researcherQ = useResearcherProposals(userTypeId!, queryParams);

  const isFetching =
    userTypeId === UserType.User
      ? userQ.isFetching
      : userTypeId === UserType.Explorer
      ? explorerQ.isFetching
      : researcherQ.isFetching;

  const isLoading =
    userTypeId === UserType.User
      ? userQ.isLoading
      : userTypeId === UserType.Explorer
      ? explorerQ.isLoading
      : researcherQ.isLoading;

  const data =
    userTypeId === UserType.User
      ? userQ.data
      : userTypeId === UserType.Explorer
      ? explorerQ.data
      : researcherQ.data;

  const total = 30;

  return (
    <ProposalsTable
      data={data || []}
      pageIndex={pageIndex}
      pageSize={pageSize}
      pageCount={Math.ceil(total / pageSize)}
      setPageIndex={setPageIndex}
      setPageSize={() => {}}
      search={searchInput}
      setSearch={setSearchInput}
      isFetching={isFetching}
      isInitialLoading={isLoading}
    />
  );
}

export default function ProposalsPage() {
  return <ProposalsPageContent />;
}
