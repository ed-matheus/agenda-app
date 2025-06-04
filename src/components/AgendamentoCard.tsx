"use client";

import { useEffect, useRef, useState } from "react";
import { X, Eye, Trash2 } from "lucide-react";
import type { Agendamento } from "@/app/page";

type Props = {
  agendamentos: Agendamento[];
  onDelete: (id: number) => void;
};

export default function AgendamentoCard({ agendamentos, onDelete }: Props) {
  const [selected, setSelected] = useState<Agendamento | null>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  const closeSelected = () => setSelected(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectedRef.current &&
      !selectedRef.current.contains(event.target as Node)
    ) {
      closeSelected();
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selected) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selected]);

  return (
    <>
      {agendamentos.map((agendamento) => (
        <div
          key={agendamento.id}
          className="bg-white p-4 rounded-xl shadow-sm relative"
        >
          <p className="text-xs text-gray-400 mb-2">
            Criado em: {agendamento.createdAt}
          </p>
          <h3 className="font-semibold text-lg mb-1">{agendamento.nome}</h3>
          <p className="text-sm mb-1">{agendamento.servico}</p>
          <p className="text-sm text-gray-600 mb-1">
            {agendamento.data} às {agendamento.horario}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              type="button"
              onClick={() => setSelected(agendamento)}
              onKeyDown={(e) => e.key === "Enter" && setSelected(agendamento)}
              className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
            >
              <Eye size={16} />
              Ver
            </button>
            <button
              type="button"
              onClick={() => onDelete(agendamento.id)}
              onKeyDown={(e) => e.key === "Enter" && onDelete(agendamento.id)}
              className="flex items-center gap-1 text-sm text-red-500 hover:underline"
            >
              <Trash2 size={16} />
              Cancelar
            </button>
          </div>
        </div>
      ))}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div
            ref={selectedRef}
            className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative"
          >
            <button
              type="button"
              onClick={closeSelected}
              onKeyDown={(e) => e.key === "Enter" && closeSelected()}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Detalhes do Agendamento
            </h2>
            <p className="mb-2">
              <strong>Nome:</strong> {selected.usuario.nome}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selected.usuario.email}
            </p>
            <p className="mb-2">
              <strong>Telefone:</strong> {selected.usuario.telefone}
            </p>
            <p className="mb-2">
              <strong>Serviço:</strong> {selected.servico}
            </p>
            <p className="mb-2">
              <strong>Data:</strong> {selected.data}
            </p>
            <p className="mb-2">
              <strong>Horário:</strong> {selected.horario}
            </p>
            <p className="text-sm text-gray-400">
              Criado em: {selected.createdAt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
