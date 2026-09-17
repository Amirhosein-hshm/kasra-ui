import Breadcrumbs from '@/ui/features/accessibility/breadcrumbs';
import DashboardDock from '@/ui/features/dashboard/dashboard-dock';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { AuroraBackground } from '../components/aurora-background';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <AuroraBackground contentClassName="flex items-center justify-center p-14 max-lg:p-8">
      <div
        className={clsx(
          'w-full h-full',
          'flex flex-col justify-center items-center',
          'bg-no-repeat bg-center bg-cover',
          'overflow-x-hidden overflow-y-auto'
        )}
      >
        <div
          className={clsx('DashboardMain', 'w-full h-full pb-14 select-text')}
        >
          <Breadcrumbs />

          {children}
        </div>
        <DashboardDock />
      </div>
    </AuroraBackground>
  );
}
