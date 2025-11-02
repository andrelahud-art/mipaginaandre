import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll"; // Importar SmoothScroll
import "./globals.css";

// Fuentes "Apple": Inter para el cuerpo, Poppins para cabeceras
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"], // Más pesos para profesionalismo
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "André Ops | Estrategia • IA • Creación de Valor",
  description: "Diseño e implemento estrategia e IA aplicada para crear valor real: más velocidad operativa, más ventas, menos fricción.",
  // Establece metadataBase para resolver correctamente Open Graph y Twitter images en build
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      {/* Cambiamos a modo claro (bg-white text-gray-900)
        y aplicamos la fuente 'Inter' (font-sans) por defecto 
      */}
      <body className="font-sans bg-white text-gray-900 antialiased">
        {/* Envolvemos el contenido con SmoothScroll */}
        <SmoothScroll>
          <Navbar />
          {/* <main> ya tiene pt-20 de globals.css, lo cual es correcto */}
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        
        {/* WhatsApp Floating Button */}
        <a 
          href="https://wa.me/524777068594" 
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
        >
          💬
        </a>
      </body>
    </html>
  );
}
