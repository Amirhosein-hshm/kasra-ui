'use client';

import translator from '@/lib/helpers/translator';
import { UserInfoResponse } from '@/lib/types/';
import { Button } from '@/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/components/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, MoreHorizontal } from 'lucide-react';

const dropdownMenuItemClassname = 'cursor-pointer';

interface ColumnOptions {
  onViewAndEdit?: (allocate: UserInfoResponse) => void;
  onDelete?: (allocate: UserInfoResponse) => void;
}

export function getUserTableColumns(
  options?: ColumnOptions
): ColumnDef<UserInfoResponse>[] {
  return [
    {
      accessorKey: 'username',
      header: 'نام کاربری',
    },
    {
      header: 'نقش',
      cell({ row }) {
        const user = row.original;
        return translator(String(user.userTypeId), 'roles');
      },
    },
    {
      header: 'نام',
      cell({ row }) {
        const user = row.original;
        return <span key={user.id}>{user.fname + ' ' + user.lname}</span>;
      },
    },
    {
      header: 'شماره تماس',
      accessorKey: 'phone',
    },
    {
      header: 'عملیات',
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">باز کردن فهرست</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => options?.onViewAndEdit?.(user)}
                className={dropdownMenuItemClassname}
              >
                <Eye /> مشاهده
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
