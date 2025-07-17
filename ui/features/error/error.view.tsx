'use client';

import { Button } from '@/ui/components/button';
import { useRouter } from 'next/navigation';

interface ErrorViewProps {
  error?: Error;
  reset?: () => void;
}

export default function ErrorView({ error, reset }: ErrorViewProps) {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-2xl font-bold">مشکلی پیش آمده است</h2>
        <p className="text-muted-foreground">
          {error?.message || 'خطایی در سیستم رخ داده است. لطفا دوباره تلاش کنید.'}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            router.back();
          }}
        >
          بازگشت
        </Button>
        {reset && (
          <Button
            onClick={() => {
              reset();
            }}
          >
            تلاش مجدد
          </Button>
        )}
      </div>
    </div>
  );
}