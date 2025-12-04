// app/dashboard/client/page-client.tsx
'use client';
import { BalanceCard } from "@/components/dashboard/balance-card";
import { ClientOrdersTable } from "@/components/dashboard/client-orders-table";
import { Wallet, ShoppingBag, Clock, DollarSign, User } from "lucide-react";
import { Order } from "@/lib/data";

export default function ClientDashboardClient({
  user,
  orders
}: {
  user: any;
  orders: Order[];
}) {
  // Calcula métricas desde los datos reales
  const activeOrders = orders.filter(order => order.status === 'pendiente' || order.status === 'en proceso').length;
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + Number(order.precio_usd), 0);

  return (
    <div className="max-w-7xl mx-auto bg-[oklch(0.145_0_0)] p-4 md:p-0">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 pt-20">
          Dashboard del Cliente
        </h1>
        <p className="text-white/80 text-sm md:text-base">
          Gestiona tus pedidos y visualiza los detalles de transacciones
        </p>
      </div>

      {/* Cards estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 text-white">
        <BalanceCard
          title="Cuenta de Usuario"
          value={user.email}
          icon={User}
          description="Cliente activo"
        />
        <BalanceCard
          title="Total de Pedidos"
          value={totalOrders.toString()}
          icon={ShoppingBag}
          description="Todo el tiempo"
        />
        <BalanceCard
          title="Pedidos Activos"
          value={activeOrders.toString()}
          icon={Clock}
          description="En progreso"
        />
        <BalanceCard
          title="Total Gastado"
          value={`$${totalSpent.toFixed(2)}`}
          icon={DollarSign}
          description="Valor de por vida"
        />
      </div>

      {/* Tabla de órdenes del cliente */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Pedidos Recientes</h2>
        <ClientOrdersTable orders={orders} userEmail={user.email} />
      </div>
    </div>
  );
}
