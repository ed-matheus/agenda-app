"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Usuario = {
  nome: string;
  email: string;
  telefone: string;
};

type Agendamento = {
  id: number;
  servico: string;
  data: string;
  horario: string;
  createdAt: string;
  usuario: Usuario;
};

export default function AgendamentoCard() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [selected, setSelected] = useState<Agendamento | null>(null);

  useEffect(() => {
    fetch("/api/agendamento")
      .then((res) => res.json())
      .then((dados) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const formatados = dados.map((ag: any) => {
          const dataObj = new Date(ag.dataHora);

          return {
            ...ag,
            data: dataObj.toLocaleDateString("pt-BR", { timeZone: "UTC" }),
            horario: dataObj.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            }),
          };
        });

        setAgendamentos(formatados);
      });
  }, []);

  return (
    <div className="w-full min-h-screen">
      {agendamentos.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          Nenhum agendamento encontrado.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agendamentos.map((ag) => (
          <button
            key={ag.id}
            type="button"
            onClick={() => setSelected(ag)}
            className="w-full text-left bg-gray-100 p-4 rounded-xl shadow hover:bg-gray-200 transition cursor-pointer"
          >
            <p className="text-lg font-semibold">{ag.usuario?.nome}</p>
            <p className="text-sm text-zinc-400">{ag.servico}</p>
            <p className="text-sm text-zinc-400">
              {ag.data} - {ag.horario}
            </p>
          </button>
        ))}
      </div>

      {selected && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-5"
          onClick={() => setSelected(null)}
        >
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className="bg-gray-200 rounded-xl p-8 max-w-md w-full text-sm text-black relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-2.5 right-2.5 text-lg"
            >
              <X
                size={25}
                className="text-gray-400 hover:text-black hover:cursor-pointer"
              />
            </button>

            <h2 className="text-xl text-center font-bold mb-4">
              Detalhes do Agendamento
            </h2>

            <ul className="space-y-1">
              <li>
                <strong>ID:</strong> {selected.id}
              </li>
              <li>
                <strong>Nome:</strong> {selected.usuario?.nome}
              </li>
              <li>
                <strong>Email:</strong> {selected.usuario?.email}
              </li>
              <li>
                <strong>Telefone:</strong> {selected.usuario?.telefone}
              </li>
              <li>
                <strong>Serviço:</strong> {selected.servico}
              </li>
              <li>
                <strong>Data:</strong> {selected.data}
              </li>
              <li>
                <strong>Horário:</strong> {selected.horario}
              </li>
              <li>
                <strong>Criado em:</strong>{" "}
                {new Date(selected.createdAt).toLocaleString("pt-BR")}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
