"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const withAuth = (Component: React.ComponentType<any>) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, loading, router]);

    if (loading) {
      // Você pode personalizar isso, por exemplo, com um spinner
      return <div className="text-center mt-10">Carregando...</div>;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
