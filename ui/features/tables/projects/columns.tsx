'use client';

import Project from '@/lib/types/models/Project';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/ui/components/checkbox';

import { MoreHorizontal, Trash, Edit, Eye, ArrowUpDown } from 'lucide-react';

import { Button } from '@/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/components/dropdown-menu';

export const projectsTableColumns: ColumnDef<Project>[] = [
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
      const project = row.original;

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
              onClick={() =>
                navigator.clipboard.writeText(project.id.toString())
              }
              className={dropdownMenuItemClassname}
            >
              مشاهده <Eye color="var(--color-stone-primary)" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(project.id.toString())
              }
              className={dropdownMenuItemClassname}
            >
              حذف <Trash color="var(--color-red-primary)" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(project.id.toString())
              }
              className={dropdownMenuItemClassname}
            >
              ویرایش <Edit color="var(--color-blue-primary)" />
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
    accessorKey: 'user_supervisor_id',
    header: 'شناسه سرپرست',
  },
  {
    accessorKey: 'user_master_id',
    header: 'شناسه استاد راهنما',
  },
  {
    accessorKey: 'user_broker_id',
    header: 'شناسه کارگزار',
  },
  {
    accessorKey: 'user_user_id',
    header: 'شناسه مجری',
  },
];

const dropdownMenuItemClassname = 'justify-end cursor-pointer';
