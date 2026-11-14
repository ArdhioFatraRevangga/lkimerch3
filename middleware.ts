// Letak file: middleware.ts (di luar folder app)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Jika mencoba masuk ke /admin TAPI bukan halaman login
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Cek apakah punya "tiket masuk" (cookie)
    const token = request.cookies.get('admin_token')?.value;

    // Jika tiketnya tidak ada/salah, lempar ke halaman login
    if (token !== 'rahasia-lki') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};