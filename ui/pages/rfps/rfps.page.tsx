import RFP, { RFPForTable } from '@/lib/types/models/RFP';
import RFPsTable from '@/ui/features/tables/rfps';

export default function RfpsPage() {
  return <RFPsTable data={MOCK_RPFS} />;
}
