'use client';

import {
  useUserProjects,
  useSupervisorProjects,
  useTablePagination,
} from '@/lib/hooks';
import { TableSkeleton } from '@/ui/components/loadings/table-loading';
import ProjectsTable from '@/ui/features/tables/projects';
import { useMeStore } from '@/lib/stores/me.stores';
import { UserType } from '@/lib/types/UserType.enum';

export default function ProjectsPage() {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);

  const { queryParams, pageIndex, pageSize, setPageIndex, info, setInfo } =
    useTablePagination();

  const userProjectsQuery = useUserProjects(queryParams, {
    enabled: userTypeId === UserType.User,
    queryKey: ['userProjects', queryParams],
  });
  const supervisorProjectsQuery = useSupervisorProjects(queryParams, {
    enabled: userTypeId === UserType.Supervisor,
    queryKey: ['supervisorProjects', queryParams],
  });
  const data =
    userTypeId === UserType.Supervisor
      ? supervisorProjectsQuery.data
      : userTypeId === UserType.User
      ? userProjectsQuery.data
      : [];

  const isLoading =
    userTypeId === UserType.Supervisor
      ? supervisorProjectsQuery.isLoading
      : userTypeId === UserType.User
      ? userProjectsQuery.isLoading
      : false;

  const isFetching =
    userTypeId === UserType.Supervisor
      ? supervisorProjectsQuery.isFetching
      : userTypeId === UserType.User
      ? userProjectsQuery.isFetching
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
      isFetching={isFetching}
    />
  );
}
