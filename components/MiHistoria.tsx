'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Target, Zap, BookOpen, Lightbulb, Rocket, Brain, TrendingUp, Users, Award } from 'lucide-react';

export default function MiHistoria() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const beliefs = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Estrategia antes que herramientas",
      description: "La tecnología sin rumbo es ruido. Primero claridad, luego ejecución."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "IA como potenciador, no como reemplazo",
      description: "Uso la inteligencia artificial para amplificar capacidades humanas, no para sustituir criterio."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Resultados sobre procesos",
      description: "Mido por valor generado, no por horas invertidas."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Velocidad con fundamento",
      description: "Actuar rápido con información precisa. Sin parálisis por análisis ni improvisación ciega."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Transferencia de conocimiento",
      description: "No creo dependencia. Empodero equipos para que continúen evolucionando sin mí."
    }
  ];

  const specialties = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Estrategia de Negocio",
      items: ["Modelos de negocio", "Posicionamiento competitivo", "Roadmaps ejecutables", "KPIs y métricas de valor"]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "IA Aplicada",
      items: ["Automatización inteligente", "Personalización de experiencias", "Análisis predictivo", "Implementación práctica"]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Consultoría de Transformación",
      items: ["Diagnóstico integral", "Implementación de cambios", "Gestión de proyectos tech", "Optimización de procesos"]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Formación Ejecutiva",
      items: ["Programas personalizados", "Capacitación de equipos", "Talleres de IA práctica", "Mentoría estratégica"]
    }
  ];

  const skills = [
    "Estrategia de Negocio", "Business Model Canvas", "OKRs", "Design Thinking",
    "ChatGPT & IA Generativa", "Automatización con Make/Zapier", "CRMs Inteligentes",
    "Google Analytics 4", "Python", "SQL", "Power BI", "Tableau",
    "E-commerce", "Shopify", "WooCommerce", "Marketing Digital",
    "SEO/SEM", "Growth Marketing", "Formación Corporativa", "Facilitación"
  ];

  const timeline = [
    {
      year: "1️⃣",
      title: "Inicié mi camino emprendedor a los 14 años.",
      description: "Empecé fabricando y vendiendo marquesitas artesanales premium, descubriendo desde temprano el valor del producto, la marca y la experiencia del cliente."
    },
    {
      year: "2️⃣",
      title: "Gestioné alojamientos con visión empresarial.",
      description: "Administré varios espacios tipo Airbnb, optimizando ocupación, atención y flujo operativo con resultados que superaban los ingresos esperados para mi edad."
    },
    {
      year: "3️⃣",
      title: "Aprendí a liderar operaciones reales.",
      description: "A esa edad, ya entendía lo que pocos jóvenes comprenden: cómo equilibrar ingresos, gastos y crecimiento sin perder calidad ni enfoque."
    },
    {
      year: "4️⃣",
      title: "Fundé mi primer negocio digital: “Todo Para Tu Familia”.",
      description: "Transformé una idea en un e-commerce rentable, aplicando estrategia, reinversión y control financiero hasta alcanzar operaciones automatizadas y escalables."
    },
    {
      year: "5️⃣",
      title: "Me certifiqué como agente de seguros.",
      description: "Esa etapa me enseñó a vender valor y confianza, desarrollando habilidades de comunicación, negociación y análisis de riesgo."
    },
    {
      year: "6️⃣",
      title: "Exploré la tecnología aplicada al entorno real.",
      description: "Lancé un negocio de instalación de cámaras y automatización, uniendo visión técnica con ejecución precisa y servicio personalizado."
    },
    {
      year: "7️⃣",
      title: "Construí “André Finances”.",
      description: "Desarrollé mi propio sistema de gestión financiera digital, diseñado para monitorear activos, deudas y flujo de efectivo con tecnología moderna."
    },
    {
      year: "8️⃣",
      title: "Cree un modelo de IA aplicada a negocios.",
      description: "Diseñé e impartí capacitaciones prácticas que ayudan a empresarios y profesionales a usar inteligencia artificial para vender, comunicar y optimizar procesos."
    },
    {
      year: "9️⃣",
      title: "Amplié mi visión con experiencias internacionales.",
      description: "Participé en programas, viajes y colaboraciones que me permitieron entender el negocio desde una mirada global: cómo piensan, ejecutan y escalan los líderes fuera de México."
    },
    {
      year: "🔟",
      title: "Consolidé mi propósito profesional.",
      description: "Hoy, mi enfoque es claro: diseñar estrategias que generen resultados reales, combinando pensamiento empresarial, finanzas y tecnología con impacto humano."
    }
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container-custom py-20 md:py-32 relative z-10">
        {/* Hero Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">Mi Historia</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Soy André Lahud
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed"
          >
            Pongo la estrategia y la inteligencia artificial al servicio del negocio. 
            Sin tecnología vacía, sin consultoría de PowerPoint, sin promesas abstractas. 
            <span className="text-white font-semibold"> Solo herramientas prácticas que generan resultados medibles.</span>
          </motion.p>
        </motion.div>

        {/* Non-Negotiable Beliefs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Mis Principios <span className="text-blue-400">No Negociables</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((belief, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="bg-blue-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                  {belief.icon}
                </div>
                <h4 className="text-lg font-bold mb-2">{belief.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{belief.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline - Mi Trayectoria */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Mi <span className="text-purple-400">Trayectoria</span>
          </h3>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-3">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>
                </div>
                
                <div className="hidden md:block relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 border-gray-900"
                  />
                </div>
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Work Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Cómo <span className="text-blue-400">Trabajo</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                phase: "01",
                title: "Claridad Estratégica",
                description: "Diagnóstico sin filtros. Identifico qué frena y qué impulsa. Definimos objetivos claros, KPIs medibles y un roadmap accionable.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                phase: "02",
                title: "Arquitectura de Ejecución",
                description: "Diseño y piloto de soluciones prácticas. Implementamos herramientas (IA, automatización, análisis) con pruebas reales y ajustes rápidos.",
                color: "from-purple-500 to-pink-500"
              },
              {
                phase: "03",
                title: "Escalabilidad Inteligente",
                description: "Despliegue completo con optimización continua. Capacito equipos, transfiero conocimiento y garantizo autonomía sostenible.",
                color: "from-pink-500 to-orange-500"
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <div className={`text-6xl font-bold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent mb-4`}>
                    {phase.phase}
                  </div>
                  <h4 className="text-xl font-bold mb-4">{phase.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Specialties Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Mis <span className="text-purple-400">Especialidades</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                  {specialty.icon}
                </div>
                <h4 className="text-lg font-bold mb-4">{specialty.title}</h4>
                <ul className="space-y-2">
                  {specialty.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Herramientas y <span className="text-blue-400">Habilidades</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Value Proposition - Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 text-center">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-6"
            >
              <Award className="w-16 h-16 text-yellow-400" />
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Mi Propuesta de <span className="text-blue-400">Valor</span>
            </h3>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Combino <span className="text-white font-semibold">pensamiento estratégico</span>, 
              <span className="text-white font-semibold"> visión financiera</span> y 
              <span className="text-white font-semibold"> dominio tecnológico</span>. 
              No soy solo consultor ni solo técnico. Soy el puente entre la visión del negocio 
              y la ejecución con herramientas de vanguardia.
            </p>
            
            <motion.a
              href="/contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              Trabajemos Juntos
              <Rocket className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
