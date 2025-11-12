export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/emprendedor/despierta/:path*",
    "/emprendedor/ordena-tu-desmadre/:path*",
    "/emprendedor/piensa-como-estratega/:path*",
    "/emprendedor/multiplica-tu-negocio/:path*",
  ]
};
