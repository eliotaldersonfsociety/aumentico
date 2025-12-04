// components/NequiPushPayment.tsx
"use client";
import React, { useState } from "react";

type NequiPushPaymentProps = {
  amountCOP: number;
  reference: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
};

export const NequiPushPayment: React.FC<NequiPushPaymentProps> = ({
  amountCOP,
  reference,
  onSuccess,
  onError,
}) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);
      // 1. Llamas a tu backend para crear la transacción
      const resp = await fetch(`/api/pay/nequiPush`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          amount: amountCOP,
          reference,
        }),
      });
      const data = await resp.json();
      if (resp.ok) {
        // Suponemos que la API devuelve datos del pago o token
        onSuccess(data);
      } else {
        onError(data);
      }
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Pagar con Nequi</h3>
      <label>
        Número de celular:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+57 300xxxxxxx"
        />
      </label>
      <button onClick={handlePay} disabled={loading || !phone}>
        {loading ? "Procesando..." : `Pagar COP ${amountCOP}`}
      </button>
    </div>
  );
};
