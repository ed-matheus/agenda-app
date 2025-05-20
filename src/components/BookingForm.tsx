'use client';

import { useState } from 'react';

export default function BookingForm() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    servico: '',
    data: '',
    horario: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/agendamento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMensagem('Agendamento realizado com sucesso!');
      setForm({ nome: '', email: '', servico: '', data: '', horario: '' });
    } else {
      setMensagem('Erro ao agendar. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 md:p-8 space-y-4 gap-7">
      <h2 className="text-xl font-bold mb-4">Agende seu horário</h2>

      <input
        type="text"
        name="nome"
        placeholder="Seu nome"
        value={form.nome}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-lg"
      />

      <input
        type="email"
        name="email"
        placeholder="Seu e-mail"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-lg"
      />

      <select
        name="servico"
        value={form.servico}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-lg"
      >
        <option value="" disabled>- Selecione o serviço -</option>
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
        className="w-full p-3 border rounded-lg"
      />

      <input
        type="time"
        name="horario"
        value={form.horario}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
      >
        Confirmar Agendamento
      </button>

      {mensagem && (
        <p className="text-center mt-4 text-sm text-green-600">{mensagem}</p>
      )}
    </form>
  );
}
