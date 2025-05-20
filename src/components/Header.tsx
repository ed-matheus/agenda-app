"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Serviços", path: "/servicos" },
    { label: "Sobre", path: "/sobre" },
    { label: "Contato", path: "/contato" },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-md py-4 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AgendApp
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex text-gray-700 font-medium gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`hover:text-blue-500 ${
                pathname === item.path ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Botão Agendar Desktop */}
        <Link href="/agendar" className="hidden md:block">
          <button
            type="button"
            className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold"
          >
            Agendar
          </button>
        </Link>

        {/* Ícone do menu mobile */}
        <button
          type="button"
          onClick={toggleMenu}
          className="btn md:hidden text-gray-700 focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile Flutuante */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full z-40 animate-slideDown bg-white/95 backdrop-blur-sm shadow-md px-4 py-4 transition-all duration-300">
          <nav className="flex flex-col gap-4 text-gray-700 font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeMenu}
                className={`hover:text-blue-500 ${
                  pathname === item.path ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link href="/agendar" onClick={closeMenu}>
              <button
                type="button"
                className="w-full mt-2 bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded text-white font-bold"
              >
                Agendar
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
