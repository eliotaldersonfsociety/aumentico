"use client";

import React, { useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { sendEmail } from "../actions/about-us";

export default function ContactPage() {
  const [state, setState] = useState("idle");

  interface EmailResponse {
    success: boolean;
  }

  type FormState = "idle" | "sending" | "done" | "error";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setState("sending");

    const formData = new FormData(e.currentTarget);
    const res = await sendEmail(formData) as EmailResponse | undefined;

    if (res?.success) {
      setState("done");
      e.currentTarget?.reset?.();
    } else {
      setState("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-3">Contáctanos</h1>
        <p className="text-center text-white/70 mb-10">
          Estamos aquí para ayudarte con cualquier duda sobre nuestros servicios de crecimiento en redes.
        </p>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* CARD 1 */}
            <Card className="bg-[#111]/80 border border-white/10 shadow-lg rounded-2xl">
              <CardContent className="p-6 flex gap-4">
                <div className="bg-purple-600 rounded-xl w-12 h-12 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Soporte por Email</h3>
                  <p className="text-white/70">Asistencia para tus órdenes o dudas técnicas.</p>
                  <p className="mt-2 font-medium">soporte@aumentodeseguidores.com</p>
                  <span className="text-xs text-white/50">Tiempo de respuesta: 24-48 horas</span>
                </div>
              </CardContent>
            </Card>

            {/* CARD 2 */}
            <Card className="bg-[#111]/80 border border-white/10 shadow-lg rounded-2xl">
              <CardContent className="p-6 flex gap-4">
                <div className="bg-purple-600 rounded-xl w-12 h-12 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Chat en Vivo</h3>
                  <p className="text-white/70">Soporte instantáneo para casos urgentes.</p>
                  <p className="mt-2 font-medium">Disponible 24/7 en nuestro servidor de Discord.</p>
                  <span className="text-xs text-white/50">Únete a nuestra comunidad para soporte rápido.</span>
                </div>
              </CardContent>
            </Card>

            {/* CARD 3 */}
            <Card className="bg-[#111]/80 border border-white/10 shadow-lg rounded-2xl">
              <CardContent className="p-6 flex gap-4">
                <div className="bg-purple-600 rounded-xl w-12 h-12 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Horario de Atención</h3>
                  <p className="text-white/70">Nuestro equipo está disponible en los siguientes horarios:</p>
                  <p className="mt-2 font-medium">Lunes - Viernes: 9 AM - 6 PM</p>
                  <p className="font-medium">Sábado: 10 AM - 4 PM</p>
                  <p className="font-medium">Domingo: Soporte de emergencia</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE - FORM FULL HEIGHT */}
          <Card className="bg-[#111]/80 border border-white/10 shadow-lg rounded-2xl h-full">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-3">Envíanos un Mensaje</h2>
              <p className="text-white/70 mb-6">
                ¿Tienes una pregunta o necesitas ayuda? Nuestro equipo te responderá lo antes posible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" type="text" placeholder="Tu nombre" required className="bg-black/30" />
                <Input name="email" type="email" placeholder="Tu correo" required className="bg-black/30" />
                <Input name="subject" type="text" placeholder="Asunto" required className="bg-black/30" />
                <Textarea name="message" placeholder="Escribe tu mensaje..." required className="bg-black/30" style={{ height: "246px" }}/>


                <Button
                  type="submit"
                  disabled={state === "sending"}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {state === "sending"
                    ? "Enviando..."
                    : state === "done"
                    ? "✔ Mensaje enviado"
                    : "Enviar mensaje"}
                </Button>

                {state === "error" && (
                  <p className="text-red-400 text-center">❌ Ocurrió un error al enviar el mensaje</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ SECTION */}
        <h2 className="text-3xl font-semibold text-center mt-20 mb-10">Preguntas Frecuentes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#111]/80 border border-white/10 p-6 rounded-2xl">
            <h3 className="font-semibold text-lg mb-2">¿Cómo funcionan los aumentos de seguidores?</h3>
            <p className="text-white/70">
              Nuestro sistema optimiza tu exposición y posicionamiento para atraer seguidores reales y activos a tu cuenta.
            </p>
          </Card>

          <Card className="bg-[#111]/80 border border-white/10 p-6 rounded-2xl">
            <h3 className="font-semibold text-lg mb-2">¿Puedo pedir un reembolso?</h3>
            <p className="text-white/70">
              Sí, contamos con una política de reembolso de 48 horas si ocurre algún inconveniente que nuestro equipo no pueda resolver.
            </p>
          </Card>

          <Card className="bg-[#111]/80 border border-white/10 p-6 rounded-2xl">
            <h3 className="font-semibold text-lg mb-2">¿Qué tan rápido suben los seguidores?</h3>
            <p className="text-white/70">
              Los aumentos suelen iniciar entre 5 y 20 minutos después del pago y pueden completarse en pocas horas, según el paquete.
            </p>
          </Card>

          <Card className="bg-[#111]/80 border border-white/10 p-6 rounded-2xl">
            <h3 className="font-semibold text-lg mb-2">¿Es seguro mi perfil?</h3>
            <p className="text-white/70">Sí, usamos protocolos seguros y nunca pedimos tu contraseña.</p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
