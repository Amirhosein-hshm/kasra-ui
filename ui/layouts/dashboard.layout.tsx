import { PropsWithChildren } from 'react';
import DashboardDock from '@/ui/features/dashboard/dashboard-dock';
import { ModeToggle } from '@/ui/features/theme/mode-toggler';
import clsx from 'clsx';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        'w-screen h-screen flex justify-center items-center',
        "bg-[url('/backgrounds/light.jpg')] dark:bg-[url('/backgrounds/dark.jpg')]"
      )}
    >
      <div className="w-full h-full flex flex-col border-solid relative max-md:p-10 overflow-x-hidden overflow-y-auto">
        <ModeToggle className="fixed left-2 top-2" />
        {children}
        <DashboardDock />
      </div>
    </div>
  );
}
