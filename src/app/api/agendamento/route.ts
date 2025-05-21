import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
// import { prisma } from "@/lib/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { servico, dataHora, usuarioId } = body;

    if (!servico || !dataHora || !usuarioId) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    const novoAgendamento = await prisma.agendamento.create({
      data: {
        servico,
        dataHora: new Date(dataHora),
        usuario: {
          connect: { id: usuarioId },
        },
      },
    });

    return NextResponse.json({
      message: "Agendamento realizado com sucesso!",
      agendamento: novoAgendamento,
    });
  } catch (error) {
    console.error("ERRO AO SALVAR AGENDAMENTO:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      include: {
        usuario: true, // para retornar nome, email, etc.
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(agendamentos);
  } catch (error) {
    console.error("ERRO AO BUSCAR AGENDAMENTOS:", error);
    return NextResponse.json(
      { error: "Erro ao buscar agendamentos." },
      { status: 500 }
    );
  }
}
