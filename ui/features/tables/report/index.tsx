import { ReportForTable } from '@/lib/types/models/Report';
import DataTable from '@/ui/components/data-table/index';
import { reportsTableColumns } from './columns';

interface Props {
  data: ReportForTable[];
}

export default function ReportsTable({ data }: Props) {
  return <DataTable columns={reportsTableColumns} data={data} />;
}
