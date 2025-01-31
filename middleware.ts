import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Restrictions basées sur les rôles
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if (path.startsWith('/manager') && token?.role !== 'MANAGER') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null
    }
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/schedule/:path*', 
    '/team/:path*', 
    '/admin/:path*',
    '/manager/:path*'
  ]
}