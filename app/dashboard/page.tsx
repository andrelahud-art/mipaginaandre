import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // Obtener enrollments del usuario
  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: session.user.id
    },
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
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  // Obtener progreso de cada curso
  const coursesWithProgress = await Promise.all(
    enrollments.map(async (enrollment) => {
      const totalLessons = enrollment.course.modules.reduce(
        (sum, m) => sum + m.lessons.length,
        0
      );

      const completedLessons = await prisma.progress.count({
        where: {
          userId: session.user.id,
          lesson: {
            module: {
              courseId: enrollment.course.id
            }
          },
          completed: true
        }
      });

      const progressPercentage = totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

      return {
        ...enrollment,
        totalLessons,
        completedLessons,
        progressPercentage
      };
    })
  );

  // Obtener certificados
  const certificates = await prisma.certificate.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      course: true
    },
    orderBy: {
      issuedAt: "desc"
    }
  });

  // Obtener badges
  const userBadges = await prisma.userBadge.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      badge: true
    },
    orderBy: {
      awardedAt: "desc"
    }
  });

  // Obtener todos los cursos disponibles
  const allCourses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED"
    },
    orderBy: {
      level: "asc"
    }
  });

  return (
    <DashboardClient
      user={session.user}
      enrollments={coursesWithProgress}
      certificates={certificates}
      badges={userBadges}
      allCourses={allCourses}
    />
  );
}
