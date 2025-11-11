import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Empezando seed...');

  // Limpiar datos existentes (opcional, comentar si no quieres)
  // await prisma.userBadge.deleteMany();
  // await prisma.progress.deleteMany();
  // await prisma.certificate.deleteMany();
  // await prisma.enrollment.deleteMany();
  // await prisma.order.deleteMany();
  // await prisma.lesson.deleteMany();
  // await prisma.module.deleteMany();
  // await prisma.activity.deleteMany();
  // await prisma.product.deleteMany();
  // await prisma.sessionOffer.deleteMany();
  // await prisma.course.deleteMany();
  // await prisma.badge.deleteMany();

  // ============================================
  // INSIGNIAS (BADGES)
  // ============================================
  console.log('📛 Creando badges...');

  const badges = await Promise.all([
    prisma.badge.upsert({
      where: { slug: 'tomaste-accion' },
      update: {},
      create: {
        slug: 'tomaste-accion',
        title: 'Tomaste Acción',
        description: 'Completaste tu primera venta en menos de 72 horas',
        icon: '⚡'
      }
    }),
    prisma.badge.upsert({
      where: { slug: 'primer-flujo' },
      update: {},
      create: {
        slug: 'primer-flujo',
        title: 'Primer Flujo',
        description: 'Implementaste tu sistema de flujo semanal',
        icon: '🎯'
      }
    }),
    prisma.badge.upsert({
      where: { slug: 'playbook-listo' },
      update: {},
      create: {
        slug: 'playbook-listo',
        title: 'Playbook Listo',
        description: 'Completaste tu playbook operativo profesional',
        icon: '📊'
      }
    }),
    prisma.badge.upsert({
      where: { slug: 'pitch-presentado' },
      update: {},
      create: {
        slug: 'pitch-presentado',
        title: 'Pitch Presentado',
        description: 'Creaste y presentaste tu pitch deck',
        icon: '🚀'
      }
    })
  ]);

  console.log(`✅ Creados ${badges.length} badges`);

  // ============================================
  // CURSO 1: DESPIERTA, CABRÓN
  // ============================================
  console.log('\n📚 Creando Curso 1: Despierta, cabrón...');

  const course1 = await prisma.course.upsert({
    where: { slug: 'despierta' },
    update: {},
    create: {
      slug: 'despierta',
      title: 'Despierta, cabrón',
      subtitle: 'Rompe la flojera, actúa hoy',
      level: 1,
      priceCents: 0,
      currency: 'MXN',
      status: 'PUBLISHED',
      heroImageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=400&fit=crop',
      valueProps: [
        '5 videos cortos (3-6 min)',
        'Reto: Vende algo en 72 horas',
        'Checklist de acción diaria',
        'Insignia "Tomaste Acción"'
      ]
    }
  });

  await prisma.module.createMany({
    data: [
      {
        courseId: course1.id,
        index: 1,
        title: 'Por qué no avanzas (y no es lo que crees)',
        durationMinutes: 8,
        isFreePreview: true
      },
      {
        courseId: course1.id,
        index: 2,
        title: 'Tu primera venta en 72 horas',
        durationMinutes: 11,
        isFreePreview: true
      },
      {
        courseId: course1.id,
        index: 3,
        title: 'Mentalidad de acción diaria',
        durationMinutes: 4,
        isFreePreview: true
      }
    ]
  });

  const modules1 = await prisma.module.findMany({
    where: { courseId: course1.id },
    orderBy: { index: 'asc' }
  });

  await prisma.lesson.createMany({
    data: [
      // Módulo 1
      {
        moduleId: modules1[0].id,
        index: 1,
        title: 'El enemigo no es el dinero, es la indefinición',
        description: 'Por qué la mayoría de emprendedores fallan antes de empezar',
        videoUrl: 'https://example.com/video1.mp4'
      },
      {
        moduleId: modules1[0].id,
        index: 2,
        title: 'Cómo el perfeccionismo te está matando',
        description: 'El ciclo vicioso de "todavía no estoy listo"',
        videoUrl: 'https://example.com/video2.mp4'
      },
      // Módulo 2
      {
        moduleId: modules1[1].id,
        index: 1,
        title: 'Identifica qué puedes vender YA (sin producto terminado)',
        description: 'El método de preventa que funciona',
        videoUrl: 'https://example.com/video3.mp4'
      },
      {
        moduleId: modules1[1].id,
        index: 2,
        title: 'Cómo hacer que alguien te pague antes de crear',
        description: 'Validación real con dinero real',
        videoUrl: 'https://example.com/video4.mp4'
      },
      // Módulo 3
      {
        moduleId: modules1[2].id,
        index: 1,
        title: 'El hábito de los 10 minutos productivos',
        description: 'Construye momentum sin quemar tu vida',
        videoUrl: 'https://example.com/video5.mp4'
      }
    ]
  });

  await prisma.activity.create({
    data: {
      courseId: course1.id,
      title: 'Reto: Vende algo en 72 horas',
      description: 'Demuestra que puedes generar tu primera venta. Sube evidencia (captura, link, testimonio).',
      type: 'UPLOAD',
      config: {
        maxFileSize: 10485760,
        acceptedFormats: ['image/jpeg', 'image/png', 'application/pdf']
      }
    }
  });

  console.log(`✅ Curso 1 creado con ${modules1.length} módulos`);

  // ============================================
  // CURSO 2: ORDENA TU DESMADRE
  // ============================================
  console.log('\n📚 Creando Curso 2: Ordena tu desmadre...');

  const course2 = await prisma.course.upsert({
    where: { slug: 'ordena-tu-desmadre' },
    update: {},
    create: {
      slug: 'ordena-tu-desmadre',
      title: 'Ordena tu desmadre',
      subtitle: 'Del caos al flujo real',
      level: 2,
      priceCents: 999,
      currency: 'MXN',
      status: 'PUBLISHED',
      heroImageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop',
      valueProps: [
        '5 módulos: flujo, dinero, reputación',
        'Plantillas descargables',
        'Checklist de preventa',
        'Cupón -20% al siguiente nivel'
      ]
    }
  });

  await prisma.product.create({
    data: {
      courseId: course2.id,
      stripePriceId: 'price_XXXXXXXX' // Reemplazar con ID real de Stripe
    }
  });

  const modules2Data = [
    { title: 'Flujo de trabajo que no te esclaviza', duration: 12 },
    { title: 'Control de dinero sin contador', duration: 13 },
    { title: 'Reputación y confianza', duration: 7 }
  ];

  for (let i = 0; i < modules2Data.length; i++) {
    await prisma.module.create({
      data: {
        courseId: course2.id,
        index: i + 1,
        ...modules2Data[i],
        durationMinutes: modules2Data[i].duration,
        isFreePreview: false
      }
    });
  }

  console.log(`✅ Curso 2 creado`);

  // ============================================
  // CURSO 3: PIENSA COMO ESTRATEGA
  // ============================================
  console.log('\n📚 Creando Curso 3: Piensa como estratega...');

  const course3 = await prisma.course.upsert({
    where: { slug: 'piensa-como-estratega' },
    update: {},
    create: {
      slug: 'piensa-como-estratega',
      title: 'Piensa como estratega',
      subtitle: 'Profesionaliza y sube márgenes',
      level: 3,
      priceCents: 3999,
      currency: 'MXN',
      status: 'PUBLISHED',
      heroImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop',
      valueProps: [
        '5 videos: sistemas, márgenes, negociación',
        '1 sesión estratégica de 20 min',
        'Playbook operativo profesional',
        'Comunidad privada'
      ]
    }
  });

  await prisma.product.create({
    data: {
      courseId: course3.id,
      stripePriceId: 'price_YYYYYYYY' // Reemplazar con ID real de Stripe
    }
  });

  await prisma.sessionOffer.create({
    data: {
      courseId: course3.id,
      tier: 3,
      minutes: 20,
      count: 1
    }
  });

  console.log(`✅ Curso 3 creado`);

  // ============================================
  // CURSO 4: MULTIPLICA TU NEGOCIO
  // ============================================
  console.log('\n📚 Creando Curso 4: Multiplica tu negocio...');

  const course4 = await prisma.course.upsert({
    where: { slug: 'multiplica-tu-negocio' },
    update: {},
    create: {
      slug: 'multiplica-tu-negocio',
      title: 'Multiplica tu negocio',
      subtitle: 'Financia, escala y lidera',
      level: 4,
      priceCents: 19900,
      currency: 'MXN',
      status: 'PUBLISHED',
      heroImageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=400&fit=crop',
      valueProps: [
        '5 videos: liderazgo, financiamiento, legal',
        '4 sesiones de 60 min con mentoría',
        'Conexión con inversionistas',
        'Plantilla de pitch + contratos'
      ]
    }
  });

  await prisma.product.create({
    data: {
      courseId: course4.id,
      stripePriceId: 'price_ZZZZZZZZ' // Reemplazar con ID real de Stripe
    }
  });

  await prisma.sessionOffer.create({
    data: {
      courseId: course4.id,
      tier: 4,
      minutes: 60,
      count: 4
    }
  });

  console.log(`✅ Curso 4 creado`);

  // ============================================
  // INVERSIONISTAS EJEMPLO
  // ============================================
  console.log('\n💼 Creando inversionistas...');

  await prisma.investor.createMany({
    data: [
      {
        name: 'ALLVP',
        thesis: 'Early stage tech startups en LATAM. Fintech, SaaS, Marketplace.',
        ticketMin: 500000,
        contactEmail: 'contact@allvp.vc',
        isActive: true
      },
      {
        name: 'Mountain Nazca',
        thesis: 'Series A-B en LATAM. E-commerce, EdTech, HealthTech.',
        ticketMin: 2000000,
        contactEmail: 'info@mountainnazca.com',
        isActive: true
      }
    ]
  });

  console.log('✅ Inversionistas creados');

  console.log('\n✨ Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
