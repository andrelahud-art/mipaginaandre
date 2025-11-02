import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostDetail from "@/components/BlogPostDetail";

export const dynamic = "force-static";
export const dynamicParams = true;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  likes: number;
  views: number;
  commentsCount: number;
  image: string;
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  likes: number;
  parentCommentId?: string;
  replies?: Comment[];
}

async function getBlogPost(slug: string): Promise<{ post: BlogPost | null, comments: Comment[] }> {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Get posts
    const postsPath = path.join(process.cwd(), 'data/blog-posts.json');
    const postsData = fs.readFileSync(postsPath, 'utf8');
    const posts = JSON.parse(postsData);
    
    // Get comments
    const commentsPath = path.join(process.cwd(), 'data/blog-comments.json');
    const commentsData = fs.readFileSync(commentsPath, 'utf8');
    const allComments = JSON.parse(commentsData);
    
    // Find the post
    const post = posts.find((p: BlogPost) => p.slug === slug);
    
    if (!post) {
      return { post: null, comments: [] };
    }
    
    // Filter comments for this post
    const postComments = allComments.filter(
      (comment: Comment) => comment.postId === post.id && !comment.parentCommentId
    );
    
    // Sort comments by creation date (newest first)
    postComments.sort((a: Comment, b: Comment) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Sort replies within each comment
    postComments.forEach((comment: Comment) => {
      if (comment.replies) {
        comment.replies.sort((a: Comment, b: Comment) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    });
    
    return { post, comments: postComments };
    
  } catch (error) {
    console.error('Error loading blog post:', error);
    return { post: null, comments: [] };
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { post } = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: "Post no encontrado | André Lahud",
      description: "El artículo que buscas no existe o ha sido movido."
    };
  }
  
  return {
    title: `${post.title} | André Lahud`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      ...(post.image && { images: [post.image] })
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.image && { images: [post.image] })
    }
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const fs = require('fs');
    const path = require('path');
    const postsPath = path.join(process.cwd(), 'data', 'blog-posts.json');
    
    if (!fs.existsSync(postsPath)) {
      console.warn('blog-posts.json not found at:', postsPath);
      // Return at least one blog post for initial build
      return [
        { slug: 'automatizacion-ia-estrategia' },
        { slug: 'analisis-datos-decisiones-estrategicas' },
        { slug: 'business-model-canvas-era-ia' },
        { slug: 'ia-generativa-empresas-implementacion-real' },
        { slug: 'marketing-predictivo-ia-casos-uso' },
        { slug: 'sistemas-inteligentes-pymes-procesos' },
        { slug: 'startup-scaleup-framework-tecnologia' }
      ];
    }
    
    const data = fs.readFileSync(postsPath, 'utf8');
    const posts = JSON.parse(data);
    
    if (!Array.isArray(posts) || posts.length === 0) {
      console.warn('No blog posts found in blog-posts.json');
      return [];
    }
    
    return posts.map((post: BlogPost) => ({
      slug: post.slug || post.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return empty array is safer than throwing during build
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { post, comments } = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return <BlogPostDetail post={post} comments={comments} />;
}