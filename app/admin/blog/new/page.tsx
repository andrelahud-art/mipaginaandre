"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  image: string;
}

export default function NewBlogPost() {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "André Lahud",
    tags: [],
    readTime: "5 min",
    featured: false,
    image: ""
  });

  const [currentTag, setCurrentTag] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setPost(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !post.tags.includes(currentTag.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload - in real app, upload to cloud storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setPost(prev => ({ ...prev, image: imageUrl }));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const insertContentBlock = (type: string) => {
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
    
    setPost(prev => ({
      ...prev,
      content: prev.content + blockContent
    }));
  };

  const savePost = async () => {
    if (!post.title || !post.content) {
      alert("⚠️ Título y contenido son obligatorios");
      return;
    }

    try {
      const postData = {
        ...post,
        id: Date.now().toString(),
        publishedAt: new Date().toISOString(),
        likes: 0,
        views: 0,
        commentsCount: 0
      };

      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('✅ Artículo publicado exitosamente');
        router.push('/admin/blog');
      } else {
        alert('❌ Error al publicar el artículo');
      }
    } catch (error) {
      alert('❌ Error al publicar el artículo');
    }
  };

  const saveDraft = async () => {
    try {
      const draftData = { ...post, status: 'draft' };
      localStorage.setItem('blog-draft', JSON.stringify(draftData));
      alert('✅ Borrador guardado localmente');
    } catch (error) {
      alert('❌ Error al guardar borrador');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nuevo Artículo</h1>
          <p className="text-gray-600">Crea y publica un nuevo post en tu blog</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={saveDraft}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            💾 Guardar Borrador
          </button>
          <button
            onClick={savePost}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            🚀 Publicar Artículo
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
                      URL: /blog/{post.slug || "titulo-del-articulo"}
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
                      onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
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
                      onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                      rows={20}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                    <div className="text-xs text-gray-500 mt-2">
                      💡 Tip: Usa Markdown para formato. Ej: **negrita**, *cursiva*, ## Títulos
                    </div>
                  </div>
                </div>
              ) : (
                /* Preview */
                <div className="prose prose-lg max-w-none">
                  <h1>{post.title || "Título del artículo"}</h1>
                  <p className="text-lg text-gray-600">
                    {post.excerpt || "Resumen del artículo..."}
                  </p>
                  <div className="whitespace-pre-wrap">
                    {post.content || "Contenido del artículo..."}
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
                  onChange={(e) => setPost(prev => ({ ...prev, author: e.target.value }))}
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
                  onChange={(e) => setPost(prev => ({ ...prev, readTime: e.target.value }))}
                  placeholder="5 min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={post.featured}
                  onChange={(e) => setPost(prev => ({ ...prev, featured: e.target.checked }))}
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
                <Image
                  src={post.image}
                  alt="Imagen destacada"
                  width={500}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setPost(prev => ({ ...prev, image: "" }))}
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