export default function translator(
  key: string,
  section?: keyof typeof dictionary
) {
  return dictionary[section ?? 'general'][key];
}

const dictionary = {
  paths: {
    dashboard: 'داشبورد',
    projects: 'پروژه ها',
    proposals: 'پروپوزال ها',
    reports: 'گزارش ها',
  },
};
