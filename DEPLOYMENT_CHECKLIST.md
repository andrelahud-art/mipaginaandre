# 🚀 Deployment Checklist - Vercel

## ✅ Estado del Deployment

### Código
- ✅ Error de TypeScript corregido en `app/api/progress/route.ts`
- ✅ Error de TypeScript corregido en `app/api/auth/[...nextauth]/route.ts`
- ✅ Todas las dependencias instaladas correctamente
- ✅ Cliente de Prisma generado
- ✅ Sin errores de TypeScript (`npx tsc --noEmit` pasa)

### Dependencias Críticas
- ✅ `@prisma/client@6.19.0` agregado a dependencies
- ✅ `prisma@6.19.0` agregado a devDependencies
- ✅ `next-auth@4.24.13` instalado
- ✅ `@auth/prisma-adapter@2.11.1` instalado
- ✅ `bcryptjs@3.0.3` instalado

### Configuración
- ✅ `.env.example` creado con todas las variables necesarias
- ✅ `package.json` actualizado con configuración de Prisma
- ✅ `vercel.json` configurado correctamente
- ✅ `.vercelignore` configurado (ignora admin)
- ✅ `next.config.js` con TypeScript checks habilitados

### Branch y Commits
- ✅ Branch: `claude/fix-typescript-progress-011CV4byNDAba775D4fsXP8h`
- ✅ Todos los commits pusheados
- ✅ Working tree limpio

---

## ⚙️ Variables de Entorno Requeridas en Vercel

### Obligatorias (CRITICAL)
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-here"
NEXT_PUBLIC_SITE_URL="https://your-domain.vercel.app"
```

### Opcionales (Features específicos)
```env
# Pagos con Conekta
CONEKTA_PRIVATE_KEY="key_..."
NEXT_PUBLIC_CONEKTA_PUBLIC_KEY="key_..."

# Video Upload
CF_STREAM_CUSTOMER_CODE="..."
CF_STREAM_API_TOKEN="..."

# Emails
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@..."
```

---

## 📋 Pasos para Deploy en Vercel

### 1. Configurar Base de Datos (PostgreSQL)

**Opción A: Usar Vercel Postgres**
1. En Vercel Dashboard → Storage → Create Database
2. Selecciona Postgres
3. Copia el `DATABASE_URL`

**Opción B: Usar Neon/Supabase**
1. Crea una cuenta en [Neon.tech](https://neon.tech) o [Supabase](https://supabase.com)
2. Crea un nuevo proyecto PostgreSQL
3. Copia la connection string

### 2. Configurar Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```bash
# Base de datos (CRITICAL)
DATABASE_URL=postgresql://...

# NextAuth (CRITICAL)
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate_new_secret_with_openssl
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Generar NEXTAUTH_SECRET:
openssl rand -base64 32
```

### 3. Ejecutar Migraciones de Prisma

Después del primer deploy:

```bash
# Opción 1: Desde tu máquina local
DATABASE_URL="your-production-db-url" npx prisma migrate deploy

# Opción 2: Agregar build command en Vercel
# Settings → General → Build & Development Settings
# Build Command: npx prisma migrate deploy && next build
```

### 4. Seed de Datos Iniciales (Opcional)

```bash
# Cargar cursos y datos de ejemplo
DATABASE_URL="your-production-db-url" npx prisma db seed
```

---

## 🔍 Verificación Post-Deploy

### 1. Verificar que el sitio carga
- [ ] La página principal carga correctamente
- [ ] `/emprendedor` carga sin errores
- [ ] `/login` y `/register` son accesibles

### 2. Probar autenticación
- [ ] Crear una cuenta nueva en `/register`
- [ ] Iniciar sesión en `/login`
- [ ] Acceder al `/dashboard`
- [ ] Cerrar sesión

### 3. Verificar rutas protegidas
- [ ] Sin login, `/dashboard` redirige a `/login`
- [ ] Con login, `/dashboard` muestra datos del usuario

### 4. Verificar base de datos
- [ ] El usuario se creó en la base de datos
- [ ] El enrollment al curso gratuito existe
- [ ] Las tablas están correctamente creadas

---

## 🐛 Troubleshooting

### Error: "PrismaClient is unable to connect"
**Causa**: La DATABASE_URL no está configurada o es incorrecta
**Solución**:
1. Verifica que DATABASE_URL está en Vercel Environment Variables
2. Verifica que la cadena de conexión es correcta
3. Redeploy el proyecto

### Error: "NEXTAUTH_SECRET is not set"
**Causa**: Falta NEXTAUTH_SECRET en variables de entorno
**Solución**:
1. Genera un nuevo secret: `openssl rand -base64 32`
2. Agrégalo en Vercel Environment Variables
3. Redeploy

### Error: "Cannot find module '@prisma/client'"
**Causa**: Prisma Client no se generó durante el build
**Solución**:
1. Verifica que `@prisma/client` está en dependencies (no devDependencies)
2. Agrega `npx prisma generate` al build command
3. Build command final: `npx prisma generate && next build`

### Error: Build falla con "Failed to fetch fonts"
**Causa**: Problema de red TLS en el build (local solamente)
**Solución**: Esto NO afecta el deploy en Vercel. Solo es un problema local.

### Las rutas protegidas no funcionan
**Causa**: El middleware no está funcionando
**Solución**:
1. Verifica que `middleware.ts` está en la raíz del proyecto
2. Verifica que NEXTAUTH_SECRET está configurado
3. Revisa los logs de Vercel para errores específicos

---

## 📊 Monitoring Post-Deploy

### 1. Vercel Analytics
- Habilita Vercel Analytics en el dashboard
- Monitorea errores 500 y 404
- Revisa performance metrics

### 2. Database Monitoring
- Monitorea conexiones activas
- Revisa queries lentos
- Configura alertas de uso

### 3. Logs
- Revisa logs de Vercel regularmente
- Busca errores de NextAuth
- Verifica queries de Prisma

---

## ✅ Deploy Exitoso

Si todo funciona correctamente, deberías poder:

1. ✅ Visitar tu sitio en `https://your-domain.vercel.app`
2. ✅ Registrar una cuenta nueva
3. ✅ Iniciar sesión automáticamente
4. ✅ Ver el dashboard con tu información
5. ✅ Estar inscrito en el curso gratuito
6. ✅ Cerrar sesión y volver a iniciar

---

## 🎯 Próximos Pasos

Después del deploy inicial:

1. **Configurar Dominio Personalizado** (Opcional)
   - Vercel Dashboard → Settings → Domains
   - Agregar tu dominio
   - Actualizar NEXTAUTH_URL y NEXT_PUBLIC_SITE_URL

2. **Configurar Pagos Conekta** (Opcional)
   - Agregar CONEKTA_PRIVATE_KEY y NEXT_PUBLIC_CONEKTA_PUBLIC_KEY
   - Verificar webhooks de Conekta apuntan a tu dominio

3. **Configurar Emails** (Opcional)
   - Crear cuenta en Resend
   - Verificar dominio
   - Agregar RESEND_API_KEY y RESEND_FROM_EMAIL

4. **Monitorear Performance**
   - Habilitar Vercel Analytics
   - Configurar alertas
   - Revisar logs regularmente

---

## 📞 Ayuda

Si encuentras problemas:
1. Revisa los logs en Vercel Dashboard → Deployments → [tu deploy] → Logs
2. Verifica las variables de entorno en Settings → Environment Variables
3. Revisa la consola del navegador (F12) para errores del cliente
4. Verifica la base de datos con Prisma Studio: `npx prisma studio`
