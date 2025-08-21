'use client';

import { UserInfoResponse } from '@/lib/types';
import DataTable from '@/ui/components/data-table/index';
import { useState } from 'react';
import { getUserTableColumns } from './columns';
import { UserDetailsSideBar } from './components/UserDetailSidebar';
import { Button } from '@/ui/components/button';
import { AddUserSidebar } from './components/AddUserSidebar';

interface Props {
  data: UserInfoResponse[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  search: string;
  setSearch: (v: string) => void;
  isFetching: boolean;
  isInitialLoading: boolean;
}

export default function UsersTable({
  data,
  pageIndex,
  pageSize,
  pageCount,
  setPageIndex,
  setPageSize,
  search,
  setSearch,
  isFetching,
  isInitialLoading,
}: Props) {
  const [selected, setSelected] = useState<UserInfoResponse | null>(null);

  const [isOpenUserDetails, setIsOpenUserDetails] = useState(false);
  const [isOpenAddUser, setIsOpenAddUser] = useState(false);

  const usersTableColumns = getUserTableColumns({
    onViewAndEdit: (item) => {
      setSelected(item);
      setIsOpenUserDetails(true);
    },
  });

  return (
    <>
      <DataTable
        columns={usersTableColumns}
        data={data}
        externalPagination={{
          pageIndex,
          pageSize,
          pageCount,
          setPageIndex,
          setPageSize,
        }}
        search={search}
        setSearch={setSearch}
        isFetching={isFetching}
        loading={isInitialLoading}
        headerAppendix={
          <Button className="ml-2" onClick={() => setIsOpenAddUser(true)}>
            افزودن کاربر
          </Button>
        }
      />

      <UserDetailsSideBar
        open={isOpenUserDetails}
        onOpenChange={(state) => setIsOpenUserDetails(state)}
        selected={selected}
      />

      <AddUserSidebar
        open={isOpenAddUser}
        onOpenChange={(state) => setIsOpenAddUser(state)}
      />
    </>
  );
}
