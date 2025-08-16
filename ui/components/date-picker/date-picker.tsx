'use client';

import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker, { DateObject } from 'react-multi-date-picker';

interface Props {
  initialValue?: Date;
  onChange: (date: DateObject) => void;
  disabled?: boolean;
}

export function PersianDatePicker({ onChange, initialValue, disabled }: Props) {
  return (
    <DatePicker
      value={initialValue ?? new Date()}
      onChange={(date) => {
        if (date) onChange(date);
      }}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      inputClass="w-full p-2 border rounded-md"
      disabled={disabled}
    />
  );
}
