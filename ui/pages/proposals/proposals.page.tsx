'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  useBrokerProposals,
  useSupervisorProposals,
  useUserProposals,
} from '@/lib/hooks';
import { TableSkeleton } from '@/ui/components/loadings/table-loading';
import ProposalsTable from '@/ui/features/tables/proposals';
import { useMeStore } from '@/lib/stores/me.stores';
import { useDebounce } from '@/lib/utils/hooks/useDebounce';
import { UserType } from '@/lib/types/UserType.enum';

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

  const infoDebounce = useDebounce(info, 500);

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

  const brokerQ = useBrokerProposals(queryParams, {
    enabled: userTypeId == UserType.Broker,
    queryKey: ['brokerProposals', queryParams],
  });

  const userQ = useUserProposals(queryParams, {
    enabled: userTypeId == UserType.User,
    queryKey: ['userProposals', queryParams],
  });

  const supervisorQ = useSupervisorProposals(queryParams, {
    enabled: userTypeId === UserType.Supervisor,
    queryKey: ['supervisorProposals', queryParams],
  });
  const data =
    userTypeId === UserType.Supervisor
      ? supervisorQ.data
      : userTypeId === UserType.Broker
      ? brokerQ.data
      : userQ.data;

  const isLoading =
    userTypeId === UserType.Supervisor
      ? supervisorQ.isLoading
      : brokerQ.isLoading;
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
