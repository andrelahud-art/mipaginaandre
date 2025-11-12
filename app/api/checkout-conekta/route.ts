import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import conekta from "@/lib/conekta";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug, customerInfo } = await req.json();

    // Usar datos de la sesión
    const name = customerInfo?.name || session.user.name;
    const email = customerInfo?.email || session.user.email;
    const userId = session.user.id;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nombre y email son requeridos" },
        { status: 400 }
      );
    }

    // Buscar el curso
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
      include: { products: true }
    });

    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    // El curso gratuito no necesita pago
    if (course.priceCents === 0) {
      return NextResponse.json(
        { error: "Este curso es gratuito" },
        { status: 400 }
      );
    }

    // Crear orden en Conekta
    const orderData = {
      currency: course.currency.toLowerCase(), // "mxn"
      customer_info: {
        name: name,
        email: email,
        phone: customerInfo?.phone || "+5200000000"
      },
      line_items: [
        {
          name: course.title,
          description: course.subtitle || course.title,
          unit_price: course.priceCents, // en centavos
          quantity: 1
        }
      ],
      charges: [
        {
          payment_method: {
            type: "card" // También soporta: "oxxo_cash", "spei"
          }
        }
      ],
      checkout: {
        allowed_payment_methods: ["card", "cash", "bank_transfer"],
        type: "HostedPayment",
        success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/emprendedor/success?course=${course.slug}`,
        failure_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/emprendedor/${course.slug}?error=1`
      },
      metadata: {
        courseId: course.id,
        courseSlug: course.slug,
        customerEmail: email,
        userId: userId
      }
    };

    // Crear orden en Conekta
    const conektaOrder = await conekta.Order.create(orderData);

    // Guardar orden en base de datos
    await prisma.order.create({
      data: {
        userId: userId,
        courseId: course.id,
        conektaOrderId: conektaOrder.id,
        status: "REQUIRES_PAYMENT",
        amountCents: course.priceCents,
        currency: course.currency
      }
    });

    // Retornar URL del checkout hospedado
    return NextResponse.json({
      success: true,
      checkoutUrl: conektaOrder.checkout.url,
      orderId: conektaOrder.id
    });

  } catch (error: any) {
    console.error("Conekta checkout error:", error);

    return NextResponse.json(
      {
        error: "Error al crear checkout",
        details: error.message || error.details?.[0]?.message
      },
      { status: 500 }
    );
  }
}
