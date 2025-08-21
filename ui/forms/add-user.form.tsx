'use client';

import { UserInfoResponse, UserRoleResponse } from '@/lib/types';
import { Button } from '@/ui/components/button';
import { FileUpload } from '@/ui/components/file-upload';
import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/select';
import { useFormContext } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';
import { PersianDatePicker } from '../components/date-picker/date-picker';
import { UserFormData } from './add-user.validation';

interface Props {
  userToUpdate?: UserInfoResponse;
  userRoles: UserRoleResponse[];
  onSubmit: (data: UserFormData) => Promise<void>;
  isPending: boolean;
}

export default function AddUserForm({
  onSubmit,
  isPending,
  userRoles,
  userToUpdate,
}: Props) {
  const form = useFormContext<UserFormData>();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white rounded-lg shadow-md"
    >
      <div className="grid gap-4">
        {/* نام کاربری */}
        <div className="grid gap-1.5">
          <Label htmlFor="username">نام کاربری</Label>
          <Input
            id="username"
            placeholder="نام کاربری خود را وارد کنید"
            {...form.register('username')}
          />
          {form.formState.errors.username && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>

        {/* رمز عبور */}
        {!userToUpdate && (
          <div className="grid gap-1.5">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              type="password"
              placeholder="رمز عبور خود را وارد کنید"
              {...form.register('password')}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
        )}

        {/* نوع کاربر */}
        <div className="grid gap-1.5">
          <Label htmlFor="user_type_id">نوع کاربر</Label>
          <Select
            onValueChange={(value) =>
              form.setValue('user_type_id', parseInt(value))
            }
            defaultValue={form.getValues('user_type_id').toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="نوع کاربر را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {userRoles.map((role) => (
                  <SelectItem value={role.id.toString()}>
                    {role.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {form.formState.errors.user_type_id && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.user_type_id.message}
            </p>
          )}
        </div>

        {/* نام */}
        <div className="grid gap-1.5">
          <Label htmlFor="fname">نام</Label>
          <Input
            id="fname"
            placeholder="نام خود را وارد کنید"
            {...form.register('fname')}
          />
          {form.formState.errors.fname && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.fname.message}
            </p>
          )}
        </div>

        {/* نام خانوادگی */}
        <div className="grid gap-1.5">
          <Label htmlFor="lname">نام خانوادگی</Label>
          <Input
            id="lname"
            placeholder="نام خانوادگی خود را وارد کنید"
            {...form.register('lname')}
          />
          {form.formState.errors.lname && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.lname.message}
            </p>
          )}
        </div>

        {/* نام پدر */}
        <div className="grid gap-1.5">
          <Label htmlFor="father_name">نام پدر</Label>
          <Input
            id="father_name"
            placeholder="نام پدر خود را وارد کنید"
            {...form.register('father_name')}
          />
          {form.formState.errors.father_name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.father_name.message}
            </p>
          )}
        </div>

        {/* تاریخ تولد */}
        <div className="grid gap-1.5">
          <Label htmlFor="birth">تاریخ تولد</Label>
          <PersianDatePicker
            onChange={(date: DateObject) => {
              form.setValue('birth', date.toDate().toISOString());
            }}
          />
          {form.formState.errors.birth && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.birth.message}
            </p>
          )}
        </div>

        {/* آپلود رزومه */}
        <div className="grid gap-1.5">
          <Label>آپلود رزومه</Label>
          <FileUpload
            onUploadComplete={(val: any) =>
              form.setValue('resume_file_id', val.id)
            }
          />
        </div>

        {/* آدرس */}
        <div className="grid gap-1.5">
          <Label htmlFor="address">آدرس</Label>
          <Input
            id="address"
            placeholder="آدرس خود را وارد کنید"
            {...form.register('address')}
          />
          {form.formState.errors.address && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.address.message}
            </p>
          )}
        </div>

        {/* تلفن */}
        <div className="grid gap-1.5">
          <Label htmlFor="phone">شماره تلفن</Label>
          <Input
            id="phone"
            placeholder="شماره تلفن خود را وارد کنید"
            {...form.register('phone')}
          />
          {form.formState.errors.phone && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>

        {/* وضعیت فعال */}
        <div className="flex items-center gap-2">
          <input
            id="active"
            type="checkbox"
            checked={form.watch('active')}
            onChange={(e) => form.setValue('active', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <Label htmlFor="active" className="cursor-pointer">
            کاربر فعال
          </Label>
        </div>
      </div>

      <Button type="submit" className="w-full mt-6" loading={isPending}>
        ثبت نام
      </Button>
    </form>
  );
}
