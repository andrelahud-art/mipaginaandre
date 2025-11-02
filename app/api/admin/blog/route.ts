import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_POSTS_FILE = path.join(process.cwd(), 'data/blog-posts.json');

function ensureDataDirectory() {
  const dataDir = path.dirname(BLOG_POSTS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readBlogPosts() {
  ensureDataDirectory();
  try {
    if (!fs.existsSync(BLOG_POSTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(BLOG_POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

function writeBlogPosts(posts: any[]) {
  ensureDataDirectory();
  try {
    fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing blog posts:', error);
    return false;
  }
}

// GET - Obtener todos los posts
export async function GET() {
  try {
    const posts = readBlogPosts();
    
    // Calcular estadísticas
    const stats = {
      totalPosts: posts.length,
      featuredPosts: posts.filter((p: any) => p.featured).length,
      totalViews: posts.reduce((sum: number, p: any) => sum + (p.views || 0), 0),
      totalLikes: posts.reduce((sum: number, p: any) => sum + (p.likes || 0), 0),
      totalComments: posts.reduce((sum: number, p: any) => sum + (p.commentsCount || 0), 0),
      recentPosts: posts
        .sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 5)
    };

    return NextResponse.json({ 
      posts: posts.sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
      stats 
    });
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return NextResponse.json({ error: 'Error al obtener los posts' }, { status: 500 });
  }
}

// POST - Crear nuevo post
export async function POST(request: NextRequest) {
  try {
    const newPost = await request.json();
    
    // Validar campos requeridos
    if (!newPost.title || !newPost.content) {
      return NextResponse.json({ error: 'Título y contenido son obligatorios' }, { status: 400 });
    }

    const posts = readBlogPosts();
    
    // Crear el post con valores por defecto
    const post = {
      id: newPost.id || Date.now().toString(),
      title: newPost.title,
      slug: newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: newPost.excerpt || '',
      content: newPost.content,
      author: newPost.author || 'André Lahud',
      tags: newPost.tags || [],
      readTime: newPost.readTime || '5 min',
      featured: newPost.featured || false,
      image: newPost.image || '',
      publishedAt: newPost.publishedAt || new Date().toISOString(),
      likes: 0,
      views: 0,
      commentsCount: 0
    };

    posts.push(post);
    
    if (writeBlogPosts(posts)) {
      return NextResponse.json({ message: 'Post creado exitosamente', post });
    } else {
      return NextResponse.json({ error: 'Error al guardar el post' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Error al crear el post' }, { status: 500 });
  }
}

// PUT - Actualizar post existente
export async function PUT(request: NextRequest) {
  try {
    const updatedPost = await request.json();
    
    if (!updatedPost.id) {
      return NextResponse.json({ error: 'ID del post es obligatorio' }, { status: 400 });
    }

    const posts = readBlogPosts();
    const postIndex = posts.findIndex((p: any) => p.id === updatedPost.id);
    
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
    }

    // Mantener estadísticas existentes
    const existingPost = posts[postIndex];
    posts[postIndex] = {
      ...updatedPost,
      likes: existingPost.likes,
      views: existingPost.views,
      commentsCount: existingPost.commentsCount,
      publishedAt: existingPost.publishedAt
    };

    if (writeBlogPosts(posts)) {
      return NextResponse.json({ message: 'Post actualizado exitosamente', post: posts[postIndex] });
    } else {
      return NextResponse.json({ error: 'Error al actualizar el post' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Error al actualizar el post' }, { status: 500 });
  }
}

// DELETE - Eliminar post
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID del post es obligatorio' }, { status: 400 });
    }

    const posts = readBlogPosts();
    const filteredPosts = posts.filter((p: any) => p.id !== id);
    
    if (filteredPosts.length === posts.length) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
    }

    if (writeBlogPosts(filteredPosts)) {
      return NextResponse.json({ message: 'Post eliminado exitosamente' });
    } else {
      return NextResponse.json({ error: 'Error al eliminar el post' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Error al eliminar el post' }, { status: 500 });
  }
}