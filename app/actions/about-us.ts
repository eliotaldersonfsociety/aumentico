"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const country = formData.get("country") as string;
  const city = formData.get("city") as string;
  const message = formData.get("message") as string;

  // Validación básica (opcional pero recomendada)
  if (!name || !email || !whatsapp) {
    return { success: false, error: "Faltan campos obligatorios" };
  }

  try {
    await resend.emails.send({
      from: "Aumento de Seguidores <no-reply@aumentodeseguidores.com>",
      to: ["aldersonelliot803@gmail.com"],
      subject: `📩 Nuevo contacto de ${name} - ${city}, ${country}`,
      replyTo: email,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo mensaje - Aumento de Seguidores</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #1f2937;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 24px 32px; text-align: center;">
        <div style="font-size: 24px; font-weight: 800; color: white; display: flex; align-items: center; justify-content: center; gap: 10px;">
          <span>📈</span>
          Aumento de Seguidores
        </div>
        <p style="color: rgba(255,255,255,0.9); margin-top: 4px; font-size: 14px;">
          Nuevo mensaje desde el formulario de contacto
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 28px 32px;">
        <h2 style="margin: 0 0 20px; font-size: 20px; color: #1e293b;">Detalles del contacto</h2>

        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 15px; line-height: 1.6;">
          <tr>
            <td width="30%" style="font-weight: 600; color: #4b5563;">👤 Nombre:</td>
            <td style="color: #111827;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #4b5563; padding-top: 12px;">✉️ Correo:</td>
            <td style="color: #111827; padding-top: 12px;">${email}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #4b5563; padding-top: 12px;">📱 WhatsApp:</td>
            <td style="color: #111827; padding-top: 12px;">${whatsapp}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #4b5563; padding-top: 12px;">🌎 País:</td>
            <td style="color: #111827; padding-top: 12px;">${country}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #4b5563; padding-top: 12px;">🏙️ Ciudad:</td>
            <td style="color: #111827; padding-top: 12px;">${city}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <p style="font-weight: 600; color: #4b5563; margin: 0;">💬 Mensaje:</p>
          <div style="background: #f3f4f6; padding: 14px; border-radius: 8px; margin-top: 8px; color: #111827; white-space: pre-wrap; font-family: inherit;">
            ${message || "<em>Sin mensaje</em>"}
          </div>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 13px;">
        Este mensaje fue enviado desde el formulario de contacto de <strong>Aumento de Seguidores</strong>.<br />
        Por favor, responde directamente a este correo o contacta al cliente por WhatsApp.
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      text: `
NUEVO MENSAJE - Aumento de Seguidores

Nombre: ${name}
Correo: ${email}
WhatsApp: ${whatsapp}
País: ${country}
Ciudad: ${city}

Mensaje:
${message}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error enviando correo:", error);
    return { success: false, error: (error as Error).message };
  }
}
