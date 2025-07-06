'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useUserProjects, useSupervisorProjects } from '@/lib/hooks';
import { TableSkeleton } from '@/ui/components/loadings/table-loading';
import ProjectsTable from '@/ui/features/tables/projects';
import { useMeStore } from '@/lib/stores/me.stores';

export default function ProjectsPage() {
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

  const userQ = useUserProjects(queryParams, {
    enabled: userTypeId === 3,
    queryKey: ['userProjects', queryParams],
  });
  const supervisorQ = useSupervisorProjects(queryParams, {
    enabled: userTypeId === 4,
    queryKey: ['supervisorProjects', queryParams],
  });
  const data =
    userTypeId === 4 ? supervisorQ.data : userTypeId === 3 ? userQ.data : [];

  const isLoading =
    userTypeId === 4
      ? supervisorQ.isLoading
      : userTypeId === 3
      ? userQ.isLoading
      : false;

  const total = 30;

  if (isLoading || !data) return <TableSkeleton />;

  return (
    <ProjectsTable
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
