"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
  replies?: Comment[];
}

interface BlogPostProps {
  post: BlogPost;
  comments: Comment[];
}

export default function BlogPostDetail({ post, comments }: BlogPostProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [newComment, setNewComment] = useState({ author: "", email: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/blog/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id, action: liked ? "unlike" : "like" }),
      });
      
      if (response.ok) {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author || !newComment.email || !newComment.content) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/blog/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          postId: post.id, 
          ...newComment 
        }),
      });
      
      if (response.ok) {
        setNewComment({ author: "", email: "", content: "" });
        // Recargar comentarios
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al enviar comentario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <article className="section-padding pt-32">
      <div className="container-custom max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/blog" className="text-accent hover:text-white transition-colors">
            ← Volver al Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-white/10 px-3 py-1 rounded-full text-xs text-accent">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center justify-between text-accent text-sm mb-6">
            <div className="flex items-center gap-4">
              <span>Por {post.author}</span>
              <span>•</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>•</span>
              <span>{post.readTime} de lectura</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{post.views} vistas</span>
              <span>•</span>
              <span>{post.commentsCount} comentarios</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="relative h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={index} className="text-3xl font-bold mt-12 mb-6">{paragraph.slice(3)}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.slice(4)}</h3>;
            }
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <p key={index} className="font-bold text-lg mb-4">{paragraph.slice(2, -2)}</p>;
            }
            if (paragraph.trim() === '') {
              return <br key={index} />;
            }
            return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
          })}
        </div>

        {/* Engagement Actions */}
        <div className="flex items-center gap-6 py-8 border-t border-b border-white/10">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              liked ? "bg-red-500 text-white" : "bg-white/10 text-accent hover:bg-white/20"
            }`}
          >
            <span className="text-xl">{liked ? "❤️" : "🤍"}</span>
            <span>{likesCount} likes</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-accent hover:bg-white/20 rounded-xl transition-all">
            <span className="text-xl">📤</span>
            <span>Compartir</span>
          </button>
        </div>

        {/* Comments Section */}
        <section className="mt-16">
          <h3 className="text-3xl font-bold mb-8">
            Comentarios ({comments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="card mb-12">
            <h4 className="text-xl font-bold mb-6">Deja un comentario</h4>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Tu nombre"
                value={newComment.author}
                onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Tu email"
                value={newComment.email}
                onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                required
              />
            </div>
            
            <textarea
              placeholder="Escribe tu comentario..."
              value={newComment.content}
              onChange={(e) => setNewComment({...newComment, content: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors resize-none mb-4"
              required
            />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Publicar comentario"}
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-8">
            {comments.map((comment) => (
              <div key={comment.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="font-bold">{comment.author}</h5>
                    <p className="text-accent text-sm">{formatDate(comment.createdAt)}</p>
                  </div>
                  <button className="text-accent hover:text-white transition-colors">
                    <span className="text-sm">❤️ {comment.likes}</span>
                  </button>
                </div>
                
                <p className="text-accent mb-4">{comment.content}</p>
                
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-8 pt-4 border-t border-white/10">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-white/5 p-4 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h6 className="font-semibold text-sm">{reply.author}</h6>
                            <p className="text-accent text-xs">{formatDate(reply.createdAt!)}</p>
                          </div>
                          <span className="text-xs text-accent">❤️ {reply.likes}</span>
                        </div>
                        <p className="text-accent text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <h3 className="text-2xl font-bold mb-4">
            ¿Te gustó este artículo?
          </h3>
          <p className="text-accent mb-6">
            Suscríbete para recibir más contenido como este directo a tu email.
          </p>
          <Link href="/contacto" className="btn-primary">
            Suscribirme al newsletter
          </Link>
        </div>
      </div>
    </article>
  );
}