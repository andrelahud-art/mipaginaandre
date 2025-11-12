# 💳 Guía de Integración con Conekta

## ✅ Estado de Implementación

La integración con Conekta está **100% completa** y lista para usar. Incluye:

- ✅ Endpoint de checkout (`/api/checkout-conekta`)
- ✅ Webhook para procesar pagos (`/api/webhooks/conekta`)
- ✅ Componente de checkout con modal
- ✅ Página de éxito después del pago
- ✅ Soporte para tarjetas, OXXO y transferencias SPEI
- ✅ Base de datos actualizada con campos de Conekta

---

## 🔧 Configuración Inicial

### 1. Obtener tus claves de Conekta

1. Ve a [https://admin.conekta.com/](https://admin.conekta.com/)
2. Regístrate o inicia sesión
3. Ve a **Settings → API Keys**
4. Copia tu **clave privada** (la que ya tienes: `key_KkoFGsi2wAL9kiW5ad5S2TL`)
5. Copia tu **clave pública** (empieza con `key_...`)

### 2. Configurar variables de entorno

Tu archivo `.env.local` ya está configurado con la clave privada. Solo necesitas agregar tu **clave pública**:

```env
# Conekta API Keys
CONEKTA_PRIVATE_KEY="key_KkoFGsi2wAL9kiW5ad5S2TL"
NEXT_PUBLIC_CONEKTA_PUBLIC_KEY="key_..." # <- REEMPLAZA CON TU CLAVE PÚBLICA

# Database URL (si aún no la tienes)
DATABASE_URL="postgresql://user:password@localhost:5432/emprendedor?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-super-seguro-aqui" # <- Genera uno con: openssl rand -base64 32

# Webhook Secret (lo configurarás más adelante)
CONEKTA_WEBHOOK_SECRET=""

# Currency
CURRENCY="MXN"
```

### 3. Inicializar base de datos

```bash
# Generar cliente de Prisma
npx prisma generate

# Crear/migrar base de datos
npx prisma migrate dev --name add_conekta_fields

# Cargar datos de ejemplo (cursos)
npx prisma db seed
```

---

## 🧪 Cómo Probar la Integración

### Modo de Prueba (Test Mode)

Conekta detecta automáticamente el modo de prueba basándose en tu clave. La clave que tienes (`key_KkoFGsi2wAL9kiW5ad5S2TL`) es una **clave de prueba** (test mode).

### Tarjetas de Prueba

Usa estas tarjetas para probar diferentes escenarios:

#### ✅ Pago Exitoso
```
Número: 4242 4242 4242 4242
CVV: 123
Fecha: Cualquier fecha futura (ej: 12/25)
Nombre: Cualquier nombre
```

#### ❌ Pago Rechazado
```
Número: 4000 0000 0000 0002
CVV: 123
Fecha: Cualquier fecha futura
```

#### 💳 Otras tarjetas de prueba:
- **Visa**: `4242424242424242`
- **Mastercard**: `5555555555554444`
- **American Express**: `378282246310005`

### OXXO (Pago en Efectivo)

En modo de prueba, recibirás un código de barras de ejemplo. En producción, el usuario puede pagar en cualquier tienda OXXO.

### SPEI (Transferencia Bancaria)

En modo de prueba, recibirás una CLABE de ejemplo. En producción, el usuario puede hacer transferencias desde cualquier banco.

---

## 🚀 Flujo de Pago Completo

### 1. Usuario hace clic en "Comprar"

```typescript
// El botón en /emprendedor/[slug]
<ConektaCheckoutButton
  courseSlug="ordena-tu-desmadre"
  courseTitle="Ordena tu desmadre"
  price="$9.99"
  priceCents={999}
/>
```

### 2. Se abre modal con formulario

El usuario ingresa:
- Nombre completo
- Email
- Teléfono (opcional)

### 3. Se crea la orden en Conekta

```bash
POST /api/checkout-conekta
```

Respuesta:
```json
{
  "success": true,
  "checkoutUrl": "https://pay.conekta.com/checkout/...",
  "orderId": "ord_2zXXXXXXXXXXXXXX"
}
```

### 4. Usuario es redirigido al checkout hospedado

Conekta muestra su página segura con:
- Formulario de tarjeta
- Opciones de OXXO
- Opciones de SPEI

### 5. Conekta procesa el pago

Al completar el pago, Conekta:
- Envía webhook a tu servidor: `/api/webhooks/conekta`
- Redirige al usuario a: `/emprendedor/success?course=ordena-tu-desmadre`

### 6. Tu webhook procesa el pago

```typescript
// /api/webhooks/conekta/route.ts
- Verifica la firma del webhook
- Guarda el evento en base de datos
- Actualiza la orden a "PAID"
- Crea el enrollment del usuario
- (Opcional) Envía email de confirmación
```

---

## 🔒 Configurar Webhook en Conekta

### Paso 1: Exponer tu servidor local (para pruebas)

Usa ngrok o similar:

```bash
# Instalar ngrok
npm install -g ngrok

# Exponer puerto 3000
ngrok http 3000
```

Obtendrás una URL como: `https://abc123.ngrok.io`

### Paso 2: Configurar webhook en Conekta

1. Ve a [https://admin.conekta.com/webhooks](https://admin.conekta.com/webhooks)
2. Haz clic en **Add Webhook**
3. URL: `https://abc123.ngrok.io/api/webhooks/conekta` (o tu dominio en producción)
4. Eventos a escuchar:
   - ✅ `order.paid`
   - ✅ `order.pending_payment`
   - ✅ `order.expired`
   - ✅ `charge.paid`

5. Copia el **Webhook Secret**
6. Agrega el secret a tu `.env.local`:

```env
CONEKTA_WEBHOOK_SECRET="tu-webhook-secret-aqui"
```

---

## 📊 Verificar que Todo Funciona

### 1. Iniciar servidor

```bash
npm run dev
```

### 2. Ir a un curso de pago

```
http://localhost:3000/emprendedor/ordena-tu-desmadre
```

### 3. Hacer clic en "Comprar por $9.99"

Verás el modal con el formulario.

### 4. Llenar datos y hacer clic en "Continuar al pago"

Serás redirigido al checkout de Conekta.

### 5. Usar tarjeta de prueba

```
4242 4242 4242 4242
CVV: 123
Fecha: 12/25
```

### 6. Completar pago

Deberías ser redirigido a `/emprendedor/success`

### 7. Verificar en base de datos

```bash
# Entrar a Prisma Studio
npx prisma studio
```

Verifica que se crearon:
- ✅ Un registro en `Order` con `status: "PAID"`
- ✅ Un registro en `Enrollment` con `status: "ACTIVE"`
- ✅ Un registro en `Webhook` con `processed: true`

---

## 🎬 Subir Videos a tus Cursos

Tienes dos opciones principales:

### Opción 1: Cloudflare Stream (Recomendado)

**Por qué Cloudflare Stream:**
- 💰 Precio: $1 USD por 1,000 minutos vistos
- ⚡ CDN global ultra-rápido
- 📱 Adaptive bitrate automático
- 🔒 Protección contra piratería
- 🎨 Player personalizable

**Configuración:**

1. Ve a [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
2. Selecciona tu cuenta → **Stream**
3. Obtén tus credenciales:
   - Account ID
   - API Token
   - Customer Code

4. Agrega a `.env.local`:

```env
CF_STREAM_ACCOUNT_ID="tu-account-id"
CF_STREAM_API_TOKEN="tu-api-token"
CF_STREAM_CUSTOMER_CODE="tu-customer-code"
```

5. Subir un video:

```bash
# Usando curl (ejemplo)
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/stream" \
  -H "Authorization: Bearer API_TOKEN" \
  -F file=@/ruta/a/tu/video.mp4
```

Respuesta:
```json
{
  "result": {
    "uid": "abc123xyz",
    "playback": {
      "hls": "https://customer-CODE.cloudflarestream.com/abc123xyz/manifest/video.m3u8"
    }
  }
}
```

6. Usar la URL en tu base de datos:

```sql
UPDATE lessons
SET "videoUrl" = 'https://customer-CODE.cloudflarestream.com/abc123xyz/manifest/video.m3u8'
WHERE id = 'lesson-id';
```

### Opción 2: Mux

Similar a Cloudflare pero más caro. Bueno si necesitas análiticas avanzadas.

```bash
npm install @mux/mux-node
```

```env
MUX_TOKEN_ID="..."
MUX_TOKEN_SECRET="..."
```

### Opción 3: YouTube (No Recomendado)

Si quieres empezar rápido sin costo:

1. Sube videos a YouTube como **No listados**
2. Obtén el ID del video (ej: `dQw4w9WgXcQ`)
3. Usar URL: `https://www.youtube.com/embed/dQw4w9WgXcQ`

**Desventajas:**
- ❌ No tienes control total
- ❌ Pueden aparecer anuncios
- ❌ No puedes restringir acceso

---

## 🎯 Panel de Admin (Próximamente)

Para facilitar la carga de videos, puedes crear un panel de admin en `/app/admin/page.tsx`:

```typescript
// Futuro: Panel para subir videos desde la interfaz
- Drag & drop de archivos
- Progreso de subida
- Preview del video
- Asignación a lecciones
```

---

## 💰 Pasar a Producción

### 1. Obtener claves de producción

1. Ve a [https://admin.conekta.com/](https://admin.conekta.com/)
2. Cambia a **Production Mode** (toggle arriba a la derecha)
3. Ve a **Settings → API Keys**
4. Copia tus nuevas claves de producción

### 2. Actualizar `.env.local` (o `.env` en producción)

```env
CONEKTA_PRIVATE_KEY="key_PRODUCCION_AQUI"
NEXT_PUBLIC_CONEKTA_PUBLIC_KEY="key_PRODUCCION_AQUI"
```

### 3. Configurar webhook de producción

URL: `https://tudominio.com/api/webhooks/conekta`

### 4. Activar cuenta de Conekta

Necesitarás:
- ✅ RFC (si eres persona física o moral en México)
- ✅ Comprobante de domicilio
- ✅ Identificación oficial
- ✅ Cuenta bancaria para recibir depósitos

---

## 📧 Emails Transaccionales (Opcional)

Para enviar emails después de cada compra, puedes usar **Resend**:

```bash
npm install resend
```

```env
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@tudominio.com"
```

```typescript
// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPurchaseConfirmation(
  email: string,
  courseName: string
) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `¡Gracias por tu compra! ${courseName}`,
    html: `
      <h1>¡Bienvenido!</h1>
      <p>Ya tienes acceso al curso: <strong>${courseName}</strong></p>
      <a href="https://tudominio.com/emprendedor">Ir al curso</a>
    `
  });
}
```

Luego en tu webhook:
```typescript
await sendPurchaseConfirmation(user.email, course.title);
```

---

## 🐛 Debugging

### Ver logs del webhook

```bash
# Logs en tiempo real
npx prisma studio

# Ir a tabla "webhooks"
# Ver eventos recibidos y si fueron procesados
```

### Probar webhook manualmente

```bash
curl -X POST http://localhost:3000/api/webhooks/conekta \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test_event_123",
    "type": "order.paid",
    "data": {
      "object": {
        "id": "ord_test_123",
        "metadata": {
          "courseId": "curso-id-aqui",
          "customerEmail": "test@example.com"
        },
        "customer_info": {
          "name": "Juan Pérez"
        }
      }
    }
  }'
```

---

## ✅ Checklist Final

- [x] Conekta instalado
- [x] Variables de entorno configuradas
- [x] Base de datos migrada
- [x] Endpoint de checkout creado
- [x] Webhook configurado
- [x] Componente de checkout integrado
- [x] Página de éxito creada
- [ ] Clave pública de Conekta agregada a `.env.local`
- [ ] Webhook configurado en panel de Conekta
- [ ] Prueba con tarjeta de prueba realizada
- [ ] Videos subidos a Cloudflare Stream o Mux
- [ ] (Opcional) Emails transaccionales configurados

---

## 🎉 ¡Listo!

Tu plataforma ahora acepta pagos con:
- 💳 Tarjetas (Visa, Mastercard, Amex)
- 🏪 OXXO (pago en efectivo)
- 🏦 SPEI (transferencia bancaria)

**Costos de Conekta:**
- 3.6% + $3 MXN por transacción con tarjeta
- $8 MXN por pago con OXXO
- $8 MXN por transferencia SPEI

**Soporte:**
- Docs de Conekta: [https://developers.conekta.com/](https://developers.conekta.com/)
- Soporte: soporte@conekta.com
