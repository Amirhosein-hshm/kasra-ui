'use client';

import { ProjectResponse } from '@/lib/types';
import { Checkbox } from '@/ui/components/checkbox';
import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown, CheckIcon, Eye, MoreHorizontal } from 'lucide-react';

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
import { UserType } from '@/lib/types/UserType.enum';

const dropdownMenuItemClassname = 'justify-end cursor-pointer';

interface ColumnOptions {
  onView?: (project: ProjectResponse) => void;
  onOpenProjectDetail?: (project: ProjectResponse) => void;
  onOpenApproveProject?: (project: ProjectResponse) => void;
}

export function getProjectsTableColumns(
  userRoleId: number,
  options?: ColumnOptions
): ColumnDef<ProjectResponse>[] {
  return [
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
        return <div className="hover:underline">{row.original.master}</div>;
      },
    },
    {
      id: 'actions',
      header: 'عملیات',
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
              {userRoleId === UserType.Researcher && (
                <DropdownMenuItem
                  className={dropdownMenuItemClassname}
                  onClick={() => options?.onOpenApproveProject?.(row.original)}
                >
                  تایید نهایی پروژه{' '}
                  <CheckIcon color="var(--color-green-primary)" />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
