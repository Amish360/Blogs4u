import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt"; 

export async function middleware(req: NextRequest) {
   const token = req.cookies.get("token")?.value;

  const publicRoutes = ["/login", "/signup", "/"];

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const payload = await verifyToken(token); 
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
   
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/api/protected/:path*"], 
};
