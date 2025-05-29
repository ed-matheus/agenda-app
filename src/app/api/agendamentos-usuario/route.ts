// app/api/meus-agendamentos/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/auth"; 

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const agendamentos = await prisma.agendamento.findMany({
    where: {
      usuario: {
        email: session.user.email,
      },
    },
    orderBy: {
      dataHora: "asc",
    },
  });

  return NextResponse.json(agendamentos);
}
