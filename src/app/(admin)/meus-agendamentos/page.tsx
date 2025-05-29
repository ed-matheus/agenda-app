"use client";

import AgendamentoCard from "@/components/AgendamentoCard";

export default function MeusAgendamentosPage() {
  return (
    <div className="px-8 py-12">
      <h2 className="text-xl text-center font-bold mb-4">
        Agendamentos Realizados
      </h2>
      <AgendamentoCard />
    </div>
  );
}
