import { PATHS } from '@/lib/constants/PATHS';
import FocusCards from '@/ui/common/fucos-cards';

export default function DashboardPage() {
  return (
    <div className="h-full flex justify-center lg:items-center">
      <FocusCards
        cards={[
          {
            title: 'پروژه ها',
            src: '/backgrounds/projects.jpg',
            action: PATHS.general.dashboard.projects.root,
          },
          {
            title: 'پروپوزال ها',
            src: '/backgrounds/proposals.jpg',
            action: PATHS.general.proposals.root,
          },
          {
            title: 'گزارش کار ها',
            src: '/backgrounds/reports.jpg',
            action: PATHS.general.reports.root,
          },
        ]}
      />
    </div>
  );
}
