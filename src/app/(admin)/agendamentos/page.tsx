"use client";

import AgendamentoCard from "@/components/AgendamentoCard";

export default function AdminPage() {
  return (
    <div className="px-8 py-12">
      <h2 className="text-xl text-center font-bold mb-4">
        Agendamentos Recebidos
      </h2>
      <AgendamentoCard />
    </div>
  );
}
