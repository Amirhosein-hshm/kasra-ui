'use client';

import { ProjectResponse } from '@/lib/types';
import { Checkbox } from '@/ui/components/checkbox';
import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown, Eye, MoreHorizontal } from 'lucide-react';

import { PATHS } from '@/lib/constants/PATHS';
import { Button } from '@/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/components/dropdown-menu';
import Link from 'next/link';

const dropdownMenuItemClassname = 'justify-end cursor-pointer';

interface ColumnOptions {
  onView?: (project: ProjectResponse) => void;
  onOpenProjectDetail?: (project: ProjectResponse) => void;
}

export function getProjectsTableColumns(
  options?: ColumnOptions
): ColumnDef<ProjectResponse>[] {
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
              <Link href={PATHS.dashboard.projects.single(project.id)}>
                <DropdownMenuItem className={dropdownMenuItemClassname}>
                  مشاهده <Eye color="var(--color-stone-primary)" />
                </DropdownMenuItem>
              </Link>
              {options?.onView && (
                <DropdownMenuItem
                  onClick={() => options.onView?.(project)}
                  className={dropdownMenuItemClassname}
                >
                  جزئیات
                </DropdownMenuItem>
              )}
              {options?.onOpenProjectDetail && (
                <DropdownMenuItem
                  onClick={() => options.onOpenProjectDetail?.(project)}
                  className={dropdownMenuItemClassname}
                >
                  اطلاعات بیشتر
                </DropdownMenuItem>
              )}
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
      accessorKey: 'title',
      header: 'اطلاعات پروژه',
    },
    {
      accessorKey: 'proposal.info',
      header: 'پروپوزال',
    },
    {
      header: 'سرپرست',
      cell: ({ row }) => {
        return (
          <div className="hover:underline">
            {row.original.supervisor.fname +
              ' ' +
              row.original.supervisor.lname}
          </div>
        );
      },
    },
    {
      header: 'استاد راهنما',
      cell: ({ row }) => {
        return (
          <div className="hover:underline">
            {row.original.master.fname + ' ' + row.original.master.lname}
          </div>
        );
      },
    },
    {
      header: 'کاشف',
      cell: ({ row }) => {
        return (
          <div className="hover:underline">
            {row.original.discoverer.fname +
              ' ' +
              row.original.discoverer.lname}
          </div>
        );
      },
    },
    {
      header: 'کارگزار',
      cell: ({ row }) => {
        return (
          <div className="hover:underline">
            {row.original.broker.fname + ' ' + row.original.broker.lname}
          </div>
        );
      },
    },
  ];
}
