import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getCookie, hasCookies } from './helpers/logic/security';
import { refreshTokenApi } from './server/auth';


const intlMiddleware = createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
});

function getLocale(pathname: string): string {
  return pathname.startsWith('/vi') ? 'vi' : 'en';
}

function redirectToLogin(req: NextRequest, locale: string): NextResponse {
  const redirectUrl = new URL(`/${locale}/login`, req.url);
  return setTheme(NextResponse.redirect(redirectUrl));
}

function redirectToMainRooms(req: NextRequest, locale: string): NextResponse {
  const redirectUrl = new URL(`/${locale}/education`, req.url);
  return setTheme(NextResponse.redirect(redirectUrl));
}

function shouldRedirectToLogin(pathname: string, hasAccessToken: boolean, hasRefreshToken: boolean): boolean {
  return /^\/(vi|en)\/(?!(login|register)).*$/i.test(pathname) && !hasAccessToken && !hasRefreshToken;
}

function shouldRedirectToMainRooms(pathname: string, hasAccessToken: boolean, hasRefreshToken: boolean): boolean {
  return /^\/(vi|en)\/((login|register)).*$/i.test(pathname) && (hasAccessToken || hasRefreshToken);
}

function setTheme(response: NextResponse): NextResponse {
  const theme = getCookie('theme') ?? 'light';
  response.cookies.set({
    name:'theme',
    value: theme,
    path: '/',
    httpOnly: false,
    secure: false,
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  })
  return response;
}

async function handleTokenRefresh(req: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next();
  const data = await refreshTokenApi(getCookie('refresh_token') ?? '');
  response.cookies.set({
    name: 'access_token',
    value: data?.tokens?.accessToken,
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: Number(process.env.EXPIRES_ACCESS_TOKEN) || 0,
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
  response.cookies.set({
    name: 'refresh_token',
    value: data?.tokens?.refreshToken,
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: Number(process.env.EXPIRES_REFRESH_TOKEN) || 0,
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
  return response;
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasAccessToken = hasCookies('access_token');
  const hasRefreshToken = hasCookies('refresh_token');

  if (pathname === '/en' || pathname === '/vi') {
    return redirectToLogin(req, getLocale(pathname));
  }

  if (shouldRedirectToLogin(pathname, hasAccessToken, hasRefreshToken)) {
    return redirectToLogin(req, getLocale(pathname));
  }

  if (shouldRedirectToMainRooms(pathname, hasAccessToken, hasRefreshToken)) {
    return redirectToMainRooms(req, getLocale(pathname));
  }

  if (!hasAccessToken && hasRefreshToken) {
    return await handleTokenRefresh(req);
  }
  
  return setTheme(intlMiddleware(req));
}

export const config = {
  matcher: ['/', '/(vi|en)/:path*', '/login'],
};
