// /app/api/auth/register/route.ts
import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { nome, email, telefone, senha, tipo } = body;

  if (!nome || !email || !telefone || !senha || !tipo) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 }
    );
  }

  if (tipo !== "cliente" && tipo !== "profissional") {
    return NextResponse.json(
      { error: "Tipo de usuário inválido." },
      { status: 400 }
    );
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado." },
        { status: 409 }
      );
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        telefone,
        senha: senhaCriptografada,
        tipo,
      },
    });

    return NextResponse.json(
      {
        mensagem: "Usuário registrado com sucesso",
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          tipo: novoUsuario.tipo,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar:", error);
    return NextResponse.json(
      { error: "Erro ao registrar o usuário" },
      { status: 500 }
    );
  }
}
