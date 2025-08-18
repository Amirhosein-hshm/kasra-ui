'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Eye, Edit, CheckCheck, UserPlus } from 'lucide-react';
import { AllocateResponse } from '@/lib/types/';
import { Button } from '@/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/components/dropdown-menu';
import { toJalaliYMD } from '@/lib/utils/toJalali';
import { getFullName } from '@/lib/utils';

const dropdownMenuItemClassname = 'cursor-pointer';

interface ColumnOptions {
  onView?: (allocate: AllocateResponse) => void;
  onOpenAddProjectTitle?: (allocate: AllocateResponse) => void;
  onOpenConfrimeAllocate?: (allocate: AllocateResponse) => void;
  onOpenAddMasterToAllocate?: (allocate: AllocateResponse) => void;
}

export function getAllocateTableColumns(
  userTypeId: number,
  options?: ColumnOptions
): ColumnDef<AllocateResponse>[] {
  return [
    {
      accessorKey: 'rfp.info',
      header: 'عنوان rfp',
    },
    {
      accessorKey: 'rfp.rfpField.title',
      header: 'دسته بندی rfp',
    },
    {
      header: 'تاریخ ثبت',
      cell({ row }) {
        const allocate = row.original;
        return <span key={allocate.id}>{toJalaliYMD(allocate.createdAt)}</span>;
      },
    },
    {
      header: 'ثبت کننده',
      cell({ row }) {
        const allocate = row.original;
        return <span>{getFullName(allocate.rfp.creator)}</span>;
      },
    },

    {
      accessorKey: 'state',
      header: 'وضعیت',
    },

    {
      header: 'عملیات',
      id: 'actions',
      cell: ({ row }) => {
        const allocate = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">باز کردن فهرست</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">
                فعالیت ها
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => options?.onView?.(allocate)}
                className={dropdownMenuItemClassname}
              >
                <Eye /> مشاهده
              </DropdownMenuItem>

              {userTypeId === 3 && (
                <DropdownMenuItem
                  onClick={() => options?.onOpenAddProjectTitle?.(allocate)}
                  className={dropdownMenuItemClassname}
                >
                  <Edit /> ساخت موضوع پروژه
                </DropdownMenuItem>
              )}

              {userTypeId === 5 && (
                <DropdownMenuItem
                  onClick={() => options?.onOpenConfrimeAllocate?.(allocate)}
                  className={dropdownMenuItemClassname}
                >
                  <CheckCheck /> تایید موضوع
                </DropdownMenuItem>
              )}

              {userTypeId === 2 && (
                <DropdownMenuItem
                  onClick={() => options?.onOpenAddMasterToAllocate?.(allocate)}
                  className={dropdownMenuItemClassname}
                >
                  <UserPlus /> انتخاب استاد راهنما
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
