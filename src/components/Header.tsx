"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, CalendarDays } from "lucide-react";
import Link from "next/link";

// Ícones
import { UserRound } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { label: "Agendamentos", path: "/" },
    { label: "Ajuda", path: "/ajuda" },
  ];

  if (loading) return null;

  return (
    <header className="bg-white shadow-md py-4 relative z-50">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-600">
          AgendApp
        </h2>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex text-gray-700 font-medium gap-10">
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

        {/* Botões Desktop */}
        <div className="flex gap-3">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="hidden lg:block">
                <button
                  type="button"
                  className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold"
                >
                  Entrar
                </button>
              </Link>
              <Link href="/cadastro" className="hidden lg:block">
                <button
                  type="button"
                  className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold"
                >
                  Cadastrar
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/cliente/perfil" className="hidden lg:block">
                <button
                  type="button"
                  className="btn w-40 bg-gray-700 hover:bg-gray-600 py-2 px-4 text-white font-bold flex items-center justify-center gap-1"
                >
                  <UserRound size={22} />
                  Meu Perfil
                </button>
              </Link>
              <Link href={"/agendar"} className="hidden lg:block">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="btn w-40 bg-blue-500 hover:bg-blue-400 py-2 px-4 text-white font-bold flex items-center justify-center gap-1.5"
                >
                  <CalendarDays size={22} />
                  Agendar
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Ícone do menu mobile */}
        <button
          type="button"
          onClick={toggleMenu}
          className="btn lg:hidden text-gray-700 focus:outline-none"
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

            <div className="flex flex-col gap-3">
              {isAuthenticated ? (
                <div className="w-full flex justify-between">
                  <Link href="/perfil">
                    <button
                      type="button"
                      onClick={closeMenu}
                      className="btn w-40 bg-gray-700 hover:bg-gray-600 py-2 px-4 text-white font-bold flex items-center justify-center gap-1"
                    >
                      <UserRound size={22} />
                      Meu Perfil
                    </button>
                  </Link>
                  <Link href={"/agendar"}>
                    <button
                      type="button"
                      onClick={closeMenu}
                      className="btn w-40 bg-blue-500 hover:bg-blue-400 py-2 px-4 text-white font-bold flex items-center justify-center gap-1.5"
                    >
                      <CalendarDays size={22} />
                      Agendar
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/login" onClick={closeMenu}>
                    <button
                      type="button"
                      className="w-full mt-2 bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded text-white font-bold"
                    >
                      Entrar
                    </button>
                  </Link>
                  <Link href="/cadastro" onClick={closeMenu}>
                    <button
                      type="button"
                      className="w-full mt-2 bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded text-white font-bold"
                    >
                      Cadastrar
                    </button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
