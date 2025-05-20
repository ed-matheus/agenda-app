// app/admin/page.tsx (Next.js App Router)
"use client";

import AdminTable from "@/components/AdminTable";

export default function AdminPage() {
  return (
    <div className="px-8 py-12">
      <h2 className="text-xl text-center font-bold mb-4">Painel de Agendamentos</h2>
      <AdminTable />
    </div>
  );
}
