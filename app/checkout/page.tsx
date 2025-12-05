import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Header cartCount={0} onCartClick={() => alert('Carrito disponible en la página de Instagram')} />
      <Suspense fallback={
        <main className="min-h-screen bg-[oklch(0.145_0_0)] text-white pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-4xl flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-2xl font-bold mb-4">Cargando...</h1>
              <p>Preparando checkout...</p>
            </div>
          </div>
        </main>
      }>
        <CheckoutForm />
      </Suspense>
      <Footer />
    </>
  );
}