'use client';

import { useTablePagination } from '@/lib/hooks';
import { useAdminUsersInfo } from '@/lib/hooks/useAdmin';
import { useMeStore } from '@/lib/stores/me.stores';
import { UserType } from '@/lib/types/UserType.enum';
import UsersTable from '@/ui/features/tables/users';

export default function UsersPage() {
  const me = useMeStore();
  const userTypeId = me?.user?.userTypeId;
  const isResearcher = userTypeId === UserType.Researcher;

  const {
    info,
    pageCount,
    pageIndex,
    pageSize,
    queryParams,
    additionalQueries,
    setInfo,
    setPageIndex,
    setPageSize,
    setAdditionalQueries,
  } = useTablePagination({ initialQueries: { active: 'true' } });

  const adminUsersInfoQuery = useAdminUsersInfo(
    { ...queryParams, ...additionalQueries },
    {
      enabled: isResearcher,
    }
  );

  const data = adminUsersInfoQuery.data;

  const isLoading = adminUsersInfoQuery.isLoading;

  const isFetching = adminUsersInfoQuery.isFetching;

  return (
    <UsersTable
      data={data || []}
      pageIndex={pageIndex}
      pageSize={pageSize}
      pageCount={pageCount}
      setPageIndex={setPageIndex}
      setPageSize={setPageSize}
      search={info}
      setSearch={setInfo}
      isFetching={isFetching}
      isInitialLoading={isLoading}
      activeUserMode={additionalQueries['active']}
      setActiveUserMode={(active) =>
        setAdditionalQueries({ ...additionalQueries, active })
      }
    />
  );
}
