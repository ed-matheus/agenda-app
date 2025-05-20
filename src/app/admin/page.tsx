import fs from 'node:fs';
import path from 'node:path';

export default function AdminPage() {
  const filePath = path.join(process.cwd(), 'data', 'agendamentos.json');
  const agendamentos = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
    : [];

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      <div className="space-y-4">
        {agendamentos.length === 0 ? (
          <p>Nenhum agendamento encontrado.</p>
        ) : (
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          agendamentos.map((a: any) => (
            <div key={a.id} className="border p-4 rounded-lg shadow-sm">
              <p><strong>Nome:</strong> {a.nome}</p>
              <p><strong>E-mail:</strong> {a.email}</p>
              <p><strong>Serviço:</strong> {a.servico}</p>
              <p><strong>Data:</strong> {a.data}</p>
              <p><strong>Horário:</strong> {a.horario}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
