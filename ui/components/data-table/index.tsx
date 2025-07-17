'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  PaginationState,
} from '@tanstack/react-table';

import { Input } from '@/ui/components/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/components/dropdown-menu';

import Pagination from '@/ui/components/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/components/table';
import { ReactNode, useState } from 'react';
import { Button } from '@/ui/components/button';

import styles from './data-table-styles.module.css';
import clsx from 'clsx';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  headerAppendix?: ReactNode;

  externalPagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
  };

  search?: string;
  setSearch?: (val: string) => void;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  headerAppendix,
  externalPagination,
  search,
  setSearch,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 10,
    }
  );

  const paginationState = externalPagination
    ? {
        pageIndex: externalPagination.pageIndex,
        pageSize: externalPagination.pageSize,
      }
    : internalPagination;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: paginationState,
    },
    pageCount: externalPagination?.pageCount,
    manualPagination: !!externalPagination,
    onPaginationChange: externalPagination
      ? (updater) => {
          const next =
            typeof updater === 'function' ? updater(paginationState) : updater;
          externalPagination.setPageIndex(next.pageIndex);
          externalPagination.setPageSize(next.pageSize);
        }
      : setInternalPagination,

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <>
      <div className="flex justify-between py-4 max-lg:flex-col max-lg:gap-2">
        {search && setSearch && (
          <div className="w-full flex gap-2">
            <Input
              placeholder="جستجو در نام‌ها..."
              value={search ?? ''}
              onChange={(event) => setSearch?.(event.target.value)}
              className="max-w-sm"
            />

            {headerAppendix}
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">ستون‌های قابل مشاهده</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className={clsx('rounded-md border backdrop-blur-lg', styles.table)}
        dir="rtl"
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-right bg-dark/5 dark:bg-white/5"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  نتیجه‌ای یافت نشد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {externalPagination && <Pagination table={table} />}
    </>
  );
}
