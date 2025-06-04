"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Menu, X, CalendarDays, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Fecha ao clicar fora
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "Agendamentos", path: "/" },
    { label: "Ajuda", path: "/ajuda" },
  ];

  if (loading) return null;

  return (
    <header className="bg-white shadow-md py-4 relative z-50">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-600">AgendApp</h2>

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
              <Link href="/agendar" className="hidden lg:block">
                <button
                  type="button"
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

      {/* Menu Mobile com Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full z-40 bg-white/95 backdrop-blur-sm shadow-md px-4 py-4 overflow-hidden"
          >
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

              <div className="flex flex-col gap-3 mt-4">
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
                    <Link href="/agendar">
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
                    <Link href="/login">
                      <button
                        type="button"
                        onClick={closeMenu}
                        className="w-full mt-2 bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded text-white font-bold"
                      >
                        Entrar
                      </button>
                    </Link>
                    <Link href="/cadastro">
                      <button
                        type="button"
                        onClick={closeMenu}
                        className="w-full mt-2 bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded text-white font-bold"
                      >
                        Cadastrar
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
