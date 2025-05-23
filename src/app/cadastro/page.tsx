"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, telefone, email, senha }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Cadastro realizado com sucesso!");
      router.push("/login");
    } else {
      alert(data.error || "Erro ao cadastrar.");
    }
  };

  return (
    <main className="container min-h-screen mx-auto px-7 md:px-30 lg:px-50 xl:px-70 py-42 bg-blue-200">
      <div className="flex flex-col items-center justify-center shadow-2xl p-8 rounded-[10px] bg-white">
        <h2 className="text-xl font-bold mb-5">Cadastre-se</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            name="nome"
            placeholder="Seu nome e sobrenome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="telefone"
            placeholder="Seu telefone (Whatsapp)"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
