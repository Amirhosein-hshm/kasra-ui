'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Eye } from 'lucide-react';
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
}

export function getAllocateTableColumns(
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
        return <span>{getFullName(allocate.creator)}</span>;
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
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
