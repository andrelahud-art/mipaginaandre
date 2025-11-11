# 🚀 Plataforma "¿Eres Emprendedor?" - Setup Guide

## 📋 Overview

Mini-plataforma de cursos con 4 niveles, pagos, progreso, certificados y sesiones de mentoría.

**Stack:**
- Next.js 14 (App Router) + TypeScript + Tailwind
- PostgreSQL (Prisma ORM)
- Stripe (pagos)
- S3/R2 (archivos)
- Cloudflare Stream/Mux (videos)
- NextAuth (autenticación)
- Resend (emails)

---

## 🎯 Lo que ya está hecho

✅ **Frontend completo:**
- Página landing `/emprendedor` con 4 tarjetas de cursos
- Páginas de detalle `/emprendedor/[slug]` con syllabus, módulos, recursos
- Navbar actualizado con botón destacado "¿Eres Emprendedor?"
- Diseño dark theme cohesivo

✅ **Base de datos:**
- Schema completo de Prisma (`prisma/schema.prisma`)
- 19 modelos: Users, Courses, Modules, Lessons, Enrollments, Progress, Certificates, Orders, Badges, etc.
- Seed inicial (`prisma/seed.ts`) con los 4 cursos + badges + inversionistas

✅ **Estructura de datos:**
- 4 cursos con pricing: $0, $9.99, $39.99, $199
- Módulos y lecciones de ejemplo
- Sistema de insignias
- Ofertas de sesiones de mentoría

---

## ⚙️ Setup Inicial

### 1. Instalar dependencias

```bash
npm install @prisma/client
npm install -D prisma

# NextAuth
npm install next-auth @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs

# Stripe
npm install stripe @stripe/stripe-js

# Resend (emails)
npm install resend

# S3/AWS SDK
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

# React PDF (certificados)
npm install @react-pdf/renderer

# PostHog (analytics)
npm install posthog-js posthog-node

# Zod (validación)
npm install zod
```

### 2. Variables de entorno

Crea `.env` y `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/emprendedor?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-aleatorio-super-seguro"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# S3 / Cloudflare R2
S3_BUCKET="emprendedor-media"
S3_REGION="auto"
S3_ENDPOINT="https://ACCOUNT_ID.r2.cloudflarestorage.com"
S3_ACCESS_KEY_ID="..."
S3_SECRET_ACCESS_KEY="..."

# Cloudflare Stream (o Mux)
CF_STREAM_CUSTOMER_CODE="..."
CF_STREAM_API_TOKEN="..."

# O si usas Mux:
MUX_TOKEN_ID="..."
MUX_TOKEN_SECRET="..."

# Resend
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@tudominio.com"

# Calendly (opcional)
CALENDLY_API_TOKEN="..."
CALENDLY_WEBHOOK_SECRET="..."

# PostHog
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Currency
CURRENCY="MXN"
```

### 3. Inicializar base de datos

```bash
# Generar cliente Prisma
npx prisma generate

# Crear/migrar BD
npx prisma migrate dev --name init

# Seed (cargar cursos iniciales)
npx prisma db seed
```

Agrega a `package.json`:

```json
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

---

## 🔌 Integraciones Clave

### 1. NextAuth (Autenticación)

**Crear:** `/app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### 2. Stripe Checkout

**Crear:** `/app/api/checkout/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16"
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug } = await req.json();

    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
      include: { products: true }
    });

    if (!course || !course.products[0]?.stripePriceId) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: course.products[0].stripePriceId,
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=1&course=${course.slug}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/emprendedor/${course.slug}`,
      metadata: {
        courseId: course.id,
        userId: session.user.id
      }
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
```

### 3. Webhook de Stripe

**Crear:** `/app/api/webhooks/stripe/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Log webhook
  await prisma.webhook.create({
    data: {
      source: "stripe",
      eventType: event.type,
      payload: event.data.object as any,
      processed: false
    }
  });

  // Handle event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { courseId, userId } = session.metadata!;

    // Create Order
    await prisma.order.create({
      data: {
        userId,
        courseId,
        stripePaymentIntentId: session.payment_intent as string,
        status: "PAID",
        amountCents: session.amount_total!,
        currency: session.currency!.toUpperCase()
      }
    });

    // Create Enrollment
    await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: "ACTIVE"
      }
    });

    // Mark webhook as processed
    await prisma.webhook.updateMany({
      where: {
        source: "stripe",
        payload: { path: ["id"], equals: event.id }
      },
      data: { processed: true }
    });

    // TODO: Send confirmation email via Resend
  }

  return NextResponse.json({ received: true });
}
```

### 4. Upload de archivos (S3/R2)

**Crear:** `/app/api/upload-url/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
  }
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileName, fileType } = await req.json();
  const key = `courses/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    ContentType: fileType
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return NextResponse.json({
    uploadUrl,
    key,
    publicUrl: `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`
  });
}
```

### 5. Progreso de lecciones

**Crear:** `/app/api/progress/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId, completed } = await req.json();

  const progress = await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId
      }
    },
    update: {
      completed,
      completedAt: completed ? new Date() : null
    },
    create: {
      userId: session.user.id,
      lessonId,
      completed,
      completedAt: completed ? new Date() : null
    }
  });

  // Check if course is completed
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: true
                }
              }
            }
          }
        }
      }
    }
  });

  const totalLessons = lesson?.module.course.modules.reduce(
    (sum, m) => sum + m.lessons.length,
    0
  ) || 0;

  const completedLessons = await prisma.progress.count({
    where: {
      userId: session.user.id,
      lesson: {
        module: {
          courseId: lesson?.module.course.id
        }
      },
      completed: true
    }
  });

  if (completedLessons === totalLessons) {
    // Generate certificate
    // TODO: Implement PDF generation and badge awarding
  }

  return NextResponse.json({ progress });
}
```

