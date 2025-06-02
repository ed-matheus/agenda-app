"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Componente do Formulário de Agendamento
import BookingForm from "@/components/BookingForm";

export default function AgendarPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <p>Carregando...</p>;
  if (!isAuthenticated) return null; // impede flicker antes do redirect

  return (
    <main className="container mx-auto px-5 md:px-30 lg:px-50 xl:px-70 py-42">
      <BookingForm />
    </main>
  );
}
