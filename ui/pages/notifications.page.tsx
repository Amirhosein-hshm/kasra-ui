'use client';

import { useUserNotifications } from '@/lib/hooks';
import Spinner from '../common/spinner';

export default function NotificationsPage() {
  const { data, isPending } = useUserNotifications();
  const notifs = data?.map((notif) => (
    <div className="w-full h-10 p-2 rounded-lg flex justify-between items-center bg-amber-100">
      <span className="overflow-hidden wrap-normal line-clamp-1 text-ellipsis">
        {notif.title}
      </span>
      <strong className="shrink-0 pr-2">
        {new Date(notif.createdAt).toLocaleDateString()}
      </strong>
    </div>
  ));
  const content = notifs?.length ? notifs : 'اعلانی برای نمایش وجود ندارد';

  return (
    <div className="w-full min-h-10 max-h-full mt-4 p-2 bg-white rounded-lg shadow-md overflow-auto">
      {isPending ? <Spinner /> : content}
    </div>
  );
}
