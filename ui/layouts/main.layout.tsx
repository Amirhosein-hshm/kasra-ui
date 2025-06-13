import DashboardDock from '@/ui/features/dashboard/dashboard-dock';
import { ModeToggle } from '@/ui/features/theme/mode-toggler';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import Breadcrumbs from '@/ui/features/accessibility/breadcrumbs';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        'w-screen h-screen p-14 max-lg:p-8',
        'flex flex-col justify-center items-center',
        "bg-[url('/backgrounds/light.jpg')] dark:bg-[url('/backgrounds/dark.jpg')]",
        'bg-no-repeat bg-center bg-cover',
        'overflow-x-hidden overflow-y-auto'
      )}
    >
      <div className={clsx('DashboardMain', 'w-full h-full pb-14')}>
        <Breadcrumbs />

        {children}
      </div>
      <DashboardDock />
    </div>
  );
}
