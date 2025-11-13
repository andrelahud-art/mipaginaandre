import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Protect /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "ADMIN") {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect course content routes (require authentication)
  if (
    pathname.startsWith("/emprendedor/despierta/") ||
    pathname.startsWith("/emprendedor/ordena-tu-desmadre/") ||
    pathname.startsWith("/emprendedor/piensa-como-estratega/") ||
    pathname.startsWith("/emprendedor/multiplica-tu-negocio/")
  ) {
    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/emprendedor/despierta/:path*",
    "/emprendedor/ordena-tu-desmadre/:path*",
    "/emprendedor/piensa-como-estratega/:path*",
    "/emprendedor/multiplica-tu-negocio/:path*",
  ],
};
