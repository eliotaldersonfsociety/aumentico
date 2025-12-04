"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, MessageCircle, UserPlus, Eye, Share2, Star, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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

const instagramServices: Service[] = [
  {
    id: "likes-1000",
    name: "1000 Likes Mundiales",
    quantity: 1000,
    price: 2.50,
    icon: Heart,
    description: "Likes Mundiales para Instagram",
    deliveryTime: "1 hora - 24 horas",
    image: "/1000l.png",
    features: [
      "Likes latinos",
      "Entrega garantizada",
      "Soporte 24/7",
      "Sin contraseña requerida",
      "Seguimiento en tiempo real",
      "Reembolso garantizado",
      "Link de Instagram requerido"
    ]
  },
  {
    id: "likes-10000",
    name: "10000 Likes Mundiales",
    quantity: 10000,
    price: 22,
    icon: Heart,
    description: "Likes mundiales para Instagram",
    deliveryTime: "5 - 7 días",
    image: "/10000l.png",
    features: [
      "Likes latinos",
      "Entrega garantizada",
      "Soporte 24/7",
      "Sin contraseña requerida",
      "Seguimiento en tiempo real",
      "Reembolso garantizado",
      "Link de Instagram requerido"
    ]
  },
  {
    id: "likes-5000",
    name: "5000 Likes Mundiales",
    quantity: 5000,
    price: 12,
    icon: Heart,
    description: "Likes Mundiales para Instagram",
    deliveryTime: "1 - 3 días",
    image: "/5000l.png",
    features: [
      "Likes Mundiales",
      "Entrega garantizada",
      "Soporte 24/7",
      "Sin contraseña requerida",
      "Seguimiento en tiempo real",
      "Reembolso garantizado",
      "Link de Instagram requerido"
    ]
  },
]

export default function InstagramPage() {
  const [cart, setCart] = useState<Service[]>([])
  const [showCart, setShowCart] = useState(false)
  const router = useRouter()

  const addToCart = (service: Service) => {
    setCart([...cart, service])
    setShowCart(true)
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      <Header cartCount={cart.length} onCartClick={() => setShowCart(true)} />
      <main className="min-h-screen pt-32">

        {/* Hero Section */}
        <section className="py-5 bg-[oklch(0.145_0_0)] text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-purple-gradient mb-6">
              Servicios de Likes Latinos
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto mb-8">
              Aumenta tu presencia en Instagram con likes, comentarios y más.
              Servicios reales y de calidad garantizada.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instagramServices.map((service) => (
                <Card
                  key={service.id}
                  className={`relative bg-white/10 backdrop-blur-md border-white/20
                  ${service.id === "likes-10000" ? "border-purple-500 border-2" : ""}`}
                >
                  <CardHeader>
                    <div className="text-center mb-4 relative">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />

                      {service.id === "likes-10000" && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-purple-500 text-white flex items-center gap-1 rounded-full px-4 py-1 shadow-lg">
                          <Star className="h-4 w-4 text-yellow-400" />
                          Mejor Valor
                        </Badge>
                      </div>
                    )}

                    </div>

                    <div className="flex items-center gap-3">
                      <service.icon className="h-8 w-8 text-white" />
                      <div>
                        <CardTitle className="text-white">{service.name}</CardTitle>
                        <CardDescription className="text-white/80">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-gradient">${service.price.toFixed(2)} USD</p>
                      <p className="text-lg text-white/80">${Math.round(service.price * 4200).toLocaleString("es-CO")} COP</p>

                      <Badge variant="secondary" className="mt-2 bg-white/20 text-white">
                        Cantidad: {service.quantity}
                      </Badge>

                      <p className="text-sm text-white/80 mt-2">
                        Tiempo de entrega: {service.deliveryTime}
                      </p>

                      <div className="mt-4 space-y-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-left">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-white">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={() => addToCart(service)}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      Agregar al Carrito
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Shopping Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[oklch(0.145_0_0)] rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Carrito de Compras</h2>
                <Button
                  onClick={() => setShowCart(false)}
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>

              {cart.length === 0 ? (
                <p className="text-white text-center">Tu carrito está vacío</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex items-center justify-between bg-white/10 rounded-lg p-4"
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
                            onClick={() => removeFromCart(`${item.id}-${index}`)}
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

                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white font-semibold">Subtotal:</span>
                      <span className="text-white font-bold">${total.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                      <span className="text-white font-semibold">Total:</span>
                      <span className="text-purple-gradient font-bold text-xl">${total.toFixed(2)}</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-white mb-2">Código de Cupón</label>
                        <input
                          type="text"
                          placeholder="Ingresa código de cupón"
                          className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/50"
                        />
                      </div>

                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="terms" className="mt-1" />
                        <label htmlFor="terms" className="text-white text-sm">
                          Acepto los Términos (Requerido).
                          Puedes leer nuestros{" "}
                          <a href="/terms" className="text-purple-gradient underline">términos y condiciones</a>.
                        </label>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                          onClick={() => router.push('/checkout')}
                        >
                          Pagar ${total.toFixed(2)}
                        </Button>

                        <Button variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/20">
                          Pagar con Crypto
                        </Button>
                      </div>

                      <p className="text-white/80 text-sm text-center">
                        Paga de forma segura con nuestro procesador de pagos
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
