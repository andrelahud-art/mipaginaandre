"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

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

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function BlogPostDetail({ post, comments }: BlogPostProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [newComment, setNewComment] = useState({ author: "", email: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract headings for table of contents
  const headings: Heading[] = [];
  post.content.split('\n').forEach((line, index) => {
    if (line.startsWith('## ')) {
      headings.push({ id: `heading-${index}`, text: line.slice(3), level: 2 });
    } else if (line.startsWith('### ')) {
      headings.push({ id: `heading-${index}`, text: line.slice(4), level: 3 });
    }
  });

  // Reading progress tracker
  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
      setShowScrollTop(scrolled > 400);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  // Render content with proper formatting
  const renderContent = () => {
    let headingIndex = 0;
    const lines = post.content.split('\n');
    const elements: React.ReactElement[] = [];
    let inList = false;
    let listItems: React.ReactElement[] = [];

    const flushList = (currentIndex: number) => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${currentIndex}`} className="my-6 space-y-3">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((paragraph, index) => {
      // H2 headings
      if (paragraph.startsWith('## ')) {
        flushList(index);
        const headingId = `heading-${headingIndex++}`;
        elements.push(
          <h2
            key={index}
            id={headingId}
            className="text-3xl md:text-4xl font-bold mt-16 mb-6 text-gray-900 scroll-mt-24 border-l-4 border-blue-600 pl-6 bg-gradient-to-r from-blue-50 to-transparent py-4 rounded-r-lg"
          >
            {paragraph.slice(3)}
          </h2>
        );
        return;
      }

      // H3 headings
      if (paragraph.startsWith('### ')) {
        flushList(index);
        const headingId = `heading-${headingIndex++}`;
        elements.push(
          <h3
            key={index}
            id={headingId}
            className="text-2xl md:text-3xl font-bold mt-12 mb-5 text-gray-800 scroll-mt-24 flex items-center gap-3"
          >
            <span className="text-blue-600 text-2xl">▸</span>
            {paragraph.slice(4)}
          </h3>
        );
        return;
      }

      // H4 headings (####)
      if (paragraph.startsWith('#### ')) {
        flushList(index);
        elements.push(
          <h4
            key={index}
            className="text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-700"
          >
            {paragraph.slice(5)}
          </h4>
        );
        return;
      }

      // Bold paragraphs (important callouts)
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        flushList(index);
        elements.push(
          <div key={index} className="my-8 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 rounded-r-xl shadow-md">
            <p className="font-bold text-xl text-gray-900 leading-relaxed">
              ⚠️ {paragraph.slice(2, -2)}
            </p>
          </div>
        );
        return;
      }

      // Blockquotes (lines starting with ">")
      if (paragraph.startsWith('> ')) {
        flushList(index);
        elements.push(
          <div key={index} className="my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl shadow-lg">
            <p className="text-lg text-gray-800 italic leading-relaxed flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <span>{paragraph.slice(2)}</span>
            </p>
          </div>
        );
        return;
      }

      // Code blocks (lines starting with ```)
      if (paragraph.startsWith('```')) {
        flushList(index);
        elements.push(
          <div key={index} className="my-8 p-6 bg-gray-900 rounded-xl shadow-xl">
            <pre className="text-sm text-green-400 font-mono overflow-x-auto">
              <code>{paragraph.slice(3)}</code>
            </pre>
          </div>
        );
        return;
      }

      // Special markers for emphasis (starts with ❌ or ✅)
      if (paragraph.startsWith('❌ ') || paragraph.startsWith('✅ ')) {
        flushList(index);
        const isError = paragraph.startsWith('❌');
        elements.push(
          <div key={index} className={`my-4 p-4 rounded-lg border-2 ${isError ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
            <p className="text-base text-gray-800 font-medium leading-relaxed">
              {paragraph}
            </p>
          </div>
        );
        return;
      }

      // List items
      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        inList = true;
        listItems.push(
          <li key={index} className="flex items-start gap-3 text-lg text-gray-700 leading-relaxed">
            <span className="text-blue-600 font-bold mt-1 flex-shrink-0">•</span>
            <span>{paragraph.slice(2)}</span>
          </li>
        );
        return;
      }

      // Empty lines
      if (paragraph.trim() === '') {
        flushList(index);
        elements.push(<div key={index} className="h-4" />);
        return;
      }

      // Regular paragraphs
      flushList(index);

      // Check if it contains inline bold **text**
      const boldPattern = /\*\*(.+?)\*\*/g;
      if (boldPattern.test(paragraph)) {
        const parts = paragraph.split(boldPattern);
        elements.push(
          <p key={index} className="mb-6 text-lg text-gray-700 leading-relaxed">
            {parts.map((part, i) =>
              i % 2 === 0 ? part : <strong key={i} className="font-bold text-gray-900">{part}</strong>
            )}
          </p>
        );
      } else {
        elements.push(
          <p key={index} className="mb-6 text-lg text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        );
      }
    });

    flushList(lines.length);
    return elements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-110 z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      <article className="pt-32 pb-20">
        <div className="container-custom max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Table of Contents - Sidebar */}
            {headings.length > 0 && (
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-32">
                  <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
                      <span>📋</span>
                      Contenido
                    </h4>
                    <nav className="space-y-2">
                      {headings.map((heading) => (
                        <button
                          key={heading.id}
                          onClick={() => scrollToHeading(heading.id)}
                          className={`block w-full text-left text-sm transition-all duration-200 ${
                            heading.level === 2
                              ? 'font-semibold text-gray-900 hover:text-blue-600 pl-0'
                              : 'text-gray-600 hover:text-blue-600 pl-4'
                          } hover:translate-x-1`}
                        >
                          {heading.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>
            )}

            {/* Main Content */}
            <div className={headings.length > 0 ? "lg:col-span-9" : "lg:col-span-12"}>
              {/* Breadcrumb */}
              <div className="mb-8">
                <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium transition-colors inline-flex items-center gap-2">
                  <span>←</span>
                  <span>Volver al Blog</span>
                </Link>
              </div>

              {/* Header */}
              <header className="mb-12 bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-xl">
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-4 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 rounded-full text-sm font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm mb-8 pb-8 border-b-2 border-gray-100">
                  <div className="flex items-center gap-2 font-medium">
                    <span>✍️</span>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <span>📅</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <span>⏱️</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <span>👁️</span>
                    <span>{post.views} vistas</span>
                  </div>
                </div>

                {/* Featured Image */}
                {post.image && (
                  <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
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
              <div
                ref={contentRef}
                className="prose prose-lg max-w-none mb-12 bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-xl"
              >
                {renderContent()}
              </div>

              {/* Engagement Actions */}
              <div className="flex flex-wrap items-center gap-4 py-8 mb-12 bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg ${
                    liked
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white scale-105"
                      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300"
                  }`}
                >
                  <span className="text-2xl">{liked ? "❤️" : "🤍"}</span>
                  <span>{likesCount} Me gusta</span>
                </button>

                <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg">
                  <span className="text-xl">📤</span>
                  <span>Compartir</span>
                </button>
              </div>

              {/* Comments Section */}
              <section className="mt-16">
                <h3 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                  <span>💬</span>
                  Comentarios ({comments.length})
                </h3>

                {/* Comment Form */}
                <form onSubmit={handleSubmitComment} className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-12 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-gray-900">Deja tu comentario</h4>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={newComment.author}
                      onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                      className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-gray-900"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Tu email"
                      value={newComment.email}
                      onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                      className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-gray-900"
                      required
                    />
                  </div>

                  <textarea
                    placeholder="Escribe tu comentario..."
                    value={newComment.content}
                    onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none mb-4 text-gray-900"
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? "Enviando..." : "Publicar comentario"}
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h5 className="font-bold text-gray-900 text-lg">{comment.author}</h5>
                          <p className="text-gray-500 text-sm">{formatDate(comment.createdAt)}</p>
                        </div>
                        <button className="text-gray-600 hover:text-red-500 transition-colors">
                          <span className="text-lg">❤️ {comment.likes}</span>
                        </button>
                      </div>

                      <p className="text-gray-700 mb-4 text-lg leading-relaxed">{comment.content}</p>

                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-8 pt-4 border-t-2 border-gray-100 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h6 className="font-semibold text-gray-900">{reply.author}</h6>
                                  <p className="text-gray-500 text-xs">{formatDate(reply.createdAt!)}</p>
                                </div>
                                <span className="text-sm text-gray-600">❤️ {reply.likes}</span>
                              </div>
                              <p className="text-gray-700">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div className="mt-16 pt-12 border-t-2 border-gray-200">
                <div className="bg-gradient-to-br from-[#1e3a5f] via-[#1a4d5c] to-[#0f5257] rounded-3xl p-12 text-white shadow-2xl">
                  <div className="text-center max-w-3xl mx-auto">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                      ¿Quieres aplicar esto en tu empresa?
                    </h3>
                    <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                      Agenda una <span className="text-yellow-400 font-bold">cita estratégica</span> y diseñamos tu plan personalizado.
                      15 minutos que pueden transformar tu negocio.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link
                        href="/contacto"
                        className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-yellow-500/50 transition-all hover:scale-105 flex items-center gap-3"
                      >
                        <span className="text-xl">📅</span>
                        <span>Agenda tu diagnóstico</span>
                      </Link>
                      <Link
                        href="/blog"
                        className="text-white border-2 border-white/30 font-medium px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
                      >
                        Ver más artículos
                      </Link>
                    </div>
                    <p className="mt-6 text-sm text-gray-300">
                      🎯 Sin compromiso · ✅ Diagnóstico inicial gratis · 💡 Recomendaciones accionables
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
