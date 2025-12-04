"use client";

import { register } from "@/app/actions/auth/register";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import SmallLogo from "@/public/logo/smalllogo";
import { useTheme } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingIconsBackground } from "@/components/FloatingIconsBackground";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-pink-500 text-white hover:bg-pink-600"
    >
      {pending ? "Creando..." : "Crear Cuenta"}
      <UserPlus className="w-4 h-4 ml-2" />
    </Button>
  );
}

export default function RegisterPage() {
  const { theme } = useTheme();
  const [state, setState] = useState<{ message?: string }>({ message: "" });

  async function handleRegister(formData: FormData) {
    try {
      setState({ message: "" });
      await register(formData);
    } catch (error) {
      setState({
        message:
          error instanceof Error
            ? error.message
            : "Error al crear la cuenta",
      });
    }
  }

  return (
    <>
      <FloatingIconsBackground />

      {/* CONTENEDOR PRINCIPAL PARA QUE EL FOOTER SE QUEDE ABAJO */}
      <div className="min-h-screen flex flex-col bg-[oklch(0.145_0_0)]">
        <Header />

        {/* CONTENIDO DE LA PÁGINA QUE OCUPA EL ESPACIO */}
        <div className="pt-28 flex items-center justify-center p-6 md:p-28 flex-1">
          <div className="w-full max-w-md">
            <div className="glass-card p-8">
              <div className="pb-8">
                <SmallLogo />
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Crear cuenta
                </h1>
                <p className="text-white font-extralight">
                  Introduce tus datos para crear tu cuenta
                </p>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  await handleRegister(formData);
                }}
                className="space-y-6"
              >
                {state?.message && (
                  <p className="text-red-400 text-sm">{state.message}</p>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Nombre Completo
                  </Label>
                  <Input
                    name="name"
                    id="name"
                    placeholder="Juan Pérez"
                    required
                    className="bg-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className="bg-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Teléfono
                  </Label>
                  <Input
                    name="phone"
                    id="phone"
                    type="tel"
                    placeholder="+57 300 123 4567"
                    required
                    className="bg-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Contraseña
                  </Label>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="bg-white/20 text-white"
                  />
                </div>

                <SubmitButton />
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-white font-extralight">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    href="/auth/login"
                    className="text-purple-500 font-semibold"
                  >
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER SIEMPRE AL FINAL */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
