import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validaciones
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER"
      }
    });

    // Inscribir automáticamente en el curso gratuito
    const freeCourse = await prisma.course.findFirst({
      where: { priceCents: 0 }
    });

    if (freeCourse) {
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId: freeCourse.id,
          status: "ACTIVE"
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: "Usuario registrado exitosamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error al registrar usuario", details: error.message },
      { status: 500 }
    );
  }
}
