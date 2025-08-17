'use client';

import { Card, CardContent, CardHeader } from '@/ui/components/card';
import AuthForms from '@/ui/features/auth/auth-forms';
import clsx from 'clsx';

export default function LoginPage() {
  return (
    <div>
      <div
        className={clsx(
          'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
          'backdrop-blur-[60px]',
          'rounded-2xl'
        )}
      >
        <Card
          className={clsx(
            'w-full h-full',
            'lg:w-[320px] lg:h-[320px]',
            'bg-white/25'
          )}
        >
          <CardHeader className="relative">
            <h1 className="text-2xl font-bold font-[vazir-bold] text-center">
              سامانه کسری
            </h1>

            <GlowingDivider />
          </CardHeader>

          <CardContent className="px-0 w-full h-full flex justify-center items-center overflow-hidden">
            <AuthForms />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const GlowingDivider = () => (
  <>
    <div className="absolute left-[50%] -bottom-[8px] -translate-x-[50%] bg-gradient-to-r from-transparent via-slate-200 to-transparent h-[2px] w-3/4 blur-sm" />
    <div className="absolute left-[50%] -bottom-[8px] -translate-x-[50%] bg-gradient-to-r from-transparent via-slate-300 to-transparent h-px w-3/4" />
    <div className="absolute left-[50%] -bottom-[8px] -translate-x-[50%] bg-gradient-to-r from-transparent via-slate-400 to-transparent h-[5px] w-2/4 blur-lg" />
    <div className="absolute left-[50%] -bottom-[8px] -translate-x-[50%] bg-gradient-to-r from-transparent via-slate-500 to-transparent h-px w-2/4" />
  </>
);
