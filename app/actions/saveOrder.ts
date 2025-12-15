// app/actions/saveOrder.ts
'use server';

import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { users, orders, sessions } from '@/drizzle/schema';
import { eq, and, gt, sql } from 'drizzle-orm';
import { z } from 'zod';
import { uploadToImageKit } from '@/lib/imagekit';
import { randomUUID } from 'crypto';

const orderSchema = z.object({
  servicio: z.string().min(1),
  categoria: z.string().min(1),
  tipo: z.string().min(1),
  cantidad: z.coerce.number().int().min(1),
  link: z.string().optional().refine(v => !v || /^https?:\/\/.+/.test(v), "URL inválida"),
  precioUSD: z.coerce.number().positive(),
  precioCOP: z.coerce.number().positive(),
  customComments: z.string().optional(),
  paymentProof: z.string().optional(),
});

async function getAuthenticatedUserId() {
  const sessionId = (await cookies()).get('session')?.value;
  if (!sessionId) throw new Error("No autorizado");

  const session = await db.query.sessions.findFirst({
    columns: { userId: true, expiresAt: true },
    where: eq(sessions.id, sessionId),
  });

  if (!session || new Date(session.expiresAt * 1000) < new Date()) throw new Error("Sesión inválida o expirada");

  return session.userId;
}

export async function saveOrder(formData: FormData, isCheckout: boolean = false) {
  try {
    const userId = await getAuthenticatedUserId();

    // Extraer file si existe
    const file = formData.get('file') as File | null;
    let paymentProof: string | undefined;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      try {
        paymentProof = await uploadToImageKit(buffer, `payment-${Date.now()}-${file.name}`);
      } catch {
        paymentProof = 'Error al subir imagen';
      }
    }

    // Parseo seguro
    const raw = {
      servicio: formData.get('servicio'),
      categoria: formData.get('categoria'),
      tipo: formData.get('tipo'),
      cantidad: formData.get('cantidad'),
      link: formData.get('link'),
      precioUSD: formData.get('precioUSD'),
      precioCOP: formData.get('precioCOP'),
      customComments: formData.get('customComments'),
      paymentProof,
    };

    const validation = orderSchema.safeParse(raw);
    if (!validation.success) {
      const msg = Object.values(validation.error.flatten().fieldErrors).flat()[0];
      return { error: msg || "Datos inválidos" };
    }

    const data = validation.data;

    // -------------------------------
    //     🔥 TRANSACCIÓN ATÓMICA
    // -------------------------------
    await db.transaction(async (tx) => {

      if (!isCheckout) {
        // Leer usuario (balance) en 1 sola query
        const result = await tx.query.users.findFirst({
          columns: { balance: true },
          where: eq(users.id, userId),
        });

        if (!result) throw new Error("Usuario no encontrado");

        if (result.balance < data.precioUSD) {
          throw new Error("Saldo insuficiente");
        }

        // Descontar saldo
        await tx
          .update(users)
          .set({ balance: sql`${users.balance} - ${data.precioUSD}` })
          .where(eq(users.id, userId));
      }

      // Insert de la orden
      const orderId = randomUUID();
      await tx.insert(orders).values({
        id: orderId,
        userId,
        servicio: data.servicio,
        categoria: data.categoria,
        tipo: data.tipo,
        cantidad: data.cantidad,
        link: data.link || '',
        precioUsd: data.precioUSD.toString(),
        precioCop: data.precioCOP.toString(),
        customComments: data.customComments || null,
        paymentProof: data.paymentProof || null,
        status: "pendiente",
      });
    });

    return { success: true };

  } catch (err: any) {
    return { error: err.message || "Error al guardar el pedido" };
  }
}
