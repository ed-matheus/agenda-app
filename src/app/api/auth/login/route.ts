import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario)
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta)
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });

  const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, JWT_SECRET, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({ message: "Login realizado com sucesso" });

  // Setando cookie HTTP-only
  response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`);

  return response;
}
