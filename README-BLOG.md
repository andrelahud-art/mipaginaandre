# André Lahud - Website Profesional

## 🚀 Descripción del Proyecto

Website profesional desarrollado con Next.js 14 para André Lahud, especialista en **Estrategia, IA y Creación de Valor**. El sitio incluye un sistema completo de blog interactivo para generar engagement orgánico y posicionarse como líder de pensamiento.

## ✨ Características Principales

### 🎯 Website Corporativo
- **Página de inicio** con hero section optimizado
- **Sobre mí** - Biografía y propuesta de valor
- **Servicios** - Portafolio de consultoría
- **Casos de estudio** - Proyectos exitosos
- **Contacto** - Formulario con integración Resend

### 📝 Sistema de Blog Interactivo
- **Lista de artículos** con filtros y búsqueda
- **Posts individuales** con lectura optimizada
- **Sistema de comentarios** con respuestas anidadas
- **Sistema de likes** para engagement
- **Contador de vistas** automático
- **Tags y categorización** de contenido
- **Newsletter signup** integrado

### 🎨 Diseño y UX
- **Responsive design** mobile-first
- **Dark theme** profesional
- **Animaciones suaves** y microinteracciones
- **SEO optimizado** con metadata dinámica
- **Loading states** y estados de error
- **Accesibilidad** mejorada

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 14** - App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Utility-first CSS
- **React Server Components** - Rendizado en servidor

### Backend y APIs
- **Next.js API Routes** - Endpoints REST
- **File-based data storage** - JSON files
- **Resend API** - Envío de emails

### Herramientas
- **ESLint & Prettier** - Code quality
- **Sitemap automático** - SEO
- **Robots.txt** - Search indexing

## 📁 Estructura del Proyecto

```
├── app/                    # App Router de Next.js 14
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx          # Página de inicio
│   ├── globals.css       # Estilos globales
│   ├── api/              # API Routes
│   │   ├── blog/
│   │   │   ├── posts/    # CRUD de posts
│   │   │   ├── comment/  # Sistema de comentarios
│   │   │   └── like/     # Sistema de likes
│   │   └── contact/      # Formulario de contacto
│   ├── blog/             # Sistema de blog
│   │   ├── page.tsx      # Lista de posts
│   │   └── [slug]/       # Posts individuales
│   ├── servicios/        # Páginas del sitio
│   ├── casos/
│   ├── sobre-mi/
│   ├── contacto/
│   ├── sitemap.ts        # SEO Sitemap
│   └── robots.ts         # SEO Robots
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx        # Navegación principal
│   ├── Footer.tsx        # Footer del sitio
│   ├── BlogList.tsx      # Lista de posts con filtros
│   ├── BlogPostDetail.tsx # Post individual + comentarios
│   ├── CardServicio.tsx  # Cards de servicios
│   └── ...
├── data/                 # Almacenamiento de datos
│   ├── blog-posts.json   # Posts del blog
│   ├── blog-comments.json # Comentarios y respuestas
│   ├── blog-likes.json   # Sistema de likes
│   ├── servicios.json    # Datos de servicios
│   └── casos.json        # Casos de estudio
└── public/              # Assets estáticos
    ├── logos/           # Logos de clientes
    └── blog/           # Imágenes del blog
```

## 🎯 Funcionalidades del Blog

### Para Lectores
- **Búsqueda inteligente** por título, contenido y tags
- **Filtrado por categorías** (IA, Estrategia, Datos, etc.)
- **Sistema de likes** para contenido favorito
- **Comentarios interactivos** con respuestas
- **Newsletter signup** para suscripciones
- **Tiempo de lectura estimado**
- **Contadores de engagement** (vistas, likes, comentarios)

