"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Order } from "@/lib/data";

interface ClientOrdersTableProps {
  orders: Order[];
  userEmail: string;
}

export function ClientOrdersTable({ orders, userEmail }: ClientOrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      finalizado: { label: "Finalizado", className: "bg-green-500/20 text-green-500" },
      "en proceso": { label: "En proceso", className: "bg-blue-500/20 text-blue-500" },
      pendiente: { label: "Pendiente", className: "bg-yellow-500/20 text-yellow-500" },
    };

    const variant = variants[status] || variants.pendiente;

    return <Badge className={variant.className}>{variant.label}</Badge>;
  };
  return (
    <>
      {/* 🖥️ Versión escritorio */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-white">ID</th>
              <th className="text-left p-4 text-sm font-medium text-white">Servicio</th>
              <th className="text-left p-4 text-sm font-medium text-white">Cantidad</th>
              <th className="text-left p-4 text-sm font-medium text-white">Total</th>
              <th className="text-left p-4 text-sm font-medium text-white">Estado</th>
              <th className="text-left p-4 text-sm font-medium text-white">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="border-b border-white/5 hover:bg-white/10 transition cursor-pointer"
              >
                <td className="p-4 font-medium text-white">#{order.id}</td>
                <td className="p-4 text-white">{order.servicio}</td>
                <td className="p-4 text-white">{Number(order.cantidad).toLocaleString()}</td>
                <td className="p-4 text-white font-medium">
                  ${Number(order.precio_usd).toFixed(2)}
                </td>
                <td className="p-4">{getStatusBadge(order.status)}</td>
                <td className="p-4 text-white">
                  {new Date(Number(order.created_at) * 1000).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Versión móvil */}
      <div className="md:hidden divide-y divide-white/10 mx-4">
        {paginatedOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="p-4 flex justify-between items-center hover:bg-white/10 transition rounded-lg cursor-pointer"
          >
            <div>
              <p className="text-white font-medium">
                #{order.id} - {order.servicio}
              </p>
              <p className="text-sm text-white">
                ${Number(order.precio_usd).toFixed(2)}
              </p>
            </div>
            <div>{getStatusBadge(order.status)}</div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* 🔥 MODAL RESPONSIVE */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent
          className="
            bg-black/70 
            backdrop-blur-xl 
            border border-purple-500/40 
            text-white 
            rounded-xl 

            /* 📱 Tamaño perfecto */
            w-[92%] 
            max-w-md 
            p-6 

            /* Evita pegarse arriba/abajo */
            mt-10 mb-10 
            sm:mt-0 sm:mb-0

            /* Scroll interno suave */
            max-h-[80vh] 
            overflow-y-auto 
            scroll-smooth
          "
        >
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Detalles del Pedido</DialogTitle>
                <DialogDescription className="text-white/80">
                  Información completa sobre tu pedido.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-6">

                {/* Información de Usuario */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
                    Información del Usuario
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold">Correo Electrónico</Label>
                      <p>{userEmail}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">ID del Usuario</Label>
                      <p>Usuario registrado</p>
                    </div>
                  </div>
                </div>

                {/* Detalles del Pedido */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
                    Detalles del Pedido
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold">ID</Label>
                      <p className="font-mono">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Fecha</Label>
                      <p>
                        {new Date(
                          Number(selectedOrder.created_at) * 1000
                        ).toLocaleString("es-ES")}
                      </p>
                    </div>

                    <div>
                      <Label className="font-semibold">Servicio</Label>
                      <p>{selectedOrder.servicio}</p>
                    </div>

                    <div>
                      <Label className="font-semibold">Categoría</Label>
                      <p>{selectedOrder.categoria}</p>
                    </div>

                    <div>
                      <Label className="font-semibold">Tipo</Label>
                      <p>{selectedOrder.tipo}</p>
                    </div>

                    <div>
                      <Label className="font-semibold">Cantidad</Label>
                      <p>{Number(selectedOrder.cantidad).toLocaleString()}</p>
                    </div>

                    <div>
                      <Label className="font-semibold">Precio USD</Label>
                      <p>${Number(selectedOrder.precio_usd).toFixed(2)}</p>
                    </div>

                    <div>
                      <Label className="font-semibold">Precio COP</Label>
                      <p>${Number(selectedOrder.precio_cop).toLocaleString()}</p>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <Label className="font-semibold">Link</Label>
                      <p>{selectedOrder.link || "No proporcionado"}</p>
                    </div>
                  </div>

                  {selectedOrder.custom_comments && (
                    <div>
                      <Label className="font-semibold">Comentarios</Label>
                      <p className="bg-white/10 p-3 rounded mt-1">
                        {selectedOrder.custom_comments}
                      </p>
                    </div>
                  )}
                </div>

                {/* Comprobante */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
                    Comprobante de Pago
                  </h3>

                  {selectedOrder.payment_proof ? (
                    <img
                      src={selectedOrder.payment_proof}
                      className="w-full rounded-lg border border-white/20"
                      alt="Comprobante"
                    />
                  ) : (
                    <p className="text-white/80">
                      No se ha subido comprobante de pago
                    </p>
                  )}
                </div>

                {/* Estado */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
                    Estado del Pedido
                  </h3>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(selectedOrder.status)}
                    <span className="text-white/80 text-sm">
                      {selectedOrder.status === "pendiente" &&
                        "Tu pedido está siendo revisado"}
                      {selectedOrder.status === "en proceso" &&
                        "Estamos procesando tu pedido"}
                      {selectedOrder.status === "finalizado" &&
                        "Tu pedido ha sido completado"}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
