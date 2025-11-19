import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	// Блокируем рекурсивные запросы с множеством /images/
	if (pathname.includes('images/images')) {
		console.log('Blocked recursive image request:', pathname)
		return new NextResponse('Not Found', { status: 404 })
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/images/:path*'
}