"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function withAuth(Component: React.FC) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return function ProtectedComponent(props: any) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return <div className="p-4">Carregando...</div>;
    }

    return <Component {...props} />;
  };
}
