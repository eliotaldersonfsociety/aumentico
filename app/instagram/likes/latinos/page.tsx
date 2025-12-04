"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, MessageCircle, UserPlus, Eye, Share2, Star, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { addToCart, getCartCount, getCart, removeFromCart, CartItem } from "@/lib/cart"

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
    name: "1000 Likes Latinos",
    quantity: 1000,
    price: 2.50,
    icon: Heart,
    description: "Likes latinos para Instagram",
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
    name: "10000 Likes Latinos",
    quantity: 10000,
    price: 22,
    icon: Heart,
    description: "Likes latinos para Instagram",
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
    name: "5000 Likes Latinos",
    quantity: 5000,
    price: 12,
    icon: Heart,
    description: "Likes latinos para Instagram",
    deliveryTime: "1 - 3 días",
    image: "/5000l.png",
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
]

export default function InstagramPage() {
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const updateCart = () => {
      const items = getCart();
      setCartItems(items);
      setCartCount(items.length);
    };
    updateCart();

    window.addEventListener('cartUpdated', updateCart);
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, []);

  const handleAddToCart = (service: Service) => {
    const cartItem: CartItem = {
      id: service.id,
      name: service.name,
      quantity: service.quantity,
      price: service.price,
      categoria: 'Instagram Likes',
      tipo: 'likes'
    };
    console.log('Adding to cart:', cartItem);
    addToCart(cartItem);
    console.log('Cart after add:', getCart());
    setShowCart(true);
  }

  return (
    <>
      <Header />
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
                      onClick={() => handleAddToCart(service)}
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

      </main>

      {/* Side Cart Panel */}
      {showCart && (
        <div className="fixed top-0 right-0 h-full w-80 bg-[oklch(0.145_0_0)] shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
          <div className="flex flex-col h-full">

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/20">
              <h2 className="text-xl font-bold text-white">Carrito ({cartCount})</h2>
              <Button
                onClick={() => setShowCart(false)}
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <p className="text-white text-center">Tu carrito está vacío</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-white/10 rounded-lg p-3"
                    >
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm">{item.name}</p>
                        <p className="text-white/80 text-xs">Cantidad: {item.quantity}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <p className="text-white font-bold">${item.price.toFixed(2)}</p>
                        <Button
                          onClick={() => {
                            removeFromCart(item.id);
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:bg-red-400/20 h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/20 p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white font-semibold">Total:</span>
                  <span className="text-purple-gradient font-bold text-lg">
                    ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                  </span>
                </div>

                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                  onClick={() => {
                    // Open confirmation modal
                    if (confirm(`¿Confirmar pedido por $${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}?`)) {
                      const item = cartItems[0]; // For now, take first item
                      const params = new URLSearchParams({
                        servicio: item.name,
                        categoria: item.categoria,
                        tipo: item.tipo,
                        cantidad: item.quantity.toString(),
                        precioUSD: item.price.toString(),
                        precioCOP: Math.round(item.price * 4200).toString()
                      });
                      window.location.href = `/checkout?${params.toString()}`;
                    }
                  }}
                >
                  Proceder al Pago
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
