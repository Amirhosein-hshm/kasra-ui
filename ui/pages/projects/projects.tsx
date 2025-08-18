'use client';

import {
  useUserProjects,
  useSupervisorProjects,
  useResearcherProjects,
  useDataTableRequirements,
} from '@/lib/hooks';
import ProjectsTable from '@/ui/features/tables/projects';
import { useMeStore } from '@/lib/stores/me.stores';
import { UserType } from '@/lib/types/UserType.enum';
import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
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

  const userTypeId = useMeStore((s) => s.user?.userTypeId);

  useEffect(() => {
    setPageIndex(0);
  }, [debouncedInfo]);
  const userProjectsQuery = useUserProjects(userTypeId!, queryParams);
  const supervisorProjectsQuery = useSupervisorProjects(
    userTypeId!,
    queryParams
  );
  const researcherProjectsQuery = useResearcherProjects(
    userTypeId!,
    queryParams
  );

  const data =
    userTypeId === UserType.Supervisor
      ? supervisorProjectsQuery.data
      : userTypeId === UserType.User
      ? userProjectsQuery.data
      : userTypeId === UserType.Researcher
      ? researcherProjectsQuery.data
      : [];

  const isInitialLoading =
    userTypeId === UserType.Supervisor
      ? supervisorProjectsQuery.isLoading
      : userTypeId === UserType.User
      ? userProjectsQuery.isLoading
      : userTypeId === UserType.Researcher
      ? researcherProjectsQuery.isLoading
      : false;

  const isFetching =
    userTypeId === UserType.Supervisor
      ? supervisorProjectsQuery.isFetching
      : userTypeId === UserType.User
      ? userProjectsQuery.isFetching
      : userTypeId === UserType.Researcher
      ? researcherProjectsQuery.isFetching
      : false;

  const total = 30;

  return (
    <ProjectsTable
      data={data || []}
      pageIndex={pageIndex}
      pageSize={pageSize}
      pageCount={Math.ceil(total / pageSize)}
      setPageIndex={setPageIndex}
      setPageSize={() => {}}
      search={searchInput}
      setSearch={setSearchInput}
      isFetching={isFetching}
      isInitialLoading={isInitialLoading}
    />
  );
}
