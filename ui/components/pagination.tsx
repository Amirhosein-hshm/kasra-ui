import { Table } from '@tanstack/react-table';
import { Button } from '@/ui/components/button';

export default function Pagination({ table }: { table: Table<any> }) {
  return (
    <div className="flex items-center space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        صفحه قبلی
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        صفحه بعدی
      </Button>
    </div>
  );
}
