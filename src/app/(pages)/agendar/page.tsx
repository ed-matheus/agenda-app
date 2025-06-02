"use client";

import withAuth from "@/hoc/withAuth";

// Componente do Formulário de Agendamento
import BookingForm from "@/components/BookingForm";

const AgendarPage = () => {
  return (
    <main className="container mx-auto px-5 md:px-30 lg:px-50 xl:px-70 py-42">
      <BookingForm />
    </main>
  );
};

export default withAuth(AgendarPage);
