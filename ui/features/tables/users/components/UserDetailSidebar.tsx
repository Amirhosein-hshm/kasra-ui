import translator from '@/lib/helpers/translator';
import { UserInfoResponse } from '@/lib/types';
import { getFullName } from '@/lib/utils';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { UserDetailSkeleton } from './loading/UserDetailsLoading';

interface UserSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: UserInfoResponse | null;
}

export function UserDetailsSideBar({
  open,
  onOpenChange,
  selected,
}: UserSidebarProps) {
  return (
    <Sidebar
      open={open}
      onOpenChange={onOpenChange}
      showDefaultFooter={false}
      title={`جزئیات کاربر ${selected?.id ?? ''}`}
      description=""
    >
      {selected ? (
        <div className="space-y-3 text-sm text-gray-800 dark:text-gray-100">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">نام کاربری</span>
              <span className="text-right break-all">{selected.username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">نام و نام خانوادگی</span>
              <span className="text-right break-all">
                {getFullName(selected)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">نام پدر</span>
              <span className="text-right break-all">
                {selected.fatherName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">شماره تماس</span>
              <span className="text-right break-all">{selected.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">نقش</span>
              <span className="text-right break-all">
                {translator(String(selected.userTypeId!), 'roles')}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <UserDetailSkeleton />
      )}
    </Sidebar>
  );
}
