// app/admin/page.tsx (Next.js App Router)
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

export default function AdminPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    fetch("/api/agendamentos")
      .then((res) => res.json())
      .then((data) => setAgendamentos(data));
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Painel de Agendamentos</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2">ID</th>
            <th className="p-2">Nome</th>
            <th className="p-2">Email</th>
            <th className="p-2">Telefone</th>
            <th className="p-2">Serviço</th>
            <th className="p-2">Data</th>
            <th className="p-2">Horário</th>
            <th className="p-2">Criado em</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((ag) => (
            <tr
              key={ag.id}
              className="border-b border-gray-700 hover:bg-gray-800"
            >
              <td className="p-2">{ag.id}</td>
              <td className="p-2">{ag.nome}</td>
              <td className="p-2">{ag.email}</td>
              <td className="p-2">{ag.telefone}</td>
              <td className="p-2">{ag.servico}</td>
              <td className="p-2">{ag.data}</td>
              <td className="p-2">{ag.horario}</td>
              <td className="p-2">{new Date(ag.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
