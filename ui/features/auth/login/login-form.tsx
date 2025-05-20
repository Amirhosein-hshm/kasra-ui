'use client';

import { Input } from '@/ui/components/input';
import { Button } from '@/ui/components/button';
import { Card, CardContent, CardHeader } from '@/ui/components/card';
import { Label } from '@/ui/components/label';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const form = useForm();

  const handleSubmit = form.handleSubmit((data: any) => {
    console.log(data);
  });

  return (
    <Card className="w-[320px] h-[320px]">
      <CardHeader>
        <h1 className="text-2xl font-bold font-[vazir-bold] text-center">
          سامانه کسری
        </h1>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="national-code">کد ملی</Label>
              <Input
                id="national-code"
                placeholder="کد ملی"
                {...form.register('national_code', {
                  required: true,
                  maxLength: 10,
                  minLength: 10,
                })}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phone">شماره همراه</Label>
              <Input
                id="phone"
                placeholder="شماره همراه"
                {...form.register('phone', {
                  required: true,
                  maxLength: 11,
                  minLength: 11,
                })}
              />
            </div>
            <Button type="submit" className="font-[vazir-medium]">
              ارسال کد
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
