import { ReportForTable } from '@/lib/types/models/Report';
import DataTable from '@/ui/components/data-table/index';
import { reportsTableColumns } from './columns';
import { ReactNode } from 'react';

interface Props {
  data: ReportForTable[];
  headerAppendix?: ReactNode;
}

export default function ReportsTable({ data, headerAppendix }: Props) {
  return (
    <DataTable
      columns={reportsTableColumns}
      data={data}
      headerAppendix={headerAppendix}
    />
  );
}
