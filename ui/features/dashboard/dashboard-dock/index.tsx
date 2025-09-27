'use client';

import { PATHS } from '@/lib/constants/PATHS';
import { useLogout, useUserMe } from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import FloatingDock from '@/ui/common/floating-dock';
import { Badge } from '@/ui/components/badge';
import { IconHome, IconLogout2, IconUser } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { Bell, BellIcon } from 'lucide-react';
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

  const me = useUserMe();
  const notificationCount = (me?.data as any)?.notificationCount;
  if (notificationCount > 0) {
  }

  return (
    <FloatingDock
      desktopClassName="fixed -bottom-1 left-[50%] z-20 translate-x-[-50%] rounded-br-none rounded-bl-none"
      mobileClassName="fixed bottom-2 left-2"
      items={[
        {
          // FIXME: hover bell icon size
          icon: (
            <div className="relative h-5 w-5">
              <Bell className="w-full h-full" />

              {notificationCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-4 -right-4 px-1 min-w-[1.2rem] h-5 flex items-center justify-center text-[10px]"
                >
                  {notificationCount > 9 ? '۹+' : notificationCount}
                </Badge>
              )}
            </div>
          ),
          title: 'اعلان ها',
          action: PATHS.profile.notifications,
          isActive: pathname.includes(PATHS.profile.notifications),
        },
        {
          icon: <IconUser className={itemIconClassName} />,
          title: 'حساب کاربری',
          action: PATHS.profile.root,
          isActive: pathname === PATHS.profile.root,
        },
        {
          icon: <IconHome className={itemIconClassName} />,
          title: 'داشبورد',
          action: PATHS.dashboard.root,
          isActive: pathname.includes(PATHS.dashboard.root),
          permissions: [1, 2, 3, 4, 5, 6],
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
