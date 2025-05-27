import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SECRET_KEY!);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  const isPublic = path === "/" || path === "/login" || path === "/forgot-password";

  // Agar token nahi hai aur public page nahi hai, toh login page redirect
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Agar token hai to verify karo
  if (token) {
    const decoded = await verifyToken(token);

    if (!decoded) {
      // Agar token invalid hai to login page redirect karo
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = decoded.role as string;

    // Agar user public page pe hai to usko apne role ke dashboard pe bhejo
    if (isPublic) {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }

    // Agar user role ke mutabiq allowed nahi hai to apne dashboard pe redirect karo
    if (
      (path.startsWith("/admin") && role !== "admin") ||
      (path.startsWith("/trustee") && role !== "trustee") ||
      (path.startsWith("/volunteer") && role !== "volunteer")
    ) {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }

    // Sab sahi hai to decoded data cookie me set karo aur aage jao
    const response = NextResponse.next();
    response.cookies.set("decoded", JSON.stringify(decoded), { httpOnly: false });
    return response;
  }

  // Token nahi hai aur public page pe hai, simple next karo
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|static|favicon.ico|images|fonts|manifest.json|robots.txt|sitemap.xml).*)',
  ],
};
