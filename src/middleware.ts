import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname

    const isPublicPath = path === '/auth/login' || path === '/auth/signup' || path === '/auth/verifyemail'
    const token = request.cookies.get('userToken')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/problems', request.url))
    }
    else if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }


    // return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/auth/login',
        '/auth/signup',
        '/auth/verifyemail',
        '/auth/logout',
        '/auth/profile',
        '/problems',
    ]
}