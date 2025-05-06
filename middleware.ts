// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	const refreshToken = req.cookies.get('refreshToken');
	const { pathname } = req.nextUrl;

	// Block logged-in users from seeing /login or /signup
	if (refreshToken && (pathname === '/login' || pathname === '/signup')) {
		return NextResponse.redirect(new URL('/', req.url));
	}

	return NextResponse.next();
}

// Define which routes should trigger this middleware
export const config = {
	matcher: ['/login', '/signup', '/dashboard'],
};
