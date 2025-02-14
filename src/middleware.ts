import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  

  // If the user is already signed in, then send the user to dashboard intsad of login page
  if (request.nextUrl.pathname === "/") {
    
      return NextResponse.redirect(new URL("/home", request.url));
    
  }
//   if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
//     return Response.redirect(new URL("/dashboard", request.url));
//   }
//   // If the user is not signed in, then send the user to login page
//   if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
//     return Response.redirect(new URL("/login", request.url));
//   }

  return NextResponse.next();

  // return NextResponse.next()
}

// function needsAuthentication(url: string): boolean {
//   return !url.startsWith('/dashboard'); // Example: Paths not starting with /public need authentication
// }

// async function checkAuthentication(request: NextRequest): Promise<boolean> {
//   const cookies = getCookies();

//   // Example: Check if user is authenticated based on the presence of a specific cookie
//   const authToken = cookies.get('accessToken')

//   // const authToken = request.cookies.authToken;

//   return !!authToken;
// }
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

