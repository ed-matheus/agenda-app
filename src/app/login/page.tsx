"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState<{
    tipo: "erro" | "sucesso";
    texto: string;
  } | null>(null);
  const [erroCampo, setErroCampo] = useState<{
    email?: boolean;
    senha?: boolean;
  }>({});

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem(null);
    setErroCampo({});

    const erros: { email?: boolean; senha?: boolean } = {};
    if (!email.trim()) erros.email = true;
    if (!senha.trim()) erros.senha = true;

    if (Object.keys(erros).length > 0) {
      setErroCampo(erros);
      setMensagem({
        tipo: "erro",
        texto: "Preencha todos os campos corretamente.",
      });
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setMensagem({ tipo: "sucesso", texto: "Login realizado com sucesso!" });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      setMensagem({
        tipo: "erro",
        texto: data.error || "Erro ao fazer login.",
      });

      if (data.error?.toLowerCase().includes("usuário")) {
        setErroCampo({ email: true });
      } else if (data.error?.toLowerCase().includes("senha")) {
        setErroCampo({ senha: true });
      } else {
        setErroCampo({ email: true, senha: true });
      }
    }
  };

  return (
    <main className="container min-h-screen mx-auto px-7 py-16 bg-blue-200">
      <div className="flex flex-col items-center justify-center shadow-2xl p-8 rounded-[10px] bg-white max-w-md w-full mx-auto">
        <h2 className="text-xl font-bold mb-5">Login</h2>

        {mensagem && (
          <p
            className={`text-sm mb-4 text-center ${
              mensagem.tipo === "sucesso" ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensagem.texto}
          </p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border px-4 py-2 rounded focus:outline-none focus:border-blue-700 ${
              erroCampo.email ? "border-red-500" : ""
            }`}
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={`border px-4 py-2 rounded focus:outline-none focus:border-blue-700 ${
              erroCampo.senha ? "border-red-500" : ""
            }`}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Entrar
          </button>
        </form>

        <div className="text-center mt-5">
          <p>Ainda não é cadastrado?</p>
          <Link href={"/cadastro"} className="">
            <p className="mt-1">Crie sua conta</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
