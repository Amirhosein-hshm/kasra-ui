'use client';

import { PATHS } from '@/lib/constants/PATHS';
import { useMeStore } from '@/lib/stores/me.stores';
import FocusCards from '@/ui/common/fucos-cards';

export default function DashboardPage() {
  const userTypeId = useMeStore((state) => state.user?.userTypeId);

  const cards = [
    {
      title: 'پروژه ها',
      src: '/backgrounds/projects.jpg',
      action: PATHS.dashboard.projects.root,
      permissions: [5, 4, 3],
    },
    {
      title: 'پروپوزال ها',
      src: '/backgrounds/proposals.jpg',
      action: PATHS.dashboard.proposals.root,
      permissions: [3, 4],
    },
    {
      title: 'گزارش کار ها',
      src: '/backgrounds/reports.jpg',
      action: PATHS.dashboard.reports.root,
      permissions: [5],
    },
    {
      title: 'RFP ها',
      src: '/backgrounds/rfps.jpg',
      action: PATHS.dashboard.rfps.root,
      permissions: [],
    },
  ];
  const allowedCards = cards.filter((item) =>
    item.permissions.includes(userTypeId || 0)
  );

  return (
    <div className="h-full flex justify-center lg:items-center">
      <FocusCards cards={allowedCards} />
    </div>
  );
}
