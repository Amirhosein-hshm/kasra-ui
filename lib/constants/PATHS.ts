export const PATHS = {
  auth: {
    login: '/auth/login',
  },
  general: {
    dashboard: {
      root: '/dashboard',
      projects: {
        root: '/dashboard/projects',
        single(id: number) {
          return `/dashboard/projects/${id}`;
        },
      },
      proposals: {
        root: '/dashboard/proposals',
        single(id: number) {
          return `/dashboard/proposals/${id}`;
        },
        upload: '/dashboard/proposals',
      },
      reports: {
        root: '/dashboard/reports',
        single(id: number) {
          return `/dashboard/reports/${id}`;
        },
      },
      rfps: {
        root: '/dashboard/rfps',
        create(id: number) {
          return `/dashboard/rfps/create/${id}`;
        },
        update(id: number) {
          return `/dashboard/rfps/update/${id}`;
        },
      },
    },
    profile: {
      root: '/profile',
    },
    settings: {
      root: '/settings',
    },
  },
};
