'use client';

import clsx from 'clsx';
import { useMeStore } from '@/lib/stores/me.stores';
import ProfileFormSkeleton from './profile-skeleton';
import translator from '@/lib/helpers/translator';

export default function ProfileForm() {
  const birthDate = useMeStore((s) => s.user?.birth);
  const address = useMeStore((s) => s.user?.address);
  const fullName = useMeStore((s) => `${s.user?.fname} ${s.user?.lname}`);
  const fatherName = useMeStore((s) => s.user?.fatherName);
  const phoneNumber = useMeStore((s) => s.user?.phone);
  const username = useMeStore((s) => s.user?.username);
  const userTypeId = useMeStore((s) => s.user?.userTypeId);
  const loading = useMeStore((s) => s.loading);

  return loading ? (
    <ProfileFormSkeleton />
  ) : (
    <div className={clsx('pt-4 flex flex-col gap-4', 'w-full h-full')}>
      <div className="w-full max-w-[400px] border-white border-[1px] rounded p-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="bg-card px-2 py-1 rounded-sm">
            <span>نام و نام خانوادگی: </span>
            <span>{fullName}</span>
          </div>
          <div>
            <span>نام پدر: </span>
            <span>{fatherName}</span>
          </div>
          <div className="bg-card px-2 py-1 rounded-sm">
            <span>نقش: </span>
            <span>{translator(String(userTypeId!), 'roles')}</span>
          </div>
          <div>
            <span>آدرس: </span>
            <span>{address}</span>
          </div>
          <div className="bg-card px-2 py-1 rounded-sm">
            <span>تاریخ تولد: </span>
            <span>{birthDate}</span>
          </div>
        </div>
        <div>
          <span>شماره موبایل: </span>
          <span>{phoneNumber}</span>
        </div>
        <div className="bg-card px-2 py-1 rounded-sm">
          <span>نام کاربری: </span>
          <span>{username}</span>
        </div>
      </div>
    </div>
  );
}
