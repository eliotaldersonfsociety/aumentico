// app/auth/login/page.tsx
"use client";

import { useActionState } from "react"; // useActionState correcto
import { login } from "@/app/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogIn } from "lucide-react";
import SmallLogo from "@/public/logo/smalllogo";
import { useTheme } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingIconsBackground } from "@/components/FloatingIconsBackground";

function SubmitButton() {
  const formStatus = require("react-dom").useFormStatus;
  const { pending } = formStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-pink-500 text-white hover:bg-pink-600"
    >
      {pending ? "Iniciando..." : "Iniciar Sesión"}
      <LogIn className="w-4 h-4 ml-2" />
    </Button>
  );
}

export default function LoginPage() {
  const { theme } = useTheme();
  const [state, formAction] = useActionState(login, { error: "" });

  return (
    <>
      <FloatingIconsBackground />

      {/* CONTENEDOR PRINCIPAL QUE OBLIGA AL FOOTER A IR ABAJO */}
      <div className="min-h-screen flex flex-col bg-[oklch(0.145_0_0)]">
        <Header />

        {/* CONTENIDO QUE OCUPA EL ESPACIO DISPONIBLE */}
        <div className="pt-28 flex items-center justify-center p-4 flex-1">
          <div className="w-full max-w-md">
            <div className="glass-card p-8">
              <div className="pb-8"><SmallLogo /></div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Bienvenido de vuelta</h1>
                <p className="text-white font-extralight">
                  Ingresa tu email para iniciar sesión en tu cuenta
                </p>
              </div>

              <form action={formAction} className="space-y-6">
                {state?.error && (
                  <p className="text-red-400 text-sm text-center">{state.error}</p>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
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
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-white">Contraseña</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-white hover:text-gray-300"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="bg-white/20 text-white"
                  />
                </div>

                <SubmitButton />
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-white font-extralight">
                  ¿No tienes cuenta?{" "}
                  <Link href="/auth/register" className="text-purple-500 font-semibold">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER SIEMPRE ABAJO */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
