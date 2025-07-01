export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userRoleId?: number;
}

// Set a cookie with optional expiration (default: 7 days)
function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof window === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  document.cookie = cookieString;
}

// Get a cookie by name
function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;

  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }

  return null;
}

// Delete a cookie
function deleteCookie(name: string): void {
  if (typeof window === 'undefined') return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Set access, refresh tokens and optional role
export function setAuthTokens({
  accessToken,
  refreshToken,
  userRoleId,
}: AuthTokens): void {
  if (!accessToken || !refreshToken) return;

  setCookie('access_token', accessToken, 1); // 1 day for access token
  setCookie('refresh_token', refreshToken, 7); // 7 days for refresh token

  if (userRoleId !== undefined) {
    setCookie('user_role_id', userRoleId.toString(), 1); // 1 day or as needed
  }
}

// Get tokens and userRoleId from cookies
export function getAuthTokens(): AuthTokens | null {
  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');
  const userRoleIdRaw = getCookie('user_role_id');

  if (!refreshToken) return null;

  const userRoleId = userRoleIdRaw ? parseInt(userRoleIdRaw, 10) : undefined;

  // @ts-ignore
  return { accessToken, refreshToken, userRoleId };
}

// Clear all auth-related cookies
export function clearAuthTokens(): void {
  deleteCookie('access_token');
  deleteCookie('refresh_token');
  deleteCookie('user_role_id');
}
