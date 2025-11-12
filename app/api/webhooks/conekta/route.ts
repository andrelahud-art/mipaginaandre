import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const event = JSON.parse(body);

    // Verificar firma del webhook (IMPORTANTE para seguridad)
    const signature = req.headers.get("x-conekta-signature");

    if (process.env.CONEKTA_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.CONEKTA_WEBHOOK_SECRET)
        .update(body)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("Webhook signature verification failed");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    }

    // Guardar webhook en base de datos para auditoría
    await prisma.webhook.create({
      data: {
        source: "conekta",
        eventType: event.type,
        payload: event,
        processed: false
      }
    });

    // Procesar eventos de Conekta
    switch (event.type) {
      case "order.paid":
        await handleOrderPaid(event.data.object);
        break;

      case "charge.paid":
        await handleChargePaid(event.data.object);
        break;

      case "order.pending_payment":
        await handleOrderPending(event.data.object);
        break;

      case "order.expired":
        await handleOrderExpired(event.data.object);
        break;

      default:
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    // Marcar webhook como procesado
    await prisma.webhook.updateMany({
      where: {
        source: "conekta",
        payload: {
          path: ["id"],
          equals: event.id
        }
      },
      data: { processed: true }
    });

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error("Conekta webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed", details: error.message },
      { status: 500 }
    );
  }
}

// Handler para orden pagada (evento principal)
async function handleOrderPaid(orderData: any) {
  const courseId = orderData.metadata?.courseId;
  const customerEmail = orderData.metadata?.customerEmail;

  if (!courseId || !customerEmail) {
    console.error("Missing metadata in order:", orderData.id);
    return;
  }

  // Buscar o crear usuario
  let user = await prisma.user.findUnique({
    where: { email: customerEmail }
  });

  if (!user) {
    // Crear usuario si no existe
    user = await prisma.user.create({
      data: {
        email: customerEmail,
        name: orderData.customer_info.name,
        role: "USER"
      }
    });
  }

  // Actualizar orden a PAID
  await prisma.order.updateMany({
    where: { conektaOrderId: orderData.id },
    data: {
      status: "PAID",
      userId: user.id
    }
  });

  // Crear o actualizar enrollment
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: courseId
      }
    },
    update: {
      status: "ACTIVE"
    },
    create: {
      userId: user.id,
      courseId: courseId,
      status: "ACTIVE"
    }
  });

  console.log(`✅ Order ${orderData.id} paid - User ${user.email} enrolled in course ${courseId}`);

  // TODO: Enviar email de confirmación
  // await sendPurchaseConfirmation(user.email, courseName);
}

// Handler para cargo exitoso
async function handleChargePaid(chargeData: any) {
  console.log(`✅ Charge ${chargeData.id} paid successfully`);
  // Lógica adicional si es necesario
}

// Handler para pago pendiente (OXXO, SPEI)
async function handleOrderPending(orderData: any) {
  console.log(`⏳ Order ${orderData.id} pending payment`);

  // Actualizar estado a REQUIRES_PAYMENT
  await prisma.order.updateMany({
    where: { conektaOrderId: orderData.id },
    data: { status: "REQUIRES_PAYMENT" }
  });

  // TODO: Enviar email con instrucciones de pago
}

// Handler para orden expirada
async function handleOrderExpired(orderData: any) {
  console.log(`❌ Order ${orderData.id} expired`);

  await prisma.order.updateMany({
    where: { conektaOrderId: orderData.id },
    data: { status: "FAILED" }
  });
}
