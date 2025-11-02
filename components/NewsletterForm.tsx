'use client'
import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      // Aquí podrías integrar con tu servicio de newsletter
      // Por ahora simularemos una respuesta exitosa
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form className="flex gap-2 w-full md:w-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full md:w-72 bg-[#0B0B0F] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button 
        type="submit"
        disabled={status === 'loading'}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-sm font-semibold disabled:opacity-50"
      >
        {status === 'loading' ? 'Enviando...' : 'Quiero ideas de IA'}
      </button>
      
      {status === 'success' && (
        <div className="absolute mt-12 p-2 bg-green-800 text-green-100 rounded text-xs">
          ¡Suscrito exitosamente!
        </div>
      )}
      
      {status === 'error' && (
        <div className="absolute mt-12 p-2 bg-red-800 text-red-100 rounded text-xs">
          Error al suscribir
        </div>
      )}
    </form>
  )
}