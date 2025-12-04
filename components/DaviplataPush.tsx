"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function DaviplataQR({ amount, reference }: { amount: number; reference: string }) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const numero = "3006144416";

    // Merchant Account Info EMVCo + Daviplata
    const merchantData = `0017CO.DAVIPLATA.${numero}`;
    const merchantLength = merchantData.length.toString().padStart(2, "0");

    const amountStr = amount.toString();
    const refLength = reference.length.toString().padStart(2, "0");

    const emv = `
000201
010212
26${merchantLength}${merchantData}
52040000
5303580
5802CO
54${amountStr.length}${amountStr}
62${refLength}${reference}
6304
    `.replace(/\s+/g, "");

    QRCode.toDataURL(emv).then((url) => setQr(url));
  }, [amount, reference]);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-3 text-center">
        Pagar con Daviplata
      </h2>

      {qr ? (
        <img src={qr} alt="Daviplata QR" className="w-48 h-48" />
      ) : (
        <p>Generando QR…</p>
      )}

      <p className="mt-2 text-sm text-gray-600">
        Escanea este QR con Daviplata y paga {amount} COP
      </p>
      <p className="mt-1 text-xs text-gray-400">
        Número asociado: {`300 614 4416`}
      </p>
    </div>
  );
}
