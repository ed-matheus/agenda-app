import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
// import { prisma } from "@/lib/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nome, email, telefone, servico, data, horario } = body;

    if (!nome || !email || !telefone || !servico || !data || !horario) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    const novoAgendamento = await prisma.agendamento.create({
      data: {
        nome,
        email,
        telefone,
        servico,
        data: new Date(data),
        horario,
      },
    });

    return NextResponse.json({
      message: "Agendamento realizado com sucesso!",
      agendamento: novoAgendamento,
    });
  } catch (error) {
    console.error(
      "ERRO AO SALVAR AGENDAMENTO:",
      JSON.stringify(error, null, 2)
    );
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const agendamentos = await prisma.agendamento.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(agendamentos)
}
