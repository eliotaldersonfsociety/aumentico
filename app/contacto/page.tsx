"use client";

import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendEmail } from "../actions/about-us";

export default function AboutUsPage() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    const formData = new FormData(e.currentTarget);
    const res = await sendEmail(formData);

    if (res?.success) {
      setState("done");
      e.currentTarget?.reset?.();
    } else {
      setState("error");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5] flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 p-6">
            Contactenos
          </h1>

          {/* 🔹 Contenedor general: card del formulario + animación Lottie */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* 🧾 Card del formulario (lado izquierdo) */}
            <div className="glass-card p-6 md:p-8 rounded-2xl w-full md:w-1/2 space-y-6">
              <h2 className="text-2xl font-semibold text-center md:text-left mb-4">
                Contáctanos
              </h2>
              <p className="text-center md:text-left text-white/90">
                ¿Tienes dudas o sugerencias? Escríbenos a:
                <strong> hola@aumentodeseguidores.com</strong>
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 w-full max-w-md mx-auto md:mx-0"
              >
                <Input name="name" type="text" placeholder="Tu nombre" required />
                <Input name="email" type="email" placeholder="Tu correo electrónico" required />
                <Input name="whatsapp" type="tel" placeholder="Tu número de WhatsApp" required />
                <Input name="country" type="text" placeholder="País" required />
                <Input name="city" type="text" placeholder="Ciudad" required />
                <Textarea name="message" placeholder="Escribe tu mensaje..." rows={4} required />

                <Button
                  type="submit"
                  disabled={state === "sending"}
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  {state === "sending"
                    ? "Enviando..."
                    : state === "done"
                    ? "✅ Enviado"
                    : "Enviar mensaje"}
                </Button>

                {state === "error" && (
                  <p className="text-red-200 text-center">❌ Error al enviar el mensaje</p>
                )}
              </form>
            </div>

            {/* 🎬 Animación Lottie (afuera de la card, lado derecho) */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <DotLottieReact
                src="https://lottie.host/32e485bb-4198-40ac-b856-4e01f04e566e/b90G1gk8Id.lottie"
                loop
                autoplay
                style={{ width: 420, height: 420 }}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
