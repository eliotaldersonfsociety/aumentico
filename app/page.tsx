// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PricingSelector } from "@/components/pricing-selector";
import { InstagramServices } from "@/components/InstagramServices";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { initDemoData } from "@/lib/init-demo-data";
import { Gallery } from "@/components/gallery";
import { FAQ } from "@/components/faq";
import YouTubeVideoSimulator from '@/components/YouTubeVideoSimulator';
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";

const FollowerGrowthSimulator = dynamic(() => import("@/components/FollowerGrowthSimulator"), {
  ssr: false,
  loading: () => (
    <div className="bg-white min-h-screen font-sans relative">
      {/* Header skeleton */}
      <div className="sticky top-0 bg-white z-10 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-4"></div>
        </div>
        <div className="flex space-x-4">
          <div className="h-5 bg-gray-200 rounded w-5"></div>
          <div className="h-5 bg-gray-200 rounded w-5"></div>
          <div className="h-5 bg-gray-200 rounded w-5"></div>
        </div>
      </div>

      {/* Profile skeleton */}
      <div className="px-4 py-4">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="flex space-x-6">
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="flex border-b mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1 p-3">
              <div className="h-6 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>

        {/* Posts grid skeleton */}
        <div className="grid grid-cols-3 gap-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200"></div>
          ))}
        </div>
      </div>

      {/* Bottom navigation skeleton */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-6 bg-gray-200 rounded w-6 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-8"></div>
          </div>
        ))}
      </div>
    </div>
  )
});

interface Service {
  id: string
  name: string
  quantity: number
  price: number
  icon: any
  description: string
  deliveryTime: string
  features: string[]
  image: string
}

export default function Home() {
  const router = useRouter();
  const [services, setServices] = useState<any>(null);
  const [cart, setCart] = useState<Service[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    initDemoData();
  }, []);

  useEffect(() => {
    fetch('/services-index.json')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  const addToCart = (service: Service) => {
    setCart([...cart, service])
    setShowCart(true)
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  useEffect(() => {
    if (!services || typeof services !== 'object') return;

    const interval = setInterval(() => {
      const platforms = Object.keys(services).filter(p => {
        const plat = services[p];
        return plat && plat.categories && typeof plat.categories === 'object' && Object.keys(plat.categories).length > 0;
      });
      if (platforms.length === 0) return;

      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const platData = services[platform];
      if (!platData || !platData.categories) return;

      const categories = Object.keys(platData.categories);
      const category = categories[Math.floor(Math.random() * categories.length)];
      const catData = platData.categories[category];
      if (!catData || !catData.types || typeof catData.types !== 'object') return;

      const types = Object.keys(catData.types).filter(t => t === 'seguidores'); // Solo seguidores
      if (types.length === 0) return;

      const type = types[Math.floor(Math.random() * types.length)];
      const typeData = catData.types[type];
      if (!typeData || !typeData.services || typeof typeData.services !== 'object') return;

      const serviceKeys = Object.keys(typeData.services);
      if (serviceKeys.length === 0) return;

      const serviceKey = serviceKeys[Math.floor(Math.random() * serviceKeys.length)];
      const service = typeData.services[serviceKey];
      if (!service || typeof service.minQuantity !== 'number' || typeof service.maxQuantity !== 'number') return;

      // Limitar cantidad entre 100 y 8000
      const minQ = Math.max(100, service.minQuantity);
      const maxQ = Math.min(8000, service.maxQuantity);
      if (minQ > maxQ) return; // Si no hay rango válido, skip
      const quantity = Math.floor(Math.random() * (maxQ - minQ + 1)) + minQ;

      const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

      // Generar username aleatorio
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const username = Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      const fakeUser = `@${username}***`;

      const message = `${fakeUser} acaba de comprar ${quantity} seguidores para ${platformName}!`;
      toast.success(message, { duration: 3000 + Math.random() * 6000 });
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [services]);

  return (
    <>
      <main className="min-h-screen pt-32">
        <Header cartCount={cart.length} onCartClick={() => setShowCart(true)} />
        <section id="hero">
          <Hero />
        </section>
        <section id="pricing">
          <PricingSelector />
        </section>
        <InstagramServices addToCart={addToCart} />
        <Gallery />
        <section id="features">
          <Features />
        </section>

        {/* Sección del simulador con texto grande al lado */}
        <div className="px-6 py-2 sm:px-8 sm:py-4 md:px-10 md:py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 md:gap-4">
              {/* Texto grande */}
              <div className="flex-1">
                <h2 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-purple-gradient leading-tight animate-slide-in-left">
                  Impulsa tu presencia en redes como nunca antes
                </h2>
                <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-foreground max-w-2xl animate-slide-in-left">
                  Visualiza en tiempo real cómo crecerán tus seguidores con nuestras estrategias probadas. Aumenta tu alcance, engagement y autoridad digital con herramientas diseñadas para creadores que quieren destacar. Ya sea que estés comenzando o ya tengas una audiencia, nuestro simulador te muestra el potencial real de crecimiento mes a mes, basado en datos reales de algoritmos y tendencias actuales.
                </p>
              </div>

              {/* Simulador */}
              <div className=" w-full max-w-lg animate-slide-in-right">
                <FollowerGrowthSimulator />
              </div>
            </div>
          </div>
        </div>

        <section id="faq">
          <div className="
            px-6 py-1 sm:px-8 sm:py-1 md:px-10 md:py-1 
            flex flex-col 
            gap-y-10
            md:flex-row 
            md:gap-x-10 
            md:gap-y-0 
            items-start
            max-w-7xl mx-auto w-full box-border
          ">


          {/* YouTube a la izquierda en desktop, abajo en móvil */}
          <div className="flex-1 w-full md:w-1/2 order-2 md:order-1">
            <YouTubeVideoSimulator />
          </div>

          {/* FAQ arriba en móvil, derecha en desktop */}
          <div className="flex-1 w-full md:w-1/2 order-1 md:order-2">
            <FAQ />
          </div>
          </div>
        </section>



        <Footer />
      </main>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed top-0 right-0 h-full w-80 bg-[oklch(0.145_0_0)] shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
          <div className="flex flex-col h-full">

            {/* Header fijo */}
            <div className="flex-shrink-0 p-4 border-b border-white/20">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-white">Carrito de Compras</h2>
                <Button
                  onClick={() => setShowCart(false)}
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
              {cart.length > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Total:</span>
                  <span className="text-purple-gradient font-bold text-lg">${total.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Contenido con scroll */}
            <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {cart.length === 0 ? (
                <p className="text-white text-center p-4">Tu carrito está vacío</p>
              ) : (
                <div className="p-4 space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex items-center justify-between bg-white/10 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-6 w-6 text-white" />
                        <div>
                          <p className="text-white font-semibold">{item.name}</p>
                          <p className="text-white/80 text-sm">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="text-white font-bold">${item.price.toFixed(2)}</p>
                        <Button
                          onClick={() => removeFromCart(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:bg-red-400/20"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer fijo */}
            {cart.length > 0 && (
              <div className="flex-shrink-0 p-4 border-t border-white/20">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCart(false)}
                  >
                    Continuar Comprando
                  </Button>
                  <Button
                    size="sm"
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                    onClick={() => {
                      // Guardar el carrito local en el almacenamiento global
                      localStorage.setItem('cart', JSON.stringify(cart));
                      router.push('/checkout');
                    }}
                  >
                    Proceder al Pago
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
}