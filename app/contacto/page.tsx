"use client";

import type { Metadata } from "next";
import { useState } from "react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setStatus("success");
      setFormData({ name: "", email: "", whatsapp: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage("Hubo un error al enviar el mensaje. Intenta de nuevo.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="section-padding pt-32">
      <div className="container-custom max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          Contacto
        </h1>
        <p className="text-xl text-accent text-center max-w-3xl mx-auto mb-16">
          Elige la forma que prefieras para empezar la conversación.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Email Card */}
          <div className="card text-center">
            <div className="text-5xl mb-4">📧</div>
            <h3 className="text-xl font-bold mb-4">Email</h3>
            <a 
              href="mailto:andrelahud@gmail.com"
              className="text-accent hover:text-white transition-colors break-all"
            >
              andrelahud@gmail.com
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="card text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-4">WhatsApp</h3>
            <a 
              href="https://wa.me/524777068594"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              +52 477-706-8594
            </a>
          </div>

          {/* Calendly Card */}
          <div className="card text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-4">Agenda</h3>
            <a 
              href="https://calendly.com/andre-lahud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Reservar llamada
            </a>
            <p className="text-sm text-accent mt-4">
              (Reemplaza el link de Calendly con tu URL real)
            </p>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            O envíame un mensaje
          </h2>

          {status === "success" && (
            <div className="bg-green-500/20 border border-green-500 text-green-100 px-6 py-4 rounded-xl mb-8">
              ¡Mensaje enviado! Te contactaré pronto.
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-6 py-4 rounded-xl mb-8">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nombre *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+52 123 456 7890"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensaje *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full btn-primary text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Enviando..." : "Enviar mensaje"}
            </button>

            <p className="text-sm text-accent text-center">
              No spam. Usaré tus datos solo para contactarte sobre tu proyecto.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}