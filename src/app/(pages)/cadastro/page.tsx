"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState<"cliente" | "profissional" | "">("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!nome) newErrors.nome = "Nome é obrigatório.";
    if (!telefone) newErrors.telefone = "Telefone é obrigatório.";
    if (!email) newErrors.email = "Email é obrigatório.";
    if (!senha) newErrors.senha = "Senha é obrigatória.";
    if (!tipo) newErrors.tipo = "Selecione o tipo de cadastro.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, telefone, email, senha, tipo }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccessMessage("Cadastro realizado com sucesso!");
      setTimeout(() => {
        router.push("/bem-vindo"); // Altere para a página final que você vai criar
      }, 2000);
    } else {
      setErrors({ geral: data.error || "Erro ao cadastrar." });
    }
  };

  return (
    <main className="container min-h-screen mx-auto px-7 py-16 bg-blue-200">
      <div className="flex flex-col items-center justify-center shadow-2xl p-8 rounded-[10px] bg-white max-w-md w-full mx-auto">
        <h2 className="text-xl font-bold mb-5">Cadastre-se</h2>

        <h3 className="mb-2">Como quer se cadastrar?</h3>
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => setTipo("cliente")}
            className={`px-4 py-2 rounded ${
              tipo === "cliente"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Sou Cliente
          </button>
          <button
            type="button"
            onClick={() => setTipo("profissional")}
            className={`px-4 py-2 rounded ${
              tipo === "profissional"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Sou Profissional
          </button>
        </div>
        {errors.tipo && (
          <p className="text-red-600 text-sm mb-2">{errors.tipo}</p>
        )}

        {errors.geral && (
          <p className="text-red-600 text-sm mb-2">{errors.geral}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-sm mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Seu nome e sobrenome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              if (errors.nome) setErrors((prev) => ({ ...prev, nome: "" }));
            }}
            className={`border px-4 py-2 rounded focus:outline-none focus:border-blue-700 ${
              errors.nome ? "border-red-500" : ""
            }`}
          />
          {errors.nome && (
            <p className="text-red-500 text-sm -mt-2">{errors.nome}</p>
          )}

          <input
            type="text"
            placeholder="Seu telefone (Whatsapp)"
            value={telefone}
            onChange={(e) => {
              setTelefone(e.target.value);
              if (errors.telefone)
                setErrors((prev) => ({ ...prev, telefone: "" }));
            }}
            className={`border px-4 py-2 rounded focus:outline-none focus:border-blue-700 ${
              errors.telefone ? "border-red-500" : ""
            }`}
          />
          {errors.telefone && (
            <p className="text-red-500 text-sm -mt-2">{errors.telefone}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className={`border px-4 py-2 rounded focus:outline-none focus:border-blue-700 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm -mt-2">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              if (errors.senha) setErrors((prev) => ({ ...prev, senha: "" }));
            }}
            className={`border px-4 py-2 rounded focus:outline-none focus:border-blue-700 ${
              errors.senha ? "border-red-500" : ""
            }`}
          />
          {errors.senha && (
            <p className="text-red-500 text-sm -mt-2">{errors.senha}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
