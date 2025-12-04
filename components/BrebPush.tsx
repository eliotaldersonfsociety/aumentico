// components/BreBPush.tsx
"use client";

import { useState, useEffect } from "react";

interface BreBPaymentComponentProps {
  amount: number;
  reference: string;
  description: string;
}

export default function BreBPaymentComponent({
  amount,
  reference,
  description,
}: BreBPaymentComponentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulación de llamada a API de Redeban o PayU
        // En producción, aquí iría la llamada real a la API
        const response = await fetch("/api/breb-qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            reference,
            description,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setQrCodeUrl(data.qrCodeUrl);
        } else {
          setError(data.message || "Error al generar el QR");
        }
      } catch (err: any) {
        setError(err.message || "Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    generateQR();
  }, [amount, reference, description]);

  if (loading) return <p>Generando QR...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center p-4 border rounded-xl shadow-md w-full max-w-xs mx-auto bg-white">
      <h3 className="text-lg font-bold mb-2">Pagar con Bre-B</h3>
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="QR Bre-B" className="w-64 h-64" />
      ) : (
        <p>Generando QR...</p>
      )}
      <p className="mt-1 text-sm font-medium">
        Monto: <span className="text-green-600">${amount.toLocaleString("es-CO")}</span>
      </p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}
