'use client';

import { PATHS } from '@/lib/constants/PATHS';
import { useLogout } from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import FloatingDock from '@/ui/common/floating-dock';
import { IconHome, IconLogout2, IconUser } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardDock() {
  const router = useRouter();
  const pathname = usePathname();

  const queryClient = useQueryClient();

  const clearUser = useMeStore((s) => s.clearUser);

  const { mutateAsync } = useLogout();

  const logout = async () => {
    await mutateAsync();
    router.push('/auth/login');
    clearUser();
    queryClient.clear();
  };

  return (
    <FloatingDock
      desktopClassName="fixed -bottom-1 left-[50%] z-20 translate-x-[-50%] rounded-br-none rounded-bl-none"
      mobileClassName="fixed bottom-2 left-2"
      items={[
        {
          icon: <IconUser className={itemIconClassName} />,
          title: 'حساب کاربری',
          action: PATHS.profile.root,
          isActive: pathname.includes(PATHS.profile.root),
        },
        {
          icon: <IconHome className={itemIconClassName} />,
          title: 'داشبورد',
          action: PATHS.dashboard.root,
          isActive: pathname.includes(PATHS.dashboard.root),
        },
        {
          icon: <IconLogout2 className={itemIconClassName} />,
          title: 'خروج',
          action: () => logout(),
          isActive: false,
        },
      ]}
    />
  );
}

const itemIconClassName = clsx(
  'h-full w-full text-neutral-800 dark:text-neutral-300'
);
