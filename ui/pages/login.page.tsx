'use client';

import { Button } from '@/ui/components/button';
import { Card, CardContent, CardHeader } from '@/ui/components/card';
import LoginForm from '@/ui/features/auth/login/login-form';
import OtpForm from '@/ui/features/auth/login/otp-form';
import { ModeToggle } from '@/ui/features/theme/mode-toggler';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function LoginPage() {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const handleReset = () => {
    setStep('login');
  };

  const { theme } = useTheme();

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
            'w-[320px] h-[320px]',
            theme === 'dark' && 'bg-black/25',
            theme === 'light' && 'bg-white/50'
          )}
        >
          <CardHeader className="relative">
            {step === 'otp' && (
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
          </CardHeader>

          <CardContent className="px-0 w-full h-full flex justify-center items-center overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 'login' ? (
                <motion.div
                  key="login"
                  variants={fadeLoginForm}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mx-6 w-[256px]"
                >
                  <LoginForm onSetStep={setStep} />
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  variants={fadeOtpForm}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mx-6 w-[256px] h-full"
                >
                  <OtpForm />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const fadeLoginForm = {
  initial: {
    opacity: 1,
    x: 0,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -10,
  },
};

const fadeOtpForm = {
  initial: {
    opacity: 0,
    x: 10,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 10,
  },
};
