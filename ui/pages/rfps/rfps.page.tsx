import RFP, { RFPForTable } from '@/lib/types/models/RFP';
import RFPsTable from '@/ui/features/tables/rfps';

export default function RfpsPage() {
  return <RFPsTable data={MOCK_RPFS} />;
}

const MOCK_RPFS: RFPForTable[] = [
  {
    id: 1,
    info: 'RFP 1',
  },
  {
    id: 2,
    info: 'RFP 2',
  },
  {
    id: 3,
    info: 'RFP 3',
  },
  {
    id: 4,
    info: 'RFP 4',
  },
  {
    id: 5,
    info: 'RFP 5',
  },
  {
    id: 6,
    info: 'RFP 6',
  },
  {
    id: 7,
    info: 'RFP 7',
  },
  {
    id: 8,
    info: 'RFP 8',
  },
  {
    id: 9,
    info: 'RFP 9',
  },
  {
    id: 10,
    info: 'RFP 10',
  },
  {
    id: 11,
    info: 'RFP 11',
  },
];
