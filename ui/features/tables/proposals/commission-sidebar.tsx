import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { ProposalResponse } from 'lib/types/proposalResponse';

interface ProposalSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: ProposalResponse | null;
}

export function CommissionSideBar({
  open,
  onOpenChange,
  selected,
}: ProposalSidebarProps) {
  return (
    <Sidebar
      open={open}
      onOpenChange={onOpenChange}
      title={`کومیسیون ${selected?.id ?? ''}`}
      description=""
    >
      {selected ? (
        <pre className="text-sm whitespace-pre-wrap">
          {JSON.stringify(selected, null, 2)}
        </pre>
      ) : (
        <p>هیچ انتخابی ندارید.</p>
      )}
    </Sidebar>
  );
}
