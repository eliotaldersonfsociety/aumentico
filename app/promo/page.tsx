"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Gift, Star } from "lucide-react"
import Link from "next/link"

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

const promoService: Service = {
  id: 'promo-artistas',
  name: 'Paquete Premium para Artistas',
  quantity: 1,
  price: 0, // Gratuito como regalo
  icon: Star,
  description: 'Paquete especial con 20k vistas YouTube, 20k streams Spotify, 1M vistas TikTok',
  deliveryTime: '7-14 días',
  features: ['20,000 vistas en YouTube', '20,000 streams en Spotify', '1,000,000 vistas en TikTok'],
  image: '/promo.jpg'
}

export default function PromoPage() {
  const router = useRouter()
  const [cart, setCart] = useState<Service[]>([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (service: Service) => {
    setCart([...cart, service])
    setShowCart(true)
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  return (
    <div className="min-h-screen bg-[#0b0b0b] flex flex-col">
      <Header cartCount={cart.length} onCartClick={() => setShowCart(true)} />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-white">
          {/* Título */}
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4 bg-pink-500/20 text-pink-400 backdrop-blur-sm">
              <Gift className="h-4 w-4 mr-2" />
              Promoción Exclusiva
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-purple-gradient mb-6">
              Promoción Especial para Artistas
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto">
              ¡Solo para artistas creativos! Como regalo por tus compras, al alcanzar $5,000 en servicios durante todo el año, recibe un beneficio especial.
            </p>
          </div>

          {/* Contenido de la promoción */}
          <div className="glass-card p-6 md:p-8 rounded-2xl space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/20 rounded-full mb-6">
                <Star className="h-10 w-10 text-purple-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Beneficio por $5,000 en Compras Anuales
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: 'Helvetica, sans-serif' }}>
                Estamos comprometidos con apoyar a los artistas y creadores de contenido. Por eso, hemos creado esta promoción especial:
                al acumular compras por un total de $5,000 o más en nuestros servicios durante el año calendario,
                recibirás como regalo un paquete premium que incluye:
              </p>
              <ul className="text-lg leading-relaxed mb-6 space-y-2">
                <li>• 20,000 vistas en YouTube</li>
                <li>• 20,000 streams en Spotify</li>
                <li>• 1,000,000 vistas en TikTok</li>
              </ul>
              <p className="text-lg leading-relaxed mb-6">
                ¡Impulsa tu contenido artístico en múltiples plataformas!
              </p>
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-400">¿Cómo participar?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Realiza compras en nuestros servicios de aumento de seguidores, likes, comentarios, etc.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Acumula un total de $5,000 o más durante el año (enero a diciembre).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Contacta a nuestro soporte para reclamar tu regalo.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Recibe el paquete premium gratis: 20k vistas YouTube, 20k streams Spotify, 1M vistas TikTok.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-400">¿Quiénes pueden participar?</h3>
                <p className="leading-relaxed">
                  Esta promoción está diseñada exclusivamente para artistas, creadores de contenido, influencers y profesionales creativos.
                  Si eres músico, pintor, diseñador, fotógrafo, streamer o cualquier tipo de artista digital, esta oferta es para ti.
                </p>
                <p className="leading-relaxed">
                  Tu creatividad merece ser vista por más personas. ¡Aprovecha esta oportunidad para crecer tu comunidad!
                </p>
              </div>
            </div>

            {/* Llamado a acción */}
            <div className="text-center pt-6 border-t border-white/10">
              <p className="text-lg mb-6">
                ¿Listo para reclamar tu regalo? Agrega el paquete premium a tu carrito.
              </p>
              <Button
                size="lg"
                className="bg-pink-500 hover:bg-pink-600 text-white"
                onClick={() => addToCart(promoService)}
              >
                Agregar al Carrito
              </Button>
            </div>
          </div>
        </div>
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

      <Footer />
    </div>
  )
}