# André Lahud - Sitio Web Oficial

Sitio web profesional construido con Next.js 14, Tailwind CSS y MDX.

## 🚀 Inicio Rápido

### Instalación
```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.local.example .env.local
# Edita .env.local con tus valores reales
```

### Desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de Producción
```bash
npm run build
npm start
```

## 📦 Deploy en Vercel

### Opción 1: Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Inicializar Git (si no lo has hecho)
git init
git add .
git commit -m "Initial commit"

# Deploy
vercel

# Para producción
vercel --prod
```

### Opción 2: GitHub + Vercel Dashboard

1. Sube el proyecto a GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/andre-lahud.git
git push -u origin main
```

2. Ve a [vercel.com](https://vercel.com)
3. Importa el repositorio
4. Configura las variables de entorno en el dashboard
5. Deploy automático

### Variables de Entorno en Vercel

En el dashboard de Vercel, añade:
```
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_tu_key_real
CONTACT_TO_EMAIL=contacto@andre-ops.com
```

## 📁 Estructura del Proyecto
```
├── app/              # Páginas y rutas (App Router)
├── components/       # Componentes reutilizables
├── content/          # Posts MDX
├── data/             # Archivos JSON
├── lib/              # Utilidades
└── public/           # Assets estáticos
```

## ✅ Checklist de Configuración

- [ ] Reemplazar `/public/hero-linkedin.jpg` con imagen real
- [ ] Reemplazar logos en `/public/logos/` con versiones reales
- [ ] Configurar API key de Resend en `.env.local`
- [ ] Actualizar URL de Calendly en `/contacto`
- [ ] Configurar Google Analytics ID
- [ ] Verificar dominio personalizado en Vercel

## 🛠️ Tecnologías

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- MDX
- TypeScript
- Resend (emails)
- Vercel Analytics

## 📈 Performance

El sitio está optimizado para:
- Lighthouse Score ≥ 95
- Core Web Vitals óptimos
- SEO completo
- Imágenes optimizadas
- Fuentes precargadas

## 📝 Agregar Nuevo Post

1. Crea archivo `.mdx` en `/content/insights/`
2. Añade frontmatter:
```yaml
---
title: "Título del Post"
date: "2025-01-20"
excerpt: "Descripción breve"
tags: ["Tag1", "Tag2"]
---
```
3. Escribe contenido en Markdown
4. El post aparecerá automáticamente en `/insights`

## 🤝 Soporte

Para dudas o problemas:
- Email: a00573316@itesm.mx
- WhatsApp: +52 477-706-8594