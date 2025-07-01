'use client';

export default function Forbidden() {
  return (
    <div className="h-full flex justify-center lg:items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">خطا 403</h1>
        <p className="text-lg">شما به این بخش دسترسی ندارید</p>
      </div>
    </div>
  );
}
