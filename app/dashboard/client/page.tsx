// app/dashboard/client/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { validateSession } from "@/app/actions/auth/validate-session";
import { getClientOrders } from "@/app/actions/getClientOrders";
import ClientDashboardClient from './page-client';

export default function ClientDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateSession();
        if (result.valid && result.user && result.user.role === 'client') {
          setUser(result.user);

          // Fetch user orders
          const ordersData = await getClientOrders(result.user.id);
          setOrders(ordersData);
        } else {
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[oklch(0.145_0_0)]">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Cargando...</h1>
          <p>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.145_0_0)]">
      <Header />

      <main className="flex-1 px-4 md:px-8 pt-4 md:pt-32 transition-all duration-300 pb-5">
        <ClientDashboardClient user={user} orders={orders} />
      </main>

      <Footer />
    </div>
  );
}
