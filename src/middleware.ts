import { type NextRequest, NextResponse } from 'next/server'

import { PUBLIC_URL } from './config/url.config'
import { EnumTokens } from './services/auth/auth-token.serice'

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	console.log('--- Middleware Check ---')
    console.log('Path:', request.nextUrl.pathname)
    console.log('Has Refresh Token:', !!refreshToken)
    console.log('All Cookie Names:', request.cookies.getAll().map(c => c.name))
	const isAuthPage = request.url.includes(PUBLIC_URL.auth())

	if (isAuthPage) {
		if (refreshToken) {
			console.log('Redirecting from Auth to Home because token exists')
			return NextResponse.redirect(
				new URL(PUBLIC_URL.home(), request.url)
			)
		}

		return NextResponse.next()
	}

	if (refreshToken === undefined) {
		console.log('Redirecting to Auth because token is MISSING')
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/store/:path*', '/auth']
}
