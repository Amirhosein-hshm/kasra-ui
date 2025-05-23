'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button, ButtonProps } from '@/ui/components/button';
import clsx from 'clsx';

export function ModeToggle(props: ButtonProps) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      {...props}
      className={clsx('max-lg:w-[24px] max-lg:h-[24px]', props.className)}
    >
      {theme === 'dark' ? <Sun stroke="white" /> : <Moon />}
    </Button>
  );
}
