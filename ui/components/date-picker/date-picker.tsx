'use client';

import React from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

interface Props {
  initialValue?: Date;
  onChange: (date: DateObject) => void;
}

export function PersianDatePicker({ onChange, initialValue }: Props) {
  const [value] = React.useState(initialValue ?? new Date());

  return (
    <DatePicker
      value={value}
      onChange={(date) => {
        if (date) onChange(date);
      }}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      inputClass="w-full p-2 border rounded-md"
    />
  );
}
