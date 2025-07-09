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
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="انتخاب همه"
          className="m-3"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="انتخاب"
          className="m-3"
        />
      ),
      enableSorting: false,
      enableHiding: false,
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
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            شناسه
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'info',
      header: 'اطلاعات پروژه',
    },
    {
      accessorKey: 'rfpField.title',
      header: 'دسته بندی',
    },
  ];
}
