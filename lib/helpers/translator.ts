export default function translator(
  key: string,
  section?: keyof typeof dictionary
) {
  return dictionary[section ?? 'general'][key] ?? key;
}

const dictionary = {
  paths: {
    dashboard: 'داشبورد',
    projects: 'پروژه ها',
    proposals: 'پروپوزال ها',
    reports: 'گزارش ها',
    rfps: 'RFP ها',
    settings: 'تنظیمات',
    profile: 'حساب کاربری',
    create: 'افزودن',
    update: 'بروزرسانی',
    upload: 'بارگذاری',
    allocates: 'تخصیص ها',
    users: 'کاربران',
  },
};
