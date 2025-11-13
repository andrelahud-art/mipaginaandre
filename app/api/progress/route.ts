import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lessonId, completed } = await req.json();

    if (!lessonId) {
      return NextResponse.json(
        { error: "lessonId es requerido" },
        { status: 400 }
      );
    }

    // Actualizar o crear progreso
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

    // Verificar si el curso está completo
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

    if (!lesson) {
      return NextResponse.json({ progress });
    }

    const totalLessons = lesson.module.course.modules.reduce(
      (sum: number, m) => sum + m.lessons.length,
      0
    );

    const completedLessons = await prisma.progress.count({
      where: {
        userId: session.user.id,
        lesson: {
          module: {
            courseId: lesson.module.course.id
          }
        },
        completed: true
      }
    });

    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
    const isCourseCompleted = completedLessons === totalLessons;

    // Si el curso está completo, generar certificado
    if (isCourseCompleted && completed) {
      const existingCertificate = await prisma.certificate.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId: lesson.module.course.id
          }
        }
      });

      if (!existingCertificate) {
        const certificateCode = `CERT-${lesson.module.course.slug.toUpperCase()}-${Date.now()}`;

        await prisma.certificate.create({
          data: {
            userId: session.user.id,
            courseId: lesson.module.course.id,
            code: certificateCode
          }
        });

        return NextResponse.json({
          progress,
          courseCompleted: true,
          progressPercentage,
          certificateGenerated: true,
          certificateCode
        });
      }
    }

    return NextResponse.json({
      progress,
      courseCompleted: isCourseCompleted,
      progressPercentage
    });

  } catch (error: any) {
    console.error("Progress error:", error);
    return NextResponse.json(
      { error: "Error al actualizar progreso", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "courseId es requerido" },
        { status: 400 }
      );
    }

    // Obtener progreso de todas las lecciones del curso
    const progress = await prisma.progress.findMany({
      where: {
        userId: session.user.id,
        lesson: {
          module: {
            courseId
          }
        }
      },
      include: {
        lesson: {
          include: {
            module: true
          }
        }
      }
    });

    // Calcular porcentaje total
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
    }

    const totalLessons = course.modules.reduce(
      (sum: number, m) => sum + m.lessons.length,
      0
    );

    const completedLessons = progress.filter(p => p.completed).length;
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

    return NextResponse.json({
      progress,
      totalLessons,
      completedLessons,
      progressPercentage
    });

  } catch (error: any) {
    console.error("Get progress error:", error);
    return NextResponse.json(
      { error: "Error al obtener progreso", details: error.message },
      { status: 500 }
    );
  }
}
