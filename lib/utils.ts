import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFullName(user: { fname?: string; lname?: string }) {
  const first = user.fname?.trim() ?? '';
  const last = user.lname?.trim() ?? '';
  return `${first} ${last}`.trim();
}
