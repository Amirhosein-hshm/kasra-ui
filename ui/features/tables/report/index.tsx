import DataTable from '@/ui/components/data-table/index';
import { reportsTableColumns } from './columns';
import Project from '@/lib/types/models/Project';
import { ReportForTable } from '@/lib/types/models/Report';

interface Props {
  data: ReportForTable[];
}

export default function ProjectsTable({ data }: Props) {
  return <DataTable columns={reportsTableColumns} data={data} />;
}