---

## 📊 Dashboard de Usuario

**Crear:** `/app/dashboard/page.tsx`

Ver ejemplo de UI con:
- Lista de cursos inscritos
- Progreso por curso (barra %)
- Próximas sesiones agendadas
- Certificados obtenidos
- Facturas/órdenes

---

## 🔐 Panel Admin

**Crear:** `/app/admin/page.tsx`

Proteger con middleware:

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "ADMIN";
      }
      return !!token;
    }
  }
});

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
```

**Admin features:**
- CRUD de cursos/módulos/lecciones
- Subir videos/PDFs (presigned URLs)
- Ver órdenes y enrollments
- Gestionar cupones
- Analytics básicos

---

## 📧 Emails con Resend

```typescript
// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: "Bienvenido a ¿Eres Emprendedor?",
    html: `<h1>Hola ${name}</h1><p>¡Bienvenido! Empieza con el curso gratuito...</p>`
  });
}

export async function sendPurchaseConfirmation(to: string, courseName: string) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `Confirmación de compra: ${courseName}`,
    html: `<h1>¡Gracias por tu compra!</h1><p>Ya tienes acceso a ${courseName}</p>`
  });
}

export async function sendCertificate(to: string, pdfUrl: string) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: "¡Felicidades! Tu certificado está listo",
    html: `<h1>¡Lo lograste!</h1><p><a href="${pdfUrl}">Descarga tu certificado</a></p>`
  });
}
```

---

## 🎓 Generación de Certificados

```typescript
// lib/certificate.ts
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 60 },
  title: { fontSize: 32, textAlign: "center", marginBottom: 20 },
  name: { fontSize: 24, textAlign: "center", marginBottom: 40 },
  body: { fontSize: 14, marginBottom: 20 }
});

const CertificateDocument = ({ userName, courseName, date }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Certificado de Finalización</Text>
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.body}>
        Ha completado exitosamente el curso:
      </Text>
      <Text style={styles.name}>{courseName}</Text>
      <Text style={styles.body}>
        Fecha: {date}
      </Text>
    </Page>
  </Document>
);

export async function generateCertificate(userName: string, courseName: string) {
  const blob = await pdf(<CertificateDocument userName={userName} courseName={courseName} date={new Date().toLocaleDateString()} />).toBlob();
  // Upload blob to S3 and return URL
  return "https://s3.../certificates/cert123.pdf";
}
```

---

## 📈 Analytics con PostHog

```typescript
// lib/analytics.ts
import posthog from "posthog-js";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST
  });
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  posthog.capture(eventName, properties);
}

// Ejemplos de uso:
// trackEvent("view_course", { courseSlug: "despierta" });
// trackEvent("complete_lesson", { lessonId: "123", courseId: "456" });
// trackEvent("purchase_succeeded", { courseId: "789", amount: 9.99 });
```

---

## ✅ Checklist de Lanzamiento

- [ ] Variables .env configuradas
- [ ] BD creada y seed ejecutado
- [ ] Stripe products creados y price IDs actualizados
- [ ] S3/R2 bucket creado y CORS configurado
- [ ] Cloudflare Stream o Mux configurado
- [ ] Resend dominio verificado y templates creados
- [ ] NextAuth funcionando (login/registro)
- [ ] Checkout de Stripe probado en modo test
- [ ] Webhook de Stripe configurado y verificado
- [ ] Upload de archivos funcionando
- [ ] Progreso de lecciones guardándose
- [ ] Generación de certificados implementada
- [ ] Emails transaccionales enviándose
- [ ] Dashboard de usuario funcional
- [ ] Panel admin protegido y funcional
- [ ] Analytics trackeando eventos clave
- [ ] Testing E2E completo
- [ ] Deploy en Vercel

---

## 🚀 Deploy

```bash
# Build local
npm run build

# Deploy a Vercel
vercel --prod

# Configurar webhooks en Stripe dashboard:
# URL: https://tudominio.com/api/webhooks/stripe
# Events: checkout.session.completed, payment_intent.succeeded
```

---

## 📝 Notas Importantes

1. **Stripe Price IDs**: Reemplaza los placeholders `price_XXXXXXXX` en el seed con tus Price IDs reales
2. **Videos**: Los URLs de ejemplo (`https://example.com/video1.mp4`) deben reemplazarse con URLs de Cloudflare Stream/Mux
3. **Certificados**: Implementar lógica de generación y subida a S3
4. **Calendly**: Integrar webhooks para actualizar `mentoring_slots`
5. **Testing**: Usar tarjetas de prueba de Stripe antes de ir a producción

---

## 🤝 Soporte

Para cualquier duda o problema durante el setup, revisa:
- Docs de Prisma: https://www.prisma.io/docs
- Docs de Stripe: https://stripe.com/docs
- Docs de NextAuth: https://next-auth.js.org
- Docs de Resend: https://resend.com/docs

**¡Éxito con tu plataforma! 🚀**
