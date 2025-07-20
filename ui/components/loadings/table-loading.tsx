'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/components/table';
import { Skeleton } from '@/ui/components/skeleton';
import clsx from 'clsx';

interface Props {
  className?: string;
  rowCount?: number;
  columnCount?: number;
}

export function TableSkeleton({
  className,
  columnCount = 6,
  rowCount = 12,
}: Props) {
  return (
    <div className={clsx('rounded-md border backdrop-blur-lg p-2', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: columnCount }).map((_, rowIdx) => (
            <TableRow key={rowIdx}>
              {Array.from({ length: rowCount }).map((_, colIdx) => (
                <TableCell key={colIdx}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
