import DataTable from '@/ui/components/data-table';
import { projectsTableColumns } from './columns';
import Project from '@/lib/types/models/Project';

interface Props {
  data: Project[];
}

export default function ProjectsTable({ data }: Props) {
  return <DataTable columns={projectsTableColumns} data={data} />;
}
