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
import { TableSkeleton } from '../loadings/table-loading';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  headerAppendix?: ReactNode;
  isFetching: boolean;
  loading?: boolean;
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
  loading,
  isFetching,
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

  if (loading && (!data || data.length === 0)) {
    return <TableSkeleton className="my-4" rowCount={3} />;
  }

  return (
    <>
      <div className="flex justify-between py-4 max-lg:flex-col max-lg:gap-2">
        {setSearch && (
          <div className="w-full flex gap-2 items-center">
            <Input
              placeholder="جستجو در نام‌ها..."
              value={search ?? ''}
              onChange={(event) => setSearch?.(event.target.value)}
              className="max-w-sm"
            />
            {isFetching && (
              <span className="animate-spin size-4 rounded-full border-2 border-current border-t-transparent" />
            )}
          </div>
        )}
        {headerAppendix}
      </div>

      <div
        className={clsx(
          'relative rounded-md border backdrop-blur-lg',
          styles.table
        )}
        dir="rtl"
      >
        {isFetching && (
          <div className="absolute inset-0 pointer-events-none bg-background/30 backdrop-blur-[1px]" />
        )}
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
