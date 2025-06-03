"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import Image from "next/image";

// Ícones
import { Mail, Phone, User, LogOut, Pencil } from "lucide-react";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
  createdAt: string;
};

const ProfilePage = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Erro ao obter dados do usuário");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        logout(); // força logout se houver erro
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [logout]);

  if (loading) return <div className="p-4">Carregando dados do perfil...</div>;
  if (!user) return <div className="p-4">Usuário não encontrado.</div>;

  return (
    <div className="min-h-screen mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg shadow-gray-300">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={"/"}
            alt="Avatar do usuário"
            layout="fill"
            className="rounded-full object-cover shadow-md"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {user.nome}
        </h1>
        <span className="text-sm text-gray-500 mb-4">
          Plano atual:{" "}
          <span
            // className={`${
            //   user.plan === "PRO" ? "text-green-600" : "text-blue-600"
            // } font-medium`}
          >
            {/* {user.plan} */}
            gratuito
          </span>
        </span>
      </div>

      <div className="space-y-3 mt-6 text-gray-700">
        <div className="flex items-center gap-2">
          <Mail size={18} className="text-gray-500" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-gray-500" />
          <span>{user.telefone}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={18} className="text-gray-500" />
          <span>Cadastrado como: {user.tipo}</span>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => alert("Funcionalidade de edição em breve")}
          className="btn flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          <Pencil size={16} /> Editar Perfil
        </button>

        <button
          type="button"
          onClick={logout}
          className="btn flex items-center gap-2 border-2 border-red-700 hover:bg-red-700 text-red-700 hover:text-white px-4 py-2 rounded-xl transition"
        >
          <LogOut size={16} /> Sair
        </button>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);
