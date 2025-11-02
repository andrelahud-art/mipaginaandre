"use client";

import { useState, useEffect } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  price: string;
  duration: string;
  category: string;
  featured: boolean;
  order: number;
}

export default function ServicesEditor() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load services from API
    fetch('/api/admin/services')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.services);
        }
      });
  }, []);

  const saveService = async (service: Service) => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        const data = await response.json();
        if (editingService) {
          setServices(prev => prev.map(s => s.id === service.id ? service : s));
        } else {
          setServices(prev => [...prev, data.service]);
        }
        setIsModalOpen(false);
        setEditingService(null);
        alert('✅ Servicio guardado exitosamente');
      }
    } catch (error) {
      alert('❌ Error al guardar el servicio');
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este servicio?')) return;

    try {
      const response = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServices(prev => prev.filter(s => s.id !== id));
        alert('✅ Servicio eliminado exitosamente');
      }
    } catch (error) {
      alert('❌ Error al eliminar el servicio');
    }
  };

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
    } else {
      setEditingService({
        id: Date.now().toString(),
        title: '',
        description: '',
        features: [''],
        icon: '🛠️',
        price: '',
        duration: '',
        category: 'consultoria',
        featured: false,
        order: services.length + 1
      });
    }
    setIsModalOpen(true);
  };

  const moveService = (id: string, direction: 'up' | 'down') => {
    const serviceIndex = services.findIndex(s => s.id === id);
    if (
      (direction === 'up' && serviceIndex === 0) ||
      (direction === 'down' && serviceIndex === services.length - 1)
    ) return;

    const newServices = [...services];
    const targetIndex = direction === 'up' ? serviceIndex - 1 : serviceIndex + 1;
    
    // Swap services
    [newServices[serviceIndex], newServices[targetIndex]] = 
    [newServices[targetIndex], newServices[serviceIndex]];
    
    // Update order numbers
    newServices.forEach((service, index) => {
      service.order = index + 1;
    });

    setServices(newServices);
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Servicios</h1>
          <p className="text-gray-600">Administra tu portafolio de servicios</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          ➕ Nuevo Servicio
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={service.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{service.icon}</span>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  {service.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      ⭐ Destacado
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Precio:</span>
                    <p className="font-semibold">{service.price}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Duración:</span>
                    <p className="font-semibold">{service.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Categoría:</span>
                    <p className="font-semibold capitalize">{service.category}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Orden:</span>
                    <p className="font-semibold">#{service.order}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Características:</span>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => moveService(service.id, 'up')}
                  disabled={index === 0}
                  className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  ⬆️
                </button>
                <button
                  onClick={() => moveService(service.id, 'down')}
                  disabled={index === services.length - 1}
                  className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  ⬇️
                </button>
                <button
                  onClick={() => openModal(service)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay servicios registrados
          </h3>
          <p className="text-gray-500 mb-6">
            Crea tu primer servicio para comenzar
          </p>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ Crear Primer Servicio
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingService && (
        <ServiceModal
          service={editingService}
          onSave={saveService}
          onClose={() => {
            setIsModalOpen(false);
            setEditingService(null);
          }}
        />
      )}
    </div>
  );
}

interface ServiceModalProps {
  service: Service;
  onSave: (service: Service) => void;
  onClose: () => void;
}

function ServiceModal({ service, onSave, onClose }: ServiceModalProps) {
  const [formData, setFormData] = useState<Service>(service);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, idx) => 
        idx === index ? value : feature
      )
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== index)
    }));
  };

  const icons = ['🛠️', '📊', '🎯', '🚀', '💡', '⚡', '🔧', '📈', '💼', '🌟'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            {service.title ? 'Editar Servicio' : 'Nuevo Servicio'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Servicio
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icono
              </label>
              <div className="flex gap-2 flex-wrap">
                {icons.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                    className={`p-2 text-2xl rounded border-2 ${
                      formData.icon === icon ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Desde $5,000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="2-4 semanas"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="consultoria">Consultoría</option>
                <option value="implementacion">Implementación</option>
                <option value="analisis">Análisis</option>
                <option value="formacion">Formación</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Características
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                ➕ Agregar
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Característica del servicio..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-800 px-3"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
              Marcar como destacado
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              💾 Guardar Servicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}