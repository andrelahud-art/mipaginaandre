"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  if (pathname?.startsWith("/emprendedor")) {
    return null;
  }
  const dark = pathname === "/" || pathname.startsWith("/servicios") || pathname.startsWith("/herramientas") || pathname.startsWith("/emprendedor");

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "¿El cómo?" },
    { href: "/sobre-mi", label: "Sobre Mí" },
    { href: "/contacto", label: "Hablemos", highlighted: true },
    { href: "/emprendedor", label: "¿Eres Emprendedor?", featured: true },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 w-full backdrop-blur-sm z-50 transition-all duration-300",
        dark
          ? "bg-black/60 border-b border-white/10"
          : "bg-white/95 border-b border-gray-200/50"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className={clsx(
              "text-2xl font-bold transition-colors",
              dark ? "text-white hover:text-blue-300" : "text-gray-900 hover:text-accent"
            )}
          >
            André Ops
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("/emprendedor") ? "_blank" : undefined}
                rel={link.href.startsWith("/emprendedor") ? "noopener noreferrer" : undefined}
                className={clsx(
                  "transition-all duration-300",
                  link.highlighted
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-105"
                    : link.featured
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105 animate-pulse"
                    : dark
                    ? pathname === link.href
                      ? "text-blue-300 font-semibold"
                      : "text-gray-200 hover:text-blue-300"
                    : pathname === link.href
                    ? "text-accent font-semibold"
                    : "text-gray-700 hover:text-accent"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={clsx("md:hidden p-2", dark ? "text-white" : "text-gray-900")}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={clsx(
              "md:hidden py-4 border-t",
              dark ? "bg-black/80 border-white/10" : "bg-white border-gray-200/50"
            )}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("/emprendedor") ? "_blank" : undefined}
                rel={link.href.startsWith("/emprendedor") ? "noopener noreferrer" : undefined}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "block py-3 transition-all duration-300",
                  link.highlighted
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-full text-center my-2 mx-4"
                    : link.featured
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold px-6 py-2.5 rounded-full text-center my-2 mx-4"
                    : dark
                    ? pathname === link.href
                      ? "text-blue-300 font-semibold"
                      : "text-gray-200 hover:text-blue-300"
                    : pathname === link.href
                    ? "text-accent font-semibold"
                    : "text-gray-700 hover:text-accent"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}