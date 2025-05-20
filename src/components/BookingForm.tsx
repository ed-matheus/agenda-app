"use client";

import { useState } from "react";

export default function BookingForm() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    servico: "",
    data: "",
    horario: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/agendamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMensagem("Agendamento realizado com sucesso!");
      setForm({
        nome: "",
        email: "",
        telefone: "",
        servico: "",
        data: "",
        horario: "",
      });
    } else {
      setMensagem(data.error || "Erro ao agendar.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Agendar Serviço</h1>

      {mensagem && (
        <p className="text-center mb-4 text-blue-600 font-medium">{mensagem}</p>
      )}

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto grid gap-4">
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={form.nome}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={form.email}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <select
          name="servico"
          value={form.servico}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        >
          <option value="" disabled>
            - Selecione o serviço -
          </option>
          <option value="Consulta médica">Consulta médica</option>
          <option value="Corte de cabelo">Corte de cabelo</option>
          <option value="Sessão de coaching">Sessão de coaching</option>
        </select>
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <input
          type="time"
          name="horario"
          value={form.horario}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="btn bg-blue-500 text-white hover:bg-blue-400"
        >
          Confirmar Agendamento
        </button>
      </form>
    </div>
  );
}
