'use client';

import clsx from 'clsx';
import { useMeStore } from '@/lib/stores/me.stores';
import ProfileFormSkeleton from './profile-skeleton';

export default function ProfileForm() {
  const birthDate = useMeStore((s) => s.user?.birth);
  const address = useMeStore((s) => s.user?.address);
  const fullName = useMeStore((s) => `${s.user?.fname} ${s.user?.lname}`);
  const fatherName = useMeStore((s) => s.user?.fatherName);
  const phoneNumber = useMeStore((s) => s.user?.phone);
  const username = useMeStore((s) => s.user?.username);
  const userTypeId = useMeStore((s) => s.user?.userTypeId);
  const loading = useMeStore((s) => s.loading);

  const roles = {
    1: 'کارگزار کسری',
    2: 'کاشف',
    3: 'کاربر عادی',
    4: 'ناظر',
    5: 'امور محققین',
  };

  return loading ? (
    <ProfileFormSkeleton />
  ) : (
    <div className={clsx('flex flex-col gap-4 items-center ', 'w-full h-full')}>
      <div className="w-[50%] border-white border-[1px] rounded p-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center lg:gap-2">
          <div>
            <span>نام و نام خانوادگی: </span>
            <span>{fullName}</span>
          </div>
          <div>
            <span>تاریخ تولد: </span>
            <span>{birthDate}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center lg:gap-2">
          <div>
            <span>آدرس: </span>
            <span>{address}</span>
          </div>
          <div>
            <span>نام پدر: </span>
            <span>{fatherName}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center lg:gap-2">
          <div>
            <span>شماره موبایل: </span>
            <span>{phoneNumber}</span>
          </div>
          <div>
            <span>نام کاربری: </span>
            <span>{username}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center lg:gap-2">
          <div>
            <span>نقش: </span>
            <span>{roles[userTypeId!]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
