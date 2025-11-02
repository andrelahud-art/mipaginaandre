"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadedAt: string;
  category: string;
}

export default function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([
    {
      id: "1",
      name: "hero-image.jpg",
      url: "/hero-linkedin.jpg",
      type: "image",
      size: 245000,
      uploadedAt: "2024-11-20T10:00:00Z",
      category: "hero"
    },
    {
      id: "2", 
      name: "profile-photo.jpg",
      url: "/hero-linkedin.jpg",
      type: "image",
      size: 156000,
      uploadedAt: "2024-11-19T15:30:00Z",
      category: "profile"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: "all", name: "Todos", icon: "📁" },
    { id: "hero", name: "Hero Images", icon: "🖼️" },
    { id: "profile", name: "Perfil", icon: "👤" },
    { id: "blog", name: "Blog", icon: "📝" },
    { id: "services", name: "Servicios", icon: "🛠️" },
    { id: "cases", name: "Casos", icon: "📊" }
  ];

  const filteredFiles = selectedCategory === "all" 
    ? files 
    : files.filter(file => file.category === selectedCategory);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (uploadedFiles: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    Array.from(uploadedFiles).forEach((file, index) => {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            
            // Add file to list
            const newFile: MediaFile = {
              id: Date.now().toString() + index,
              name: file.name,
              url: URL.createObjectURL(file),
              type: file.type.startsWith('image/') ? 'image' : 'document',
              size: file.size,
              uploadedAt: new Date().toISOString(),
              category: selectedCategory === "all" ? "blog" : selectedCategory
            };
            
            setFiles(prev => [newFile, ...prev]);
            
            if (index === uploadedFiles.length - 1) {
              setIsUploading(false);
              setUploadProgress(0);
            }
            
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const deleteFile = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
      setFiles(prev => prev.filter(file => file.id !== id));
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('✅ URL copiada al portapapeles');
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Medios</h1>
          <p className="text-gray-600">Sube, organiza y gestiona tus imágenes y archivos</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          📤 Subir Archivos
        </button>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 mb-8 text-center transition-colors ${
          dragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          className="hidden"
        />
        
        {isUploading ? (
          <div>
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-lg font-medium">Subiendo archivos...</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-4">📁</div>
            <p className="text-lg font-medium mb-2">
              Arrastra archivos aquí o haz clic para seleccionar
            </p>
            <p className="text-sm text-gray-500">
              Soporta: JPG, PNG, GIF, MP4, PDF, DOC (máx. 10MB)
            </p>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="flex space-x-2 mb-8 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredFiles.map((file) => (
          <div key={file.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            {file.type === 'image' ? (
              <div className="relative h-40 w-full">
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            ) : (
              <div className="h-40 bg-gray-100 rounded-t-lg flex items-center justify-center">
                <span className="text-4xl">📄</span>
              </div>
            )}
            
            <div className="p-4">
              <h3 className="font-medium text-sm truncate mb-2">{file.name}</h3>
              <p className="text-xs text-gray-500 mb-3">
                {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => copyUrl(file.url)}
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-200"
                >
                  📋 Copiar URL
                </button>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay archivos en esta categoría
          </h3>
          <p className="text-gray-500">
            Sube algunos archivos para comenzar
          </p>
        </div>
      )}

      {/* Usage Stats */}
      <div className="mt-12 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">Estadísticas de Uso</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{files.length}</p>
            <p className="text-sm text-gray-500">Archivos Totales</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">
              {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
            </p>
            <p className="text-sm text-gray-500">Espacio Usado</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">
              {files.filter(f => f.type === 'image').length}
            </p>
            <p className="text-sm text-gray-500">Imágenes</p>
          </div>
        </div>
      </div>
    </div>
  );
}