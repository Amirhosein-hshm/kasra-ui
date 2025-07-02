'use client';
import { useSupervisorProjects } from '@/lib/hooks';
import { TableSkeleton } from '@/ui/components/loadings/table-loading';
import ProjectsTable from '@/ui/features/tables/projects';

export default function ProjectsPage() {
  const { data, isLoading } = useSupervisorProjects();

  if (isLoading || !data) {
    return <TableSkeleton />;
  }
  return data && <ProjectsTable data={data} />;
}
