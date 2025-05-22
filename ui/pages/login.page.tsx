'use client';

import { Button } from '@/ui/components/button';
import { Card, CardContent, CardHeader } from '@/ui/components/card';
import { ModeToggle } from '@/ui/features/theme/mode-toggler';
import clsx from 'clsx';
import { ChevronLeftIcon } from 'lucide-react';
import { SetStateAction, useState } from 'react';
import { AuthStep } from '@/lib/types/ui/AuthStep.enum';
import AuthForms from '@/ui/features/auth/auth-forms';

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>(AuthStep.Login);
  const handleReset = () => {
    setStep(AuthStep.Login);
  };

  return (
    <div>
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>

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
            'bg-white/10'
          )}
        >
          <CardHeader className="relative">
            {step === AuthStep.Otp && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="absolute top-0 left-[30px]"
              >
                <ChevronLeftIcon />
              </Button>
            )}
            <h1 className="text-2xl font-bold font-[vazir-bold] text-center">
              سامانه کسری
            </h1>

            <GlowingDivider />
          </CardHeader>

          <CardContent className="px-0 w-full h-full flex justify-center items-center overflow-hidden">
            <AuthForms step={step} setStep={setStep} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const GlowingDivider = () => (
  <>
    <div className="absolute left-[50%] -bottom-[8px] -translate-x-[50%] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-400 to-transparent h-[2px] w-3/4 blur-sm" />
    <div className="absolute left-[50%] -bottom-[8px] -translate-x-[50%] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-300 to-transparent h-px w-3/4" />
    <div className="absolute left-[50%] -bottom-[8px] -translate-x-[50%] bg-gradient-to-r from-transparent via-slate-400 dark:via-slate-200 to-transparent h-[5px] w-2/4 blur-lg" />
    <div className="absolute left-[50%] -bottom-[8px] -translate-x-[50%] bg-gradient-to-r from-transparent via-slate-500 dark:via-slate-100 to-transparent h-px w-2/4" />
  </>
);
