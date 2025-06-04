"use client";

import { useEffect, useState } from "react";
import AgendamentoCard from "@/components/AgendamentoCard";
import withAuth from "@/hoc/withAuth";

export type Agendamento = {
  id: number;
  nome: string;
  servico: string;
  data: string;
  horario: string;
  createdAt: string;
  usuario: {
    nome: string;
    email: string;
    telefone: string;
  };
};

function Home() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const res = await fetch("/api/agendamento");
        const data = await res.json();
        setAgendamentos(data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAgendamentos();
  }, []);

  const handleDeleteAgendamento = async (id: number) => {
    try {
      const res = await fetch(`/api/agendamento/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAgendamentos((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error("Erro ao deletar agendamento.");
      }
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
    }
  };

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen px-7 py-10">
      <h2 className="text-xl text-center font-bold mb-4">Agendamentos</h2>
      {agendamentos.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          Nenhum agendamento encontrado.
        </p>
      )}

      <div className="grid gap-4">
        {agendamentos.map((agendamento) => (
          <AgendamentoCard
            key={agendamento.id}
            agendamentos={agendamentos}
            onDelete={handleDeleteAgendamento}
          />
        ))}
      </div>
    </main>
  );
}

export default withAuth(Home);
