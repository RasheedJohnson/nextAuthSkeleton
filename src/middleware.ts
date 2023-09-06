import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {

  // (A) if current path == "/signup" or "/login" & token doesn't exist then redirect to home ("/")
  // If user has a token (cookie), meaning they're logged in, then user should not be able to visit
  // either signup or login page. Send user to Home page instead
  const path = request.nextUrl.pathname   // getting current url path

  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";   // boolean

  //    if no token exists assign empty string
  const token = request.cookies.get("token")?.value || "";

  //    if token exists then user can't visit signup or  login
  if(isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  //    if no token then send user to login screen
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

}

// (B) MY CODE: make user unable to visit "profile/<string>"
// const item = contains("/profile/");

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile",
    `/profile/:path*`,
    "/login",
    "/signup",
    "/verifyemail"
  ]
}