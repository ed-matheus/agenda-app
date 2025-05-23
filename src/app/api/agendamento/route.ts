import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "segredo-dev";

function verificarToken(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.split(" ")[1];
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { servico, data, horario } = body;
  const dataHora = new Date(`${data}T${horario}`);

  const user = verificarToken(req);
  if (!user)
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const agendamento = await prisma.agendamento.create({
      data: {
        servico,
        dataHora,
        usuarioId: user.id,
      },
    });

    return NextResponse.json({
      message: "Agendamento realizado com sucesso!",
      agendamento,
    });
  } catch (error) {
    console.error("Erro ao salvar agendamento:", error);
    return NextResponse.json(
      { error: "Erro ao salvar agendamento" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      include: {
        usuario: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar agendamentos." },
      { status: 500 }
    );
  }
}
