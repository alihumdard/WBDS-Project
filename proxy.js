import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';


const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development_only_12345';
const key = new TextEncoder().encode(JWT_SECRET);


const gccCountries = ['AE', 'SA', 'QA', 'KW', 'OM', 'BH'];

export async function proxy(request) {
  const { pathname } = request.nextUrl;


  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    try {
      await jwtVerify(token, key);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }


  const shouldSkipI18n =
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/admin') ||
    pathname.match(/\.[a-z0-9]+$/i);

  if (shouldSkipI18n) {
    return NextResponse.next();
  }


  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const publicPath = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(new URL(publicPath, request.url));
  }
  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    const publicPath = pathname.replace(/^\/ar/, '/arabic') || '/arabic';
    return NextResponse.redirect(new URL(publicPath, request.url));
  }


  const isArabicRoute = pathname === '/arabic' || pathname.startsWith('/arabic/');

  const publicPathWithoutLocale = isArabicRoute ? (pathname.replace(/^\/arabic/, '') || '/') : pathname;


  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (cookieLocale) {

    if (cookieLocale === 'ar' && !isArabicRoute) {
      const redirectPath = `/arabic${publicPathWithoutLocale === '/' ? '' : publicPathWithoutLocale}`;
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    if (cookieLocale === 'en' && isArabicRoute) {
      return NextResponse.redirect(new URL(publicPathWithoutLocale, request.url));
    }
  } else {

    const country = request.geo?.country || request.headers.get('x-vercel-ip-country');
    const isGcc = country && gccCountries.includes(country.toUpperCase());


    if (isGcc && !isArabicRoute) {
      const redirectPath = `/arabic${publicPathWithoutLocale === '/' ? '' : publicPathWithoutLocale}`;
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

  }




  const internalLocale = isArabicRoute ? 'ar' : 'en';
  const internalPath = `/${internalLocale}${publicPathWithoutLocale === '/' ? '' : publicPathWithoutLocale}`;


  return NextResponse.rewrite(new URL(internalPath, request.url));
}

export const config = {

  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
