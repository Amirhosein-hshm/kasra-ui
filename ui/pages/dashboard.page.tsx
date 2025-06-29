'use client';

import { PATHS } from '@/lib/constants/PATHS';
import { useMeStore } from '@/lib/stores/me.stores';
import FocusCards from '@/ui/common/fucos-cards';

export default function DashboardPage() {
  const user = useMeStore((state) => state.user);
  return (
    <div className="h-full flex justify-center lg:items-center">
      <FocusCards
        cards={[
          {
            title: 'پروژه ها',
            src: '/backgrounds/projects.jpg',
            action: PATHS.dashboard.projects.root,
          },
          {
            title: 'پروپوزال ها',
            src: '/backgrounds/proposals.jpg',
            action: PATHS.dashboard.proposals.root,
          },
          {
            title: 'گزارش کار ها',
            src: '/backgrounds/reports.jpg',
            action: PATHS.dashboard.reports.root,
          },
          {
            title: 'RFP ها',
            src: '/backgrounds/rfps.jpg',
            action: PATHS.dashboard.rfps.root,
          },
        ]}
      />
    </div>
  );
}
