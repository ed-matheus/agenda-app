"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login realizado com sucesso!");
      router.push("/dashboard"); // ou rota pós-login
    } else {
      alert(data.error || "Erro ao fazer login");
    }
  };

  return (
    <main className="container min-h-screen mx-auto px-7 py-16 bg-blue-200">
      <div className="flex flex-col items-center justify-center shadow-2xl p-8 rounded-[10px] bg-white max-w-md w-full mx-auto">
        <h2 className="text-xl font-bold mb-5">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border px-4 py-2 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="border px-4 py-2 rounded focus:outline-none focus:border-blue-700"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
