// app/dashboard/send/page.tsx
"use client";

import { useActionState } from "react";
import { enviarCorreoCorporativo, CorreoState } from "@/app/actions/send";
import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/dashboard/admin-header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { validateSession } from "@/app/actions/auth/validate-session";
import { useRouter } from "next/navigation";

export default function EnviarCorreoCorporativo() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const initialState: CorreoState = { success: false, error: "" };

  // ✅ Hooks siempre al inicio
  const [state, formAction] = useActionState(enviarCorreoCorporativo, initialState);

  // Verificar sesión
  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateSession();
        if (result.valid && result.user) {
          setUser(result.user);
        } else {
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  // Reset del formulario si envío fue exitoso
  useEffect(() => {
    if (state.success) {
      const form = document.getElementById("correo-form") as HTMLFormElement;
      form?.reset();
    }
  }, [state]);

  // Render condicional
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Cargando...</h1>
          <p>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      {/* Header fijo */}
      <div className="fixed top-0 left-0 w-full z-50">
        <AdminHeader
          userName={user.name}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      {/* Contenedor del formulario */}
      <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "24px", color: "#1f2937", padding: "50px" }}>
          Enviar Correo Corporativo
        </h1>

        {/* Mensajes de estado */}
        {state.success && (
          <div style={{
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            backgroundColor: "#d1fae5",
            color: "#065f46",
          }}>
            ✅ {state.message}
          </div>
        )}

        {state.error && (
          <div style={{
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
          }}>
            ❌ {state.error}
          </div>
        )}

        <form id="correo-form" action={formAction}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              Nombre del cliente
            </label>
            <input
              type="text"
              name="name"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "15px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              Correo del cliente
            </label>
            <input
              type="email"
              name="email"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "15px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              Asunto (opcional)
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Hola, [Nombre] - ¿Te interesa aumentar tus seguidores?"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "15px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              Mensaje
            </label>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Hola [Nombre], vimos tu perfil..."
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "15px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#ef476f",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "12px",
            }}
          >
            Enviar correo corporativo
          </button>
        </form>

        <div style={{ marginTop: "30px", fontSize: "13px", color: "#6b7280" }}>
          <p>📧 Desde: <strong>hola@aumentodeseguidores.com</strong></p>
        </div>
      </div>
    </>
  );
}
