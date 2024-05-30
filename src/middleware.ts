import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authKey, userRole } from "./constants";

const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = cookies();
  const token = cookie.get(authKey.token);

  if (pathname === "/donors") {
    return NextResponse.next();
  }

  if (!token?.value) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  let decode: any;
  try {
    decode = jwtDecode(token.value);
  } catch (e) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!decode) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = decode?.role;

  if (pathname === "/dashboard") {
    if (role === userRole.ADMIN) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard", "/donors/:donorId*", "/login", "/register", "/profile"],
};
