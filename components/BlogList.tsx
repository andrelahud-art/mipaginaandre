"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedElement } from "./AnimatedElement";

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
      month: "long",
      day: "numeric"
    });
  };

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="space-y-12">
      {/* Search and Filters */}
      <AnimatedElement className="card">
        <h3 className="text-xl font-bold mb-6 text-dark">Buscar contenido</h3>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por título, contenido o tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-form"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentFilter("")}
            className={`tag-filter ${
              currentFilter === "" 
                ? "active" 
                : ""
            }`}
          >
            Todos
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setCurrentFilter(tag)}
              className={`tag-filter ${
                currentFilter === tag 
                  ? "active" 
                  : ""
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </AnimatedElement>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8 text-dark">Destacados</h2>
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredPosts.map((post, index) => (
              <AnimatedElement key={post.id} delay={index * 0.1}>
                <article className="card-blog group">
                  <Link href={`/blog/${post.slug}`} className="block mb-4 overflow-hidden rounded-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-dark group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="text-xs text-gray-500">
                    <span>{post.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </article>
              </AnimatedElement>
            ))}
          </motion.div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8 text-dark">Más artículos</h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {regularPosts.map((post, index) => (
              <AnimatedElement key={post.id} delay={index * 0.1}>
                <article className="card-blog group">
                  <Link href={`/blog/${post.slug}`} className="block mb-4 overflow-hidden rounded-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-dark group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="text-xs text-gray-500">
                    <span>{post.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </article>
              </AnimatedElement>
            ))}
          </motion.div>
        </section>
      )}

      {filteredPosts.length === 0 && (
        <AnimatedElement className="text-center py-16">
          <p className="text-xl text-gray-500">No se encontraron artículos con esos criterios.</p>
        </AnimatedElement>
      )}
    </div>
  );
}