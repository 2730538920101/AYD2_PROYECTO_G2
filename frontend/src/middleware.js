import { NextResponse } from 'next/server'

export function middleware(request) {

  const cookies = request.cookies.get('auth');
  console.log("AQUI: ", cookies);


  if (!cookies && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (cookies && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (cookies) {
    const { rol, auth } = JSON.parse(cookies.value);
    console.log(rol);

    // Si el usuario logueado quiere acceder a otra ruta que no sea su dashboard o subrutas de este (segun su rol), se redirige al dashboard que le corresponde
    if (!auth && !request.nextUrl.pathname.startsWith('/login/adminFile')) {
      return NextResponse.redirect(new URL('/login/adminFile', request.url));
    } else if (rol.toUpperCase() == "ADMINISTRADOR" && !request.nextUrl.pathname.startsWith('/dashboard_administrador')) {
      return NextResponse.redirect(new URL('/dashboard_administrador', request.url));
    } else if (rol.toUpperCase() == "ASISTENTE" && !request.nextUrl.pathname.startsWith('/dashboard_asistente')) {
      return NextResponse.redirect(new URL('/dashboard_asistente', request.url));
    } else if (rol.toUpperCase() == "CONDUCTOR" && !request.nextUrl.pathname.startsWith('/dashboard_conductor')) {
      return NextResponse.redirect(new URL('/dashboard_conductor', request.url));
    } else if (rol.toUpperCase() == "USUARIO" && !request.nextUrl.pathname.startsWith('/dashboard_usuario')) {
      return NextResponse.redirect(new URL('/dashboard_usuario', request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard_administrador/:path*', '/dashboard_asistente/:path*', '/dashboard_conductor/:path*', '/dashboard_usuario/:path*', '/login', '/']
}
