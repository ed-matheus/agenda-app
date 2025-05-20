"use client";

import { useEffect, useState } from "react";

type Agendamento = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
  createdAt: string;
};

export default function AdminTable() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [selected, setSelected] = useState<Agendamento | null>(null);

  useEffect(() => {
    fetch("/api/agendamento")
      .then((res) => res.json())
      .then(setAgendamentos);
  }, []);

  const formatarDataAgendamento = (dataISO: string) => {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

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
            className="text-left w-full bg-gray-100 p-4 rounded-xl shadow hover:bg-gray-200 transition cursor-pointer"
          >
            <p className="text-lg font-semibold">{ag.nome}</p>
            <p className="text-sm text-zinc-400">{ag.servico}</p>
            <p className="text-sm text-zinc-400">
              {formatarDataAgendamento(ag.data)} - {ag.horario}
            </p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-5">
          <div className="bg-gray-200 rounded-xl p-6 max-w-md w-full text-sm text-black relative">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-lg"
            >
              &times;
            </button>

            <h2 className="text-xl text-center font-bold mb-4">
              Detalhes do Agendamento
            </h2>

            <ul className="space-y-1">
              <li>
                <strong>ID:</strong> {selected.id}
              </li>
              <li>
                <strong>Nome:</strong> {selected.nome}
              </li>
              <li>
                <strong>Email:</strong> {selected.email}
              </li>
              <li>
                <strong>Telefone:</strong> {selected.telefone}
              </li>
              <li>
                <strong>Serviço:</strong> {selected.servico}
              </li>
              <li>
                <strong>Data:</strong> {formatarDataAgendamento(selected.data)}
              </li>
              <li>
                <strong>Horário:</strong> {selected.horario}
              </li>
              <li>
                <strong>Criado em:</strong>{" "}
                {new Date(selected.createdAt).toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
