import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      tipo: string;
    };

    const path = req.nextUrl.pathname;

    // Protege a página de agendamento: somente CLIENTES podem acessar
    if (path === "/agendar" && decoded.tipo !== "cliente") {
      return NextResponse.redirect(new URL("/nao-autorizado", req.url));
    }

    // Protegendo painel do profissional
    if (
      path.startsWith("/dashboard/profissional") &&
      decoded.tipo !== "profissional"
    ) {
      return NextResponse.redirect(new URL("/nao-autorizado", req.url));
    }

    // Protegendo painel do cliente
    if (path.startsWith("/dashboard/cliente") && decoded.tipo !== "cliente") {
      return NextResponse.redirect(new URL("/nao-autorizado", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Aplica apenas nas rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/api/agendamento/:path*", "/agendar"],
};
