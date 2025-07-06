'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useBrokerProposals, useSupervisorProposals } from '@/lib/hooks';
import { TableSkeleton } from '@/ui/components/loadings/table-loading';
import ProposalsTable from '@/ui/features/tables/proposals';
import { useMeStore } from '@/lib/stores/me.stores';

export default function ProposalsPage() {
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

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (pageIndex + 1).toString());
    if (info) {
      params.set('info', info);
    } else {
      params.delete('info');
    }
    router.replace(`?${params.toString()}`);
  }, [pageIndex, info]);

  const queryParams = useMemo(
    () => ({
      skip: pageIndex * pageSize,
      limit: pageSize,
      info: info || undefined,
    }),
    [pageIndex, pageSize, info]
  );

  const brokerQ = useBrokerProposals(queryParams, {
    enabled: userTypeId !== 4,
    queryKey: ['brokerProposals', queryParams],
  });
  const supervisorQ = useSupervisorProposals(queryParams, {
    enabled: userTypeId === 4,
    queryKey: ['supervisorProposals', queryParams],
  });
  const data = userTypeId === 4 ? supervisorQ.data : brokerQ.data;
  const isLoading =
    userTypeId === 4 ? supervisorQ.isLoading : brokerQ.isLoading;
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
    />
  );
}
