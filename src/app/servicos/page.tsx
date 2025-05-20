// app/servicos/page.tsx
"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

const servicos = [
  {
    titulo: "Consultoria Personalizada",
    descricao:
      "Atendimento individual com foco nas suas necessidades específicas.",
  },
  {
    titulo: "Agendamentos Online",
    descricao: "Agende seus serviços com facilidade, 24 horas por dia.",
  },
  {
    titulo: "Suporte Rápido",
    descricao: "Resolvemos suas dúvidas e problemas com agilidade.",
  },
];

export default function ServicosPage() {
  return (
    <main className="min-h-screen px-6 md:px-20 pt-15 bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Nossos Serviços
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Oferecemos soluções eficientes e personalizadas para facilitar o seu
          dia a dia.
        </p>
      </section>

      {/* Lista de Serviços */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        {servicos.map((servico) => (
          <div
            key={servico.titulo}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <CheckCircle className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">{servico.titulo}</h3>
            <p className="text-gray-600">{servico.descricao}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Pronto para agendar?
        </h2>
        <Link href="/agendar">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-400 hover:cursor-pointer text-white px-6 py-3 rounded-full font-semibold shadow"
          >
            Agendar Serviço
          </button>
        </Link>
      </section>
    </main>
  );
}
