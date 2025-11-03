// app/dashboard/send/actions.ts
"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type CorreoState =
  | { success: true; message: string }
  | { success: false; error: string };

export async function enviarCorreoCorporativo(
  prevState: CorreoState,
  formData: FormData
): Promise<CorreoState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Faltan campos obligatorios" };
  }

  try {
    await resend.emails.send({
      from: "Aumento de Seguidores <hola@aumentodeseguidores.com>",
      to: [email],
      subject: subject || `Hola, ${name} - Aumento de Seguidores`,
      html: `
      <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; padding: 40px 0;">
        <div style="max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <div style="background-color: white; text-align: center; padding: 24px;">
            <img 
              src="https://i.ibb.co/YstmBVy/Dise-o-sin-t-tulo.png"
              alt="Aumento de Seguidores"
              width="260"
              style="display:block;margin:0 auto;border-radius:10px;"
            />
          </div>

          <!-- Main content -->
          <div style="padding: 32px 40px;">
            <h2 style="color: #111827; text-align: center; margin-top: 0;">Aumento de Seguidores</h2>
            <p style="text-align: center; color: #6b7280; margin-bottom: 32px;">
              Crecimiento orgánico y real en tus redes sociales 🚀
            </p>

            <p style="color: #111827;">Hola <strong>${name}</strong>,</p>

            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #ef476f; margin: 16px 0; color: #374151;">
              ${message.replace(/\n/g, "<br />")}
            </div>

            <p style="color: #111827;">¿Te gustaría hablar más? Escríbenos por WhatsApp:</p>

            <div style="text-align: center; margin-top: 24px;">
              <a href="https://wa.me/3219412929" target="_blank" 
                style="background: #25D366; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">
                Contactar por WhatsApp
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 24px; text-align: center; font-size: 13px; color: #6b7280;">
            <!-- Social Links -->
            <div style="margin-bottom: 16px;">
              <a href="https://facebook.com/bucaramarketing" style="margin: 0 8px;">
                <img src="https://img.icons8.com/ios-filled/50/facebook-new.png" alt="Facebook" width="16" height="16" style="border-radius: 50%;">
              </a>
              <a href="https://x.com/bucaramarketing" style="margin: 0 8px;">
                <img src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" alt="Twitter" width="16" height="16" style="border-radius: 50%;">
              </a>
              <a href="https://instagram.com/aumentodeseguidres" style="margin: 0 8px;">
                <img src="https://img.icons8.com/ios-filled/50/instagram-new--v1.png" alt="Instagram" width="16" height="16" style="border-radius: 50%;">
              </a>
            </div>

            <p style="margin: 0 0 6px 0;">© 2025 Aumento de Seguidores. Todos los derechos reservados.</p>
            <p style="margin: 0 0 6px 0;">Colombia • <a href="mailto:hola@aumentodeseguidores.com" style="color: #667eea; text-decoration: none;">hola@aumentodeseguidores.com</a></p>
            <p style="margin: 0;"><a href="https://aumentodeseguidores.com" style="color: #999999; text-decoration: underline;">Cancelar suscripción</a></p>
          </div>

        </div>
      </div>
      `,
    });

    return { success: true, message: "Correo enviado con éxito" };
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return {
      success: false,
      error: "No se pudo enviar el correo. Inténtalo más tarde.",
    };
  }
}
