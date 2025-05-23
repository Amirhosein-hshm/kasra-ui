'use client';

import { PATHS } from '@/lib/constants/PATHS';
import { useAuthStore } from '@/lib/stores/auth-store';
import FloatingDock from '@/ui/common/floating-dock';
import { IconHome, IconLogout2, IconUser } from '@tabler/icons-react';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardDock() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <FloatingDock
      desktopClassName="fixed -bottom-1 left-[50%] translate-x-[-50%] rounded-br-none rounded-bl-none !bg-transparent"
      mobileClassName="fixed bottom-2 left-2"
      items={[
        {
          icon: <IconUser className={itemIconClassName} />,
          title: 'حساب کاربری',
          action: PATHS.general.profile,
          isActive: pathname.includes(PATHS.general.profile),
        },
        {
          icon: <IconHome className={itemIconClassName} />,
          title: 'داشبورد',
          action: PATHS.general.dashboard,
          isActive: pathname.includes(PATHS.general.dashboard),
        },
        {
          icon: <IconLogout2 className={itemIconClassName} />,
          title: 'خروج',
          action: () => logout(() => router.replace(PATHS.auth.login)),
          isActive: false,
        },
      ]}
    />
  );
}

const itemIconClassName = clsx(
  'h-full w-full text-neutral-500 dark:text-neutral-300'
);
