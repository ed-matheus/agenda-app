"use client";

import AgendamentoCard from "@/components/AgendamentoCard";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";

const Home = () => {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <div className="px-8 py-12">
        <h2 className="text-xl text-center font-bold mb-4">
          Agendamentos
        </h2>
        <AgendamentoCard />
      </div>
    </main>
  );
};

export default withAuth(Home);
