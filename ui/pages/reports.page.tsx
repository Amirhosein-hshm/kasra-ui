import { ReportForTable } from '@/lib/types/models/Report';
import ReportsTable from '@/ui/features/tables/report';

export default function ReportsPage() {
  return <ReportsTable data={MOCK_REPORTS} />;
}

const MOCK_REPORTS: ReportForTable[] = [
  {
    id: 1,
    status: 1,
    percent: 0,
    project_id: 1,
  },
  {
    id: 2,
    status: 2,
    percent: 0,
    project_id: 2,
  },
  {
    id: 3,
    status: 3,
    percent: 0,
    project_id: 3,
  },
  {
    id: 4,
    status: 4,
    percent: 0,
    project_id: 4,
  },
  {
    id: 5,
    status: 5,
    percent: 0,
    project_id: 5,
  },
  {
    id: 6,
    status: 6,
    percent: 0,
    project_id: 6,
  },
  {
    id: 7,
    status: 7,
    percent: 0,
    project_id: 7,
  },
  {
    id: 8,
    status: 8,
    percent: 0,
    project_id: 8,
  },
  {
    id: 9,
    status: 9,
    percent: 0,
    project_id: 9,
  },
  {
    id: 10,
    status: 10,
    percent: 0,
    project_id: 10,
  },
  {
    id: 11,
    status: 11,
    percent: 0,
    project_id: 11,
  },
  {
    id: 12,
    status: 12,
    percent: 0,
    project_id: 12,
  },
];
