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

interface BlogListProps {
  posts: BlogPost[];
  searchQuery?: string;
  selectedTag?: string;
}

export default function BlogList({ posts, searchQuery = "", selectedTag = "" }: BlogListProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [currentFilter, setCurrentFilter] = useState<string>(selectedTag);
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by tag
    if (currentFilter) {
      filtered = filtered.filter(post => post.tags.includes(currentFilter));
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, currentFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="space-y-12">
      {/* Search and Filters */}
      <div className="card">
        <h3 className="text-xl font-bold mb-6">Buscar contenido</h3>
        
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por título, contenido o tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentFilter("")}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              currentFilter === "" 
                ? "bg-accent text-black" 
                : "bg-white/10 text-accent hover:bg-white/20"
            }`}
          >
            Todos
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setCurrentFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                currentFilter === tag 
                  ? "bg-accent text-black" 
                  : "bg-white/10 text-accent hover:bg-white/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-accent text-sm">
            {filteredPosts.length} {filteredPosts.length === 1 ? "artículo encontrado" : "artículos encontrados"}
            {currentFilter && ` en "${currentFilter}"`}
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Artículos destacados</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="card group hover:scale-105 transition-transform">
                {post.image && (
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-black px-3 py-1 rounded-full text-xs font-bold">
                        Destacado
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-white/10 px-2 py-1 rounded-full text-xs text-accent">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-accent mb-6">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-accent">
                  <div className="flex items-center gap-4">
                    <span>Por {post.author}</span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs text-accent">
                    <span>❤️ {post.likes}</span>
                    <span>👁️ {post.views}</span>
                    <span>💬 {post.commentsCount}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-accent hover:text-white transition-colors font-medium"
                  >
                    Leer más →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">
            {featuredPosts.length > 0 ? "Más artículos" : "Últimos artículos"}
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="card group hover:scale-105 transition-transform">
                {post.image && (
                  <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="bg-white/10 px-2 py-1 rounded-full text-xs text-accent">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs text-accent">+{post.tags.length - 2}</span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-accent text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="text-xs text-accent mb-4">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-3 text-xs text-accent">
                    <span>❤️ {post.likes}</span>
                    <span>👁️ {post.views}</span>
                    <span>💬 {post.commentsCount}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-accent hover:text-white transition-colors text-sm font-medium"
                  >
                    Leer →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-4">No se encontraron artículos</h3>
          <p className="text-accent mb-6">
            Intenta cambiar los filtros o búsqueda para encontrar contenido.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setCurrentFilter("");
            }}
            className="btn-primary"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}