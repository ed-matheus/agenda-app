import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

const filePath = path.join(process.cwd(), 'data', 'agendamentos.json');

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const agendamentos = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];

    agendamentos.push({ ...data, id: Date.now() });

    fs.writeFileSync(filePath, JSON.stringify(agendamentos, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 });
  }
}
