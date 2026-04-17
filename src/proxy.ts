import { NextResponse, type NextRequest } from 'next/server'
import 'server-only'
import { verifyPin } from './lib/hash'

const PIN = process.env.PIN_ACCESS as string

export async function proxy(request: NextRequest) {
	const token =
		request.cookies.get('auth_token')?.value ||
		request.nextUrl.searchParams.get('auth_token')

	// No token -> redirect
	if (!token) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	const isValid = await verifyPin(token, PIN)

	// Invalid -> redirect
	if (!isValid) {
		return NextResponse.redirect(new URL('/auth', request.url))
	} else if (request.nextUrl.searchParams.get('auth_token')) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	// Valid -> continue
	const response = NextResponse.next()

	response.cookies.set({
		name: 'auth_token',
		value: token,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7,
		path: '/'
	})

	return response
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones we don't want to protect:
		 * - /auth (login page)
		 * - /api/auth (authentication API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization)
		 * - favicon.ico, public files, etc.
		 */
		'/((?!auth|api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)'
	]
}
