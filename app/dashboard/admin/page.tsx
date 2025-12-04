"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OrdersTable } from "@/components/dashboard/orders-table";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { DollarSign, Clock, Cog } from "lucide-react";
import { validateSession } from "@/app/actions/auth/validate-session";
import { getAdminDashboardStats } from "@/app/actions/admin-data";

interface AdminHeaderProps {
  userName?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateSession();
        if (result.valid && result.user && result.user.role === 'admin') {
          setUser(result.user);
          // Fetch stats
          const statsData = await getAdminDashboardStats();
          setStats(statsData);
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Cargando...</h1>
          <p>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Gestión de Órdenes
        </h1>
        <p className="text-white/80 text-sm md:text-base">
          Administra todas las órdenes de compra
        </p>
      </div>

      {/* Cards estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 text-white">
          <BalanceCard
            title="Total Ventas"
            value={`$${stats.totalSales.toFixed(2)}`}
            icon={DollarSign}
            description="Ingresos totales"
          />
          <BalanceCard
            title="Órdenes Pendientes"
            value={stats.pendingOrders.toString()}
            icon={Clock}
            description="Esperando procesamiento"
          />
          <BalanceCard
            title="Órdenes en Proceso"
            value={stats.inProcessOrders.toString()}
            icon={Cog}
            description="Siendo procesadas"
          />
        </div>
      )}

      {/* Tabla de todas las órdenes */}
      <div className="mb-8">
        <OrdersTable />
      </div>
    </div>
  );
}
