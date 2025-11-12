"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface ConektaCheckoutButtonProps {
  courseSlug: string;
  courseTitle: string;
  price: string;
  priceCents: number;
}

export default function ConektaCheckoutButton({
  courseSlug,
  courseTitle,
  price,
  priceCents
}: ConektaCheckoutButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = () => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/emprendedor/${courseSlug}`);
      return;
    }
    setShowModal(true);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout-conekta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          courseSlug,
          customerInfo: {
            name: session?.user?.name,
            email: session?.user?.email,
            userId: session?.user?.id
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear checkout");
      }

      // Redirigir al checkout hospedado de Conekta
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }

    } catch (err: any) {
      setError(err.message || "Error al procesar el pago");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={status === "loading"}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Cargando..." : `Comprar por ${price}`}
      </button>

      {/* Modal */}
      {showModal && session && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-8 relative">
            {/* Botón cerrar */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Contenido */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Finalizar compra</h3>
              <p className="text-white/60">{courseTitle}</p>
              <p className="text-3xl font-bold mt-4 text-blue-400">{price}</p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Comprador
                </label>
                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/80">
                  <p className="font-medium">{session.user.name}</p>
                  <p className="text-sm text-white/60">{session.user.email}</p>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? "Procesando..." : "Continuar al pago"}
              </button>

              <p className="text-xs text-white/40 text-center">
                Serás redirigido a Conekta para completar el pago de forma segura
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
