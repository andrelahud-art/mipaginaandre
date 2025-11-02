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
      {/* Filters Bar */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">Filtrar por categoría</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentFilter("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currentFilter === ""
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos los artículos
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setCurrentFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentFilter === tag
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Buscar por título o palabra clave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No encontramos artículos con esos filtros.</p>
          <button
            onClick={() => {
              setCurrentFilter("");
              setSearchTerm("");
            }}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Limpiar filtros
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
              className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container */}
              <Link href={`/blog/${post.slug}`} className="block overflow-hidden h-48 bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                {/* Category Tag */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 rounded-full">
                    {post.tags[0] || "Blog"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-4 border-t border-gray-100">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 group/link transition-all"
                >
                  Leer más
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </div>
  );
}