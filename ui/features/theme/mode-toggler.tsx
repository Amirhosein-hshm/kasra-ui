'use client';

import { Moon, Sun } from 'lucide-react';

import { useDarkMode } from '@/lib/hooks/useDarkMode';
import { Button, ButtonProps } from '@/ui/components/button';
import clsx from 'clsx';

export function ModeToggle(props: ButtonProps) {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleDarkMode}
      {...props}
      className={clsx('max-lg:w-[24px] max-lg:h-[24px]', props.className)}
    >
      {isDark ? <Sun stroke="white" /> : <Moon />}
    </Button>
  );
}
