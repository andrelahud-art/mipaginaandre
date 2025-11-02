"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  image: string;
  publishedAt: string;
  likes: number;
  views: number;
  commentsCount: number;
}

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTag, setCurrentTag] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      const data = await response.json();
      const foundPost = data.posts.find((p: BlogPost) => p.id === postId);
      
      if (foundPost) {
        setPost(foundPost);
      } else {
        alert('❌ Artículo no encontrado');
        router.push('/admin/blog');
      }
    } catch (error) {
      alert('❌ Error al cargar el artículo');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    if (!post) return;
    setPost(prev => prev ? ({
      ...prev,
      title,
      slug: generateSlug(title)
    }) : null);
  };

  const addTag = () => {
    if (!post || !currentTag.trim() || post.tags.includes(currentTag.trim())) return;
    
    setPost(prev => prev ? ({
      ...prev,
      tags: [...prev.tags, currentTag.trim()]
    }) : null);
    setCurrentTag("");
  };

  const removeTag = (tagToRemove: string) => {
    if (!post) return;
    setPost(prev => prev ? ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }) : null);
  };

  const handleImageUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !post) return;

    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setPost(prev => prev ? ({ ...prev, image: imageUrl }) : null);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const insertContentBlock = (type: string) => {
    if (!post) return;
    
    let blockContent = "";
    
    switch (type) {
      case "heading":
        blockContent = "\n\n## Nuevo Título\n\n";
        break;
      case "subheading":
        blockContent = "\n\n### Subtítulo\n\n";
        break;
      case "quote":
        blockContent = "\n\n> Esta es una cita importante que destaca información clave.\n\n";
        break;
      case "list":
        blockContent = "\n\n- Elemento de lista 1\n- Elemento de lista 2\n- Elemento de lista 3\n\n";
        break;
      case "code":
        blockContent = "\n\n```javascript\n// Tu código aquí\nconst ejemplo = 'Hola mundo';\nconsole.log(ejemplo);\n```\n\n";
        break;
      case "separator":
        blockContent = "\n\n---\n\n";
        break;
      case "cta":
        blockContent = "\n\n### ¿Te gustó este artículo?\n\nDescripción del call to action...\n\n[Botón de acción →](mailto:contacto@andrelahud.com)\n\n";
        break;
      case "case-study":
        blockContent = "\n\n### Caso de Estudio: [Nombre]\n\n**Problema:** Descripción del problema\n**Solución:** Cómo se resolvió\n**Resultado:** Impacto obtenido\n\n";
        break;
    }
    
    setPost(prev => prev ? ({
      ...prev,
      content: prev.content + blockContent
    }) : null);
  };

  const updatePost = async () => {
    if (!post || !post.title || !post.content) {
      alert("⚠️ Título y contenido son obligatorios");
      return;
    }

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        alert('✅ Artículo actualizado exitosamente');
        router.push('/admin/blog');
      } else {
        alert('❌ Error al actualizar el artículo');
      }
    } catch (error) {
      alert('❌ Error al actualizar el artículo');
    }
  };

  const deletePost = async () => {
    if (!post) return;
    
    if (!confirm('¿Estás seguro de que quieres eliminar este artículo? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: post.id }),
      });

      if (response.ok) {
        alert('✅ Artículo eliminado exitosamente');
        router.push('/admin/blog');
      } else {
        alert('❌ Error al eliminar el artículo');
      }
    } catch (error) {
      alert('❌ Error al eliminar el artículo');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando artículo...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">Artículo no encontrado</div>
        <button
          onClick={() => router.push('/admin/blog')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Volver al Blog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Artículo</h1>
          <p className="text-gray-600">Editando: {post.title}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={deletePost}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            🗑️ Eliminar
          </button>
          <button
            onClick={() => router.push('/admin/blog')}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            ❌ Cancelar
          </button>
          <button
            onClick={updatePost}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            💾 Guardar Cambios
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab("write")}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === "write"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  ✏️ Escribir
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === "preview"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  👁️ Vista Previa
                </button>
                <button
                  onClick={() => setActiveTab("stats")}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === "stats"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  📊 Estadísticas
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "write" ? (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <input
                      type="text"
                      placeholder="Título del artículo..."
                      value={post.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full text-3xl font-bold border-none outline-none placeholder-gray-400"
                    />
                    <div className="text-sm text-gray-500 mt-2">
                      URL: /blog/{post.slug}
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resumen del artículo
                    </label>
                    <textarea
                      placeholder="Breve descripción que aparecerá en las listas..."
                      value={post.excerpt}
                      onChange={(e) => setPost(prev => prev ? ({ ...prev, excerpt: e.target.value }) : null)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Content Toolbar */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 mb-3">
                      Herramientas de Contenido:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => insertContentBlock("heading")}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                      >
                        📖 Título
                      </button>
                      <button
                        onClick={() => insertContentBlock("subheading")}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                      >
                        📑 Subtítulo
                      </button>
                      <button
                        onClick={() => insertContentBlock("quote")}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                      >
                        💬 Cita
                      </button>
                      <button
                        onClick={() => insertContentBlock("list")}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                      >
                        📝 Lista
                      </button>
                      <button
                        onClick={() => insertContentBlock("code")}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                      >
                        💻 Código
                      </button>
                      <button
                        onClick={() => insertContentBlock("case-study")}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                      >
                        📊 Caso
                      </button>
                      <button
                        onClick={() => insertContentBlock("cta")}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                      >
                        🎯 CTA
                      </button>
                      <button
                        onClick={() => insertContentBlock("separator")}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                      >
                        ➖ Separador
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <textarea
                      placeholder="Escribe tu artículo aquí... Puedes usar Markdown para formato."
                      value={post.content}
                      onChange={(e) => setPost(prev => prev ? ({ ...prev, content: e.target.value }) : null)}
                      rows={20}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                    <div className="text-xs text-gray-500 mt-2">
                      💡 Tip: Usa Markdown para formato. Ej: **negrita**, *cursiva*, ## Títulos
                    </div>
                  </div>
                </div>
              ) : activeTab === "preview" ? (
                /* Preview */
                <div className="prose prose-lg max-w-none">
                  <h1>{post.title}</h1>
                  <p className="text-lg text-gray-600">{post.excerpt}</p>
                  <div className="whitespace-pre-wrap">{post.content}</div>
                </div>
              ) : (
                /* Stats */
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Estadísticas del Artículo</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{post.views}</div>
                      <div className="text-sm text-blue-600">Visualizaciones</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{post.likes}</div>
                      <div className="text-sm text-red-600">Me gusta</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{post.commentsCount}</div>
                      <div className="text-sm text-green-600">Comentarios</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Información de Publicación</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>📅 Publicado: {new Date(post.publishedAt).toLocaleDateString('es-ES')}</div>
                      <div>👤 Autor: {post.author}</div>
                      <div>⏱️ Tiempo de lectura: {post.readTime}</div>
                      <div>⭐ Destacado: {post.featured ? 'Sí' : 'No'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Configuración</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  value={post.author}
                  onChange={(e) => setPost(prev => prev ? ({ ...prev, author: e.target.value }) : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo de lectura
                </label>
                <input
                  type="text"
                  value={post.readTime}
                  onChange={(e) => setPost(prev => prev ? ({ ...prev, readTime: e.target.value }) : null)}
                  placeholder="5 min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={post.featured}
                  onChange={(e) => setPost(prev => prev ? ({ ...prev, featured: e.target.checked }) : null)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Marcar como destacado
                </label>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Imagen Destacada</h3>
            
            {post.image ? (
              <div className="relative">
                <img
                  src={post.image}
                  alt="Imagen destacada"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setPost(prev => prev ? ({ ...prev, image: "" }) : null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  ❌
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="text-gray-400 mb-2">📸</div>
                <p className="text-sm text-gray-500 mb-3">
                  Sube una imagen destacada
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUploading ? "Subiendo..." : "Seleccionar Imagen"}
                </button>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Tags</h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Agregar tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addTag}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  ➕
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ❌
                    </button>
                  </span>
                ))}
              </div>

              <div className="text-xs text-gray-500">
                💡 Sugerencias: IA, Estrategia, Datos, Automatización, Digital
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}