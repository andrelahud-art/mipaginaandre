# Sistema de Autenticación - Guía de Configuración

## ✅ Sistema Implementado

El sistema de autenticación con NextAuth.js ha sido completamente implementado. Ahora puedes:

- ✅ Registrar nuevos usuarios en `/register`
- ✅ Iniciar sesión en `/login`
- ✅ Acceder al dashboard protegido en `/dashboard`
- ✅ Cerrar sesión
- ✅ Protección automática de rutas `/dashboard` y `/admin`

## 🔧 Configuración Requerida

### 1. Variables de Entorno

Ya se creó un archivo `.env.local` con las variables básicas. **Necesitas actualizar la URL de la base de datos**:

```env
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="FuFbXuiALRAq7PrmRyQzcS48nQFiQTC5IzTuo3PlLf8="

# Database - ⚠️ ACTUALIZA ESTO CON TU DATABASE_URL REAL
DATABASE_URL="postgresql://user:password@localhost:5432/emprendedor?schema=public"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 2. Base de Datos PostgreSQL

Si aún no has configurado la base de datos, sigue estos pasos:

```bash
# 1. Asegúrate de tener PostgreSQL instalado y corriendo

# 2. Crea la base de datos
createdb emprendedor

# 3. Ejecuta las migraciones de Prisma
npx prisma migrate dev --name init

# 4. (Opcional) Carga datos de ejemplo
npx prisma db seed
```

### 3. Para Producción (Vercel)

Configura las siguientes variables de entorno en Vercel:

- `DATABASE_URL`: Tu URL de base de datos de producción (por ejemplo, de Supabase, Railway, etc.)
- `NEXTAUTH_URL`: Tu URL de producción (ej: `https://tudominio.com`)
- `NEXTAUTH_SECRET`: El mismo secreto del archivo `.env.local` o genera uno nuevo
- `NEXT_PUBLIC_SITE_URL`: Tu URL de producción

## 📁 Archivos Creados

### Configuración
- `lib/prisma.ts` - Cliente singleton de Prisma
- `middleware.ts` - Middleware para proteger rutas
- `.env.example` - Ejemplo de variables de entorno
- `.env.local` - Variables de entorno locales (no se sube a git)

### API Routes
- `app/api/auth/[...nextauth]/route.ts` - Configuración de NextAuth
- `app/api/register/route.ts` - Endpoint de registro de usuarios

### Páginas
- `app/login/page.tsx` - Página de inicio de sesión
- `app/register/page.tsx` - Página de registro
- `app/dashboard/page.tsx` - Dashboard protegido del usuario

### Componentes
- `components/providers/SessionProvider.tsx` - Provider de sesión de NextAuth

## 🚀 Cómo Usar

### Desarrollo Local

1. Asegúrate de tener la base de datos configurada
2. Actualiza `DATABASE_URL` en `.env.local`
3. Ejecuta el proyecto:

```bash
npm run dev
```

4. Visita:
   - http://localhost:3000/register para crear una cuenta
   - http://localhost:3000/login para iniciar sesión
   - http://localhost:3000/dashboard para ver tu dashboard

### Registro de Usuario

1. Ve a `/register`
2. Ingresa nombre, email y contraseña
3. El sistema:
   - Valida los datos
   - Hashea la contraseña con bcrypt
   - Crea el usuario en la BD
   - Crea el perfil asociado
   - Te inicia sesión automáticamente
   - Te redirige al dashboard

### Inicio de Sesión

1. Ve a `/login`
2. Ingresa email y contraseña
3. El sistema:
   - Valida las credenciales
   - Crea una sesión JWT
   - Te redirige al dashboard o a la página solicitada

## 🔐 Seguridad

- Las contraseñas se hashean con `bcrypt` (10 rounds)
- Las sesiones usan JWT (JSON Web Tokens)
- El middleware protege automáticamente rutas sensibles
- Las rutas `/admin` requieren rol de ADMIN

## 🐛 Solución de Problemas

### Error: "PrismaClient is unable to connect"

**Solución**: Verifica que:
1. PostgreSQL esté corriendo
2. La `DATABASE_URL` en `.env.local` sea correcta
3. La base de datos exista
4. Ejecutes `npx prisma generate` después de cambios en el schema

### Error 404 en /login o /register

**Solución**: Ya está resuelto. Las rutas ahora existen.

### Error: "NEXTAUTH_SECRET missing"

**Solución**: Asegúrate de tener `NEXTAUTH_SECRET` en `.env.local`

## 📚 Próximos Pasos

- [ ] Configurar base de datos de producción
- [ ] Implementar recuperación de contraseña
- [ ] Agregar OAuth providers (Google, GitHub, etc.)
- [ ] Implementar verificación de email
- [ ] Agregar roles y permisos más granulares
- [ ] Integrar con el sistema de cursos de emprendedor

## 🔗 Recursos

- [NextAuth.js Docs](https://next-auth.js.org/)
- [Prisma Docs](https://www.prisma.io/docs)
- [EMPRENDEDOR_SETUP.md](./EMPRENDEDOR_SETUP.md) - Guía completa de la plataforma
