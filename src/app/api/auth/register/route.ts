// /pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  const { nome, email, telefone, senha } = req.body;

  if (!nome || !email || !telefone || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        telefone,
        senha: senhaCriptografada,
        tipo: "cliente",
      },
    });

    return res
      .status(201)
      .json({
        mensagem: "Usuário registrado com sucesso",
        usuario: novoUsuario,
      });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao registrar o usuário" });
  }
}
