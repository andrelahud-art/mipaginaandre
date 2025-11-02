"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin: string;
  location: string;
  avatar: string;
  heroImage: string;
  skills: string[];
  experience: string;
  education: string;
}

export default function ProfileEditor() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "André Lahud",
    title: "Estrategia, IA y Creación de Valor",
    bio: "Especialista en transformación digital con 10+ años ayudando empresas a implementar IA y estrategias de datos para crear ventajas competitivas sostenibles.",
    email: "contacto@andrelahud.com",
    linkedin: "https://linkedin.com/in/andrelahud",
    location: "Ciudad de México, México",
    avatar: "/hero-linkedin.jpg",
    heroImage: "/hero-linkedin.jpg",
    skills: ["Inteligencia Artificial", "Estrategia Digital", "Análisis de Datos", "Automatización", "Transformación Digital"],
    experience: "10+ años en consultoría estratégica",
    education: "MBA en Estrategia Digital"
  });

  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof ProfileData, value: string | string[]) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (field: 'avatar' | 'heroImage') => {
    const input = fileInputRef.current;
    if (!input?.files?.[0]) return;

    setIsUploading(true);
    
    // Simulate upload - in real app, upload to Cloudinary/S3
    const file = input.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      handleInputChange(field, result);
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      // Save to API
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        alert('✅ Perfil guardado exitosamente');
      }
    } catch (error) {
      alert('❌ Error al guardar el perfil');
    }
  };

  const addSkill = () => {
    const newSkill = prompt("Ingresa una nueva habilidad:");
    if (newSkill) {
      handleInputChange('skills', [...profile.skills, newSkill]);
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = profile.skills.filter((_, i) => i !== index);
    handleInputChange('skills', newSkills);
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
          <p className="text-gray-600">Personaliza tu información y presencia en el sitio</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          💾 Guardar Cambios
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'basic', name: 'Información Básica', icon: '👤' },
            { id: 'images', name: 'Imágenes', icon: '📸' },
            { id: 'skills', name: 'Habilidades', icon: '🛠️' },
            { id: 'preview', name: 'Vista Previa', icon: '👁️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Basic Info Tab */}
      {activeTab === 'basic' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">Información Básica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título Profesional
              </label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={profile.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experiencia
              </label>
              <input
                type="text"
                value={profile.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Biografía
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe tu experiencia y especialidades..."
            />
          </div>
        </div>
      )}

      {/* Images Tab */}
      {activeTab === 'images' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">Gestión de Imágenes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Foto de Perfil</h3>
              <div className="relative">
                {profile.avatar && (
                  <div className="w-32 h-32 relative mb-4">
                    <Image
                      src={profile.avatar}
                      alt="Avatar"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={() => handleImageUpload('avatar')}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUploading ? "Subiendo..." : "📸 Cambiar Foto"}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Imagen de Hero</h3>
              <div className="relative">
                {profile.heroImage && (
                  <div className="w-full h-32 relative mb-4">
                    <Image
                      src={profile.heroImage}
                      alt="Hero"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUploading ? "Subiendo..." : "🖼️ Cambiar Hero"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Habilidades y Especialidades</h2>
            <button
              onClick={addSkill}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              ➕ Agregar Habilidad
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
              >
                <span className="font-medium">{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">Vista Previa del Perfil</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="text-center">
              {profile.avatar && (
                <div className="w-24 h-24 relative mx-auto mb-4">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
              <p className="text-xl text-blue-600 mb-4">{profile.title}</p>
              <p className="text-gray-600 mb-6">{profile.bio}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="text-sm text-gray-500">
                <p>📧 {profile.email}</p>
                <p>📍 {profile.location}</p>
                <p>💼 {profile.experience}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}