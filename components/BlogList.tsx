"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

    if (searchTerm.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (currentFilter) {
      filtered = filtered.filter(post => post.tags.includes(currentFilter));
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, currentFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-12">
      {/* Filters Bar - Improved */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-5 flex items-center gap-2">
            <span className="text-blue-600">📁</span>
            Explorar por categoría
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentFilter("")}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm ${
                currentFilter === ""
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              📚 Todos
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setCurrentFilter(tag)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm ${
                  currentFilter === tag
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search - Improved */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400 text-xl">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Buscar artículos por título, palabra clave o tema..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md"
          />
        </div>

        {/* Results counter */}
        {searchTerm || currentFilter ? (
          <div className="flex items-center justify-between px-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredPosts.length}</span> artículo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={() => {
                setCurrentFilter("");
                setSearchTerm("");
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Limpiar filtros ✕
            </button>
          </div>
        ) : null}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-2xl font-bold text-gray-900 mb-2">No encontramos resultados</p>
          <p className="text-gray-600 mb-6">Intenta con otros términos de búsqueda o categorías</p>
          <button
            onClick={() => {
              setCurrentFilter("");
              setSearchTerm("");
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
          >
            Ver todos los artículos
          </button>
        </div>
      )}

      {/* Blog Grid */}
      {filteredPosts.length > 0 && (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <Link href={`/blog/${post.slug}`} className="block overflow-hidden h-52 bg-gradient-to-br from-blue-50 to-gray-100 relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Category Tag */}
                <div className="mb-4">
                  <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full border border-blue-200">
                    {post.tags[0] || "Blog"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-700 text-base mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-5 pt-4 border-t-2 border-gray-100">
                  <span className="font-medium">📅 {formatDate(post.publishedAt)}</span>
                  <span className="font-medium">⏱️ {post.readTime}</span>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 group/link transition-all shadow-md hover:shadow-lg"
                >
                  Leer artículo completo
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </div>
  );
}