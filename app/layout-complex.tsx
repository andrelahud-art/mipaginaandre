import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({ 
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "André Lahud | Estrategia, IA y Creación de Valor",
  description: "Diseño e implemento estrategia e IA aplicada para crear valor real: más velocidad operativa, más ventas, menos fricción.",
  keywords: ["estrategia digital", "inteligencia artificial", "transformación digital", "IA para pymes", "consultor de negocios"],
  authors: [{ name: "André Lahud" }],
  creator: "André Lahud",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://andre-lahud.com",
    siteName: "André Lahud",
    title: "André Lahud | Estrategia, IA y Creación de Valor",
    description: "Diseño e implemento estrategia e IA aplicada para crear valor real: más velocidad operativa, más ventas, menos fricción.",
    images: [
      {
        url: "/hero-linkedin.jpg",
        width: 1200,
        height: 630,
        alt: "André Lahud - Estrategia, IA y Creación de Valor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "André Lahud | Estrategia, IA y Creación de Valor",
    description: "Diseño e implemento estrategia e IA aplicada para crear valor real: más velocidad operativa, más ventas, menos fricción.",
    images: ["/hero-linkedin.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* WhatsApp Floating Button */}
        <a 
          href="https://wa.me/524777068594" 
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
        >
          <svg viewBox="0 0 32 32" fill="currentColor" width="30" height="30">
            <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.253 1.408 1.417-5.263-0.321-0.525c-1.331-2.191-2.032-4.706-2.032-7.258 0-7.72 6.28-14 14-14s14 6.28 14 14-6.28 14-14 14zM23.165 19.503c-0.202-0.101-1.197-0.588-1.382-0.655-0.185-0.067-0.319-0.101-0.454 0.101s-0.522 0.655-0.64 0.789c-0.118 0.135-0.236 0.152-0.438 0.051-1.197-0.597-1.982-1.064-2.771-2.413-0.208-0.354 0.208-0.329 0.596-1.096 0.065-0.135 0.032-0.253-0.017-0.354-0.049-0.101-0.454-1.096-0.622-1.5-0.163-0.392-0.329-0.339-0.454-0.345-0.118-0.006-0.253-0.007-0.387-0.007s-0.354 0.051-0.539 0.253c-0.185 0.202-0.706 0.689-0.706 1.683s0.723 1.952 0.824 2.086c0.101 0.135 1.426 2.179 3.456 3.055 1.285 0.555 1.789 0.596 2.431 0.505 0.388-0.056 1.197-0.489 1.366-0.961s0.169-0.877 0.118-0.961c-0.049-0.085-0.185-0.135-0.387-0.236z"></path>
          </svg>
        </a>
        
        <Script src="https://cdn.vercel-insights.com/v1/script.debug.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}