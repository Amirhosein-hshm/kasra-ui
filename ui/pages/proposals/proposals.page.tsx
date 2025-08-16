'use client';

import {
  useExplorerProposals,
  useResearcherProposals,
  useUserProposals,
} from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import { UserType } from '@/lib/types/UserType.enum';
import { useDebounced } from '@/lib/utils/hooks/useDebounce';
import { TableSkeleton } from '@/ui/components/loadings/table-loading';
import ProposalsTable from '@/ui/features/tables/proposals';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';

function ProposalsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userTypeId = useMeStore((s) => s.user?.userTypeId);

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

  const infoDebounce = useDebounced(info, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (pageIndex + 1).toString());
    if (infoDebounce) {
      params.set('info', infoDebounce);
    } else {
      params.delete('info');
    }
    router.replace(`?${params.toString()}`);
  }, [pageIndex, infoDebounce]);

  const queryParams = useMemo(
    () => ({
      skip: pageIndex * pageSize,
      limit: pageSize,
      info: infoDebounce || undefined,
    }),
    [pageIndex, pageSize, infoDebounce]
  );

  const userQ = useUserProposals(queryParams, {
    enabled: userTypeId == UserType.User,
    queryKey: ['userProposals', queryParams],
  });
  const explorerQ = useExplorerProposals(queryParams, {
    enabled: userTypeId == UserType.Explorer,
    queryKey: ['explorerProposals', queryParams],
  });
  const researcherQ = useResearcherProposals(queryParams, {
    enabled: userTypeId == UserType.Researcher,
    queryKey: ['explorerProposals', queryParams],
  });

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

  if (isLoading || !data) return <TableSkeleton />;

  return (
    <ProposalsTable
      data={data || []}
      pageIndex={pageIndex}
      pageSize={pageSize}
      pageCount={Math.ceil(total / pageSize)}
      setPageIndex={setPageIndex}
      setPageSize={() => {}}
      search={info}
      setSearch={setInfo}
      isFetching={isFetching}
      isInitialLoading={isLoading}
    />
  );
}

export default function ProposalsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <ProposalsPageContent />
    </Suspense>
  );
}
