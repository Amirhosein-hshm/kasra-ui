'use client';

import { Checkbox } from '@/ui/components/checkbox';
import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';

import { RFPResponse } from '@/lib/types/';
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

const dropdownMenuItemClassname = 'justify-end cursor-pointer';

interface ColumnOptions {
  onView?: (rfp: RFPResponse) => void;
  onOpenRfpEdit?: (rfp: RFPResponse) => void;
}

export function getRfpsTableColumns(
  options?: ColumnOptions
): ColumnDef<RFPResponse>[] {
  return [
    {
      accessorKey: 'info',
      header: 'اطلاعات پروژه',
    },
    {
      accessorKey: 'rfpField.title',
      header: 'دسته بندی',
    },
    {
      header: 'تاریخ ثبت',
      cell({ row }) {
        const rfp = row.original;
        return <span key={rfp.id}>{toJalaliYMD(rfp.createdAt)}</span>;
      },
    },

    {
      header: 'ثبت کننده',
      accessorKey: 'creatorId',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const rfp = row.original;
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
                onClick={() => options?.onOpenRfpEdit?.(rfp)}
                className={dropdownMenuItemClassname}
              >
                مشاهده و ویرایش <Edit color="var(--color-blue-primary)" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
