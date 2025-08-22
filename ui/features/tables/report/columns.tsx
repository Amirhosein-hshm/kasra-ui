'use client';

import { ColumnDef, Table } from '@tanstack/react-table';
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
import ColumnOptions from '@/lib/ui-types/ColumnOptions.interface';
import ReportForTable from '@/lib/ui-types/ReportForTable.interface';

const dropdownMenuItemClassname = 'justify-end cursor-pointer';

export function getReportsTableColumns(
  options?: ColumnOptions<ReportForTable>
): ColumnDef<ReportForTable>[] {
  const selectionColumn: ColumnDef<ReportForTable> = {
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
  };

  const columns = [
    {
      accessorKey: 'state',
      header: 'وضعیت',
    },
    {
      accessorKey: 'acceptedPercent',
      header: 'درصد تایید شده ناظر',
    },
    {
      accessorKey: 'anouncedPercent',
      header: 'درصد اعلامی مجری',
    },
    {
      accessorKey: 'project',
      header: 'پروژه',
    },
    {
      id: 'actions',
      header: 'عملیات',
      cell: ({ row }) => {
        const report = row.original;
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
                onClick={() => options?.onView?.(report)}
                className={dropdownMenuItemClassname}
              >
                مشاهده <Eye color="var(--color-stone-primary)" />
              </DropdownMenuItem>
              {options?.onOpenReportDetail && (
                <DropdownMenuItem
                  onClick={() => options.onOpenReportDetail?.(report)}
                  className={dropdownMenuItemClassname}
                >
                  جزئیات
                </DropdownMenuItem>
              )}
              {options?.onDelete && (
                <DropdownMenuItem
                  onClick={() => options?.onDelete?.(report)}
                  className={dropdownMenuItemClassname}
                >
                  حذف <Trash color="var(--color-red-primary)" />
                </DropdownMenuItem>
              )}
              {options?.onEdit && (
                <DropdownMenuItem
                  onClick={() => options?.onEdit?.(report)}
                  className={dropdownMenuItemClassname}
                >
                  ویرایش <Edit color="var(--color-blue-primary)" />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (!options?.deactivateSelection) columns.unshift(selectionColumn as any);

  return columns;
}
