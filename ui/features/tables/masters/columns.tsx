'use client';

import { MasterResponse } from '@/lib/types/';
import { Button } from '@/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/components/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';

const dropdownMenuItemClassname = 'cursor-pointer';

interface ColumnOptions {
  onEdit?: (allocate: MasterResponse) => void;
}

export function getMasterTableColumns(
  options?: ColumnOptions
): ColumnDef<MasterResponse>[] {
  return [
    {
      accessorKey: 'name',
      header: 'شناسه',
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
                onClick={() => options?.onEdit?.(user)}
                className={dropdownMenuItemClassname}
              >
                <Edit color="var(--color-blue-primary)" /> ویرایش
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
