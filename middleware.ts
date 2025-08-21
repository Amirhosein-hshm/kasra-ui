import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PATHS } from './lib/constants/PATHS';

const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/projects',
  '/proposals',
  '/reports',
  '/rfps',
];

const publicRoutes = [
  '/login',
  '/auth/login',
  '/_next',
  '/favicon.ico',
  '/api',
];

export const ROLE_ACCESS: Record<RoleId, string[]> = {
  1: ['/dashboard', '/dashboard/proposals', '/profile'],
  2: ['/dashboard', '/dashboard/rfps', '/profile'],
  3: [
    '/dashboard',
    '/dashboard/proposals',
    '/dashboard/projects',
    '/profile',
    '/settings',
    '/projects',
  ],
  4: ['/dashboard', '/dashboard/proposals', '/dashboard/projects', '/profile'],
  5: ['/dashboard', '/profile', '/dashboard/projects', '/dashboard/reports'],
  6: ['/dashboard', '/profile', '/users'],
};

export type RoleId = 1 | 2 | 3 | 4 | 5 | 6;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const accessToken = request.cookies.get('access_token')?.value;

  const roleId = request.cookies.get('user_role_id')?.value;

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedRoute && accessToken && roleId) {
    const roleAccess = ROLE_ACCESS[parseInt(roleId, 10) as RoleId] || [];
    const hasAccess = roleAccess.some((route) => pathname.startsWith(route));

    if (!hasAccess) {
      const unauthorizedUrl = new URL('/auth/forbidden', request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  if (pathname === '/') {
    let redirectionURL;
    if (accessToken) {
      redirectionURL = new URL(PATHS.dashboard.root, request.url);
    } else {
      redirectionURL = new URL(PATHS.auth.login, request.url);
    }
    return NextResponse.redirect(redirectionURL);
  }

  if ((pathname === '/login' || pathname === '/auth/login') && accessToken) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
