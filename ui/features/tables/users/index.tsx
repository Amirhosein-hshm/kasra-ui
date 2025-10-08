'use client';

import { UserInfoResponse } from '@/lib/types';
import { Button } from '@/ui/components/button';
import DataTable from '@/ui/components/data-table/index';
import { RadioGroup, RadioInput } from '@/ui/components/radio-group';
import { useState } from 'react';
import DeleteUserModal from '../../modals/delete-user.modal';
import { getUserTableColumns } from './columns';
import { AddUserSidebar } from './components/AddUserSidebar';
import { ChangePasswordSidebar } from './components/ChangePasswordSidebar';
import { EditUserSidebar } from './components/UpdateUserSidebar';
import { UserDetailsSideBar } from './components/UserDetailSidebar';

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
  activeUserMode: string;
  setActiveUserMode: (mode: string) => void;
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
  activeUserMode,
  setActiveUserMode,
}: Props) {
  const [selected, setSelected] = useState<UserInfoResponse | null>(null);

  const [isOpenUserDetails, setIsOpenUserDetails] = useState(false);
  const [isOpenEditUserSidebar, setIsOpenEditUserSidebar] = useState(false);
  const [isOpenAddUserSidebar, setIsOpenAddUserSidebar] = useState(false);
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState(false);
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
    useState(false);

  const usersTableColumns = getUserTableColumns({
    onView: (user) => {
      setSelected(user);
      setIsOpenUserDetails(true);
    },
    onEdit(user) {
      setSelected(user);
      setIsOpenEditUserSidebar(true);
    },
    onDelete(user) {
      setSelected(user);
      setIsOpenDeleteUserModal(true);
    },
    onChangePassword(user) {
      setSelected(user);
      setIsOpenChangePasswordModal(true);
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
          <UsersTableHeaderAppendix
            onClickAddButton={() => {
              setSelected(null);
              setIsOpenAddUserSidebar(true);
            }}
            userActiveMode={activeUserMode}
            setActiveUserMode={setActiveUserMode}
          />
        }
      />

      <UserDetailsSideBar
        open={isOpenUserDetails}
        onOpenChange={(state) => setIsOpenUserDetails(state)}
        selected={selected}
      />

      <AddUserSidebar
        open={isOpenAddUserSidebar}
        onOpenChange={(state) => setIsOpenAddUserSidebar(state)}
      />

      <EditUserSidebar
        open={isOpenEditUserSidebar}
        onOpenChange={(state) => setIsOpenEditUserSidebar(state)}
        userToUpdate={selected ?? undefined}
      />

      <ChangePasswordSidebar
        open={isOpenChangePasswordModal}
        onOpenChange={(state) => setIsOpenChangePasswordModal(state)}
        userToUpdate={selected ?? undefined}
      />

      <DeleteUserModal
        userToDelete={selected ?? undefined}
        open={isOpenDeleteUserModal}
        onOpenChange={(state) => setIsOpenDeleteUserModal(state)}
      />
    </>
  );
}

function UsersTableHeaderAppendix({
  onClickAddButton,
  userActiveMode,
  setActiveUserMode,
}: {
  onClickAddButton: () => void;
  userActiveMode: string;
  setActiveUserMode: (mode: string) => void;
}) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-1">
        <strong>وضعیت کاربر: </strong>
        <RadioGroup
          defaultValue="active"
          value={userActiveMode}
          onValueChange={setActiveUserMode}
          className="flex"
        >
          <RadioInput id="active" value="true" label="فعال" />
          <RadioInput id="inactive" value="false" label="غیرفعال" />
        </RadioGroup>
      </div>

      <Button className="ml-2" onClick={onClickAddButton}>
        افزودن کاربر
      </Button>
    </div>
  );
}