### Para André (Admin)
- **Gestión de contenido** via JSON files
- **APIs REST** para operaciones CRUD
- **Métricas de engagement** en tiempo real
- **SEO automático** con metadata dinámica
- **Sitemap dinámico** actualizado automáticamente

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Configuración
```bash
# Clonar el repositorio
git clone [repo-url]

# Cambiar al directorio (sin espacios en el nombre)
cd andre-lahud-website

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Agregar RESEND_API_KEY para emails

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

## 📊 Sistema de Datos

### Blog Posts (`data/blog-posts.json`)
```json
{
  "id": "unique-id",
  "title": "Título del Post",
  "slug": "titulo-del-post",
  "excerpt": "Resumen breve...",
  "content": "Contenido completo...",
  "author": "André Lahud",
  "publishedAt": "2024-11-23T10:00:00.000Z",
  "tags": ["IA", "Estrategia"],
  "readTime": "5 min",
  "featured": true,
  "likes": 15,
  "views": 234,
  "commentsCount": 8,
  "image": "url-imagen"
}
```

### Comentarios (`data/blog-comments.json`)
```json
{
  "id": "comment-id",
  "postId": "post-id",
  "author": "Nombre Usuario",
  "email": "email@ejemplo.com",
  "content": "Comentario...",
  "createdAt": "2024-11-23T10:30:00.000Z",
  "likes": 3,
  "parentCommentId": null,
  "replies": [...]
}
```

## 🎨 Sistema de Diseño

### Colores
- **Primary**: `#0B1426` (Dark blue)
- **Accent**: `#64FFDA` (Teal)
- **Text**: `#FFFFFF` (White)
- **Text Secondary**: `#B0BEC5` (Light gray)

### Componentes Clave
- **Card**: `.card` - Container base con glassmorphism
- **Buttons**: `.btn-primary`, `.btn-secondary`
- **Layout**: `.container-custom`, `.section-padding`

## 🔧 APIs Disponibles

### Blog Posts
- `GET /api/blog/posts` - Lista todos los posts
- `GET /api/blog/posts?slug=post-slug` - Post específico
- `POST /api/blog/posts` - Incrementar vistas

### Comentarios
- `GET /api/blog/comment?postId=id` - Comentarios de un post
- `POST /api/blog/comment` - Crear comentario

### Likes
- `GET /api/blog/like?postId=id` - Estado de like
- `POST /api/blog/like` - Toggle like/unlike

### Contacto
- `POST /api/contact` - Enviar formulario de contacto

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Conectar con Vercel
npx vercel

# Configurar variables de entorno:
# - RESEND_API_KEY
# - NEXT_PUBLIC_GA_ID (opcional)
```

### Variables de Entorno
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📈 SEO y Performance

### Optimizaciones Implementadas
- **Metadata dinámica** para cada página y post
- **Open Graph** tags para redes sociales
- **Sitemap automático** actualizado dinámicamente
- **Robots.txt** optimizado para indexación
- **Imágenes optimizadas** con Next.js Image
- **Server-side rendering** para mejor SEO
- **Structured data** para artículos

### Métricas Clave
- **Time to First Byte (TTFB)** < 500ms
- **First Contentful Paint (FCP)** < 1.5s
- **Cumulative Layout Shift (CLS)** < 0.1
- **Largest Contentful Paint (LCP)** < 2.5s

## 🎯 Estrategia de Contenido

### Temas Principales
1. **Inteligencia Artificial** - Implementación práctica en empresas
2. **Estrategia Digital** - Frameworks y metodologías
3. **Análisis de Datos** - Toma de decisiones basada en datos
4. **Automatización** - Optimización de procesos
5. **Transformación Digital** - Casos de éxito y guías

### Tipos de Contenido
- **Análisis profundos** (8-12 min lectura)
- **Guías prácticas** (5-8 min lectura)
- **Case studies** (10-15 min lectura)
- **Insights rápidos** (3-5 min lectura)

---

**🎉 ¡Sistema de blog completamente funcional!**

Tu website ahora incluye:
✅ Blog interactivo con comentarios y likes
✅ Búsqueda y filtros avanzados
✅ APIs REST completas
✅ SEO optimizado
✅ Newsletter integration
✅ Responsive design
✅ Métricas de engagement

**Próximos pasos recomendados:**
1. Cambiar nombre de carpeta (quitar espacio)
2. Configurar Resend API key
3. Subir contenido real del blog
4. Optimizar imágenes
5. Deploy a Vercel

**¡Listo para generar tráfico orgánico y engagement! 🚀**