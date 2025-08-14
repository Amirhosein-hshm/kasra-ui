export const PATHS = {
  auth: {
    login: '/auth/login',
  },
  profile: {
    root: '/profile',
  },
  settings: {
    root: '/settings',
  },
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
    },
    allocate: {
      root: '/dashboard/allocates',
    },
  },
};
