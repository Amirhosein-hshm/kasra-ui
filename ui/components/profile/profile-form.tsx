'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/components/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/components/avatar';
import { Button } from '@/ui/components/button';
import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import { Skeleton } from '@/ui/components/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/tabs';
import { useMeStore } from '@/lib/stores/me.stores';
import translator from '@/lib/helpers/translator';

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    fatherName: '',
    username: '',
    phone: '',
    address: '',
    birth: '',
  });

  const user = useMeStore((s) => s.user);
  const loading = useMeStore((s) => s.loading);

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (user && !isEditing) {
      setFormData({
        fname: user.fname || '',
        lname: user.lname || '',
        fatherName: user.fatherName || '',
        username: user.username || '',
        phone: user.phone || '',
        address: user.address || '',
        birth: user.birth || '',
      });
    }
  }, [user, isEditing]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the updated profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (user) {
      setFormData({
        fname: user.fname || '',
        lname: user.lname || '',
        fatherName: user.fatherName || '',
        username: user.username || '',
        phone: user.phone || '',
        address: user.address || '',
        birth: user.birth || '',
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className={`container mx-auto py-8 px-4 max-w-4xl`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>اطلاعات پروفایل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`container mx-auto py-8 px-4 max-w-4xl`}>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              اطلاعات کاربری یافت نشد
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`container mx-auto py-8 px-4 max-w-4xl`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${user.fname}+${user.lname}&background=0D8ABC&color=fff`}
                    alt={`${user.fname} ${user.lname}`}
                  />
                  <AvatarFallback className="text-2xl">
                    {user.fname?.charAt(0)}
                    {user.lname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">
                    {user.fname} {user.lname}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {translator(String(user.userTypeId), 'roles')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details Card with Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            {/*<TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">پروفایل</TabsTrigger>
              <TabsTrigger value="security">امنیت</TabsTrigger>
            </TabsList>*/}
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>اطلاعات پروفایل</CardTitle>
                  {/*<Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditToggle}
                  >
                    {isEditing ? 'لغو' : 'ویرایش'}
                  </Button>*/}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fname">نام</Label>
                        {isEditing ? (
                          <Input
                            id="fname"
                            value={formData.fname}
                            onChange={(e) =>
                              handleInputChange('fname', e.target.value)
                            }
                          />
                        ) : (
                          <div className="p-2 bg-muted rounded-md">
                            {user.fname}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lname">نام خانوادگی</Label>
                        {isEditing ? (
                          <Input
                            id="lname"
                            value={formData.lname}
                            onChange={(e) =>
                              handleInputChange('lname', e.target.value)
                            }
                          />
                        ) : (
                          <div className="p-2 bg-muted rounded-md">
                            {user.lname}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fatherName">نام پدر</Label>
                        {isEditing ? (
                          <Input
                            id="fatherName"
                            value={formData.fatherName}
                            onChange={(e) =>
                              handleInputChange('fatherName', e.target.value)
                            }
                          />
                        ) : (
                          <div className="p-2 bg-muted rounded-md">
                            {user.fatherName}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">نام کاربری</Label>
                        {isEditing ? (
                          <Input
                            id="username"
                            value={formData.username}
                            onChange={(e) =>
                              handleInputChange('username', e.target.value)
                            }
                          />
                        ) : (
                          <div className="p-2 bg-muted rounded-md">
                            {user.username}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">شماره موبایل</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange('phone', e.target.value)
                            }
                          />
                        ) : (
                          <div className="p-2 bg-muted rounded-md">
                            {user.phone || 'ثبت نشده'}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birth">تاریخ تولد</Label>
                        {isEditing ? (
                          <Input
                            id="birth"
                            value={formData.birth}
                            onChange={(e) =>
                              handleInputChange('birth', e.target.value)
                            }
                          />
                        ) : (
                          <div className="p-2 bg-muted rounded-md">
                            {user.birth || 'ثبت نشده'}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">آدرس</Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) =>
                            handleInputChange('address', e.target.value)
                          }
                        />
                      ) : (
                        <div className="p-2 bg-muted rounded-md">
                          {user.address || 'ثبت نشده'}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={handleCancel}>
                          لغو
                        </Button>
                        <Button onClick={handleSave}>ذخیره تغییرات</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>تنظیمات امنیتی</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>تغییر رمز عبور</Label>
                      <div className="flex justify-end">
                        <Button variant="outline">تغییر رمز</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>ورود دو مرحله‌ای</Label>
                      <div className="flex justify-between items-center">
                        <span>فعال کردن احراز هویت دو مرحله‌ای</span>
                        <Button variant="outline">تنظیمات</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
