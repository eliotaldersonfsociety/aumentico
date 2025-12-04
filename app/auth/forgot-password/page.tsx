// app/auth/forgot-password/page.tsx
"use client";

import { useActionState } from "react";
import { forgotPassword } from "@/app/actions/auth/forgot-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail } from "lucide-react";
import SmallLogo from "@/public/logo/smalllogo";
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
      {pending ? "Enviando..." : "Enviar enlace de restablecimiento"}
      <Mail className="w-4 h-4 ml-2" />
    </Button>
  );
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(forgotPassword, { error: "", success: "" });

  return (
    <>
      <FloatingIconsBackground />

      <div className="min-h-screen flex flex-col bg-[oklch(0.145_0_0)]">
        <Header />

        <div className="pt-28 flex items-center justify-center p-4 flex-1">
          <div className="w-full max-w-md">
            <div className="glass-card p-8">
              <div className="pb-8"><SmallLogo /></div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Forgot password</h1>
                <p className="text-white font-extralight">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              <form action={formAction} className="space-y-6">
                {state?.error && (
                  <p className="text-red-400 text-sm text-center">{state.error}</p>
                )}
                {state?.success && (
                  <p className="text-green-400 text-sm text-center">{state.success}</p>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    className="bg-white/20 text-white"
                  />
                </div>

                <SubmitButton />
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-white font-extralight">
                  Remember your password?{" "}
                  <Link href="/auth/login" className="text-purple-500 font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}