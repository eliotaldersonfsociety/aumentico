"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, UserPlus, Star, CheckCircle } from "lucide-react"

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
    id: "followers-1000",
    name: "1000 Seguidores Latinos",
    quantity: 1000,
    price: 15.00,
    icon: UserPlus,
    description: "Seguidores reales y activos para Instagram",
    deliveryTime: "1 hora - 24 horas",
    image: "/1000s.png",
    features: [
      "Seguidores reales y activos",
      "Entrega garantizada",
      "Soporte 24/7",
      "Sin contraseña requerida",
      "Seguimiento en tiempo real",
      "Reembolso garantizado",
      "Link de Instagram requerido"
    ]
  },
  {
    id: "followers-10000",
    name: "10000 Seguidores Latinos",
    quantity: 10000,
    price: 120.00,
    icon: UserPlus,
    description: "Seguidores reales y activos para Instagram",
    deliveryTime: "5 - 7 días",
    image: "/10000s.png",
    features: [
      "Seguidores reales y activos",
      "Entrega garantizada",
      "Soporte 24/7",
      "Sin contraseña requerida",
      "Seguimiento en tiempo real",
      "Reembolso garantizado",
      "Link de Instagram requerido"
    ]
  },
  {
    id: "followers-5000",
    name: "5000 Seguidores Latinos",
    quantity: 5000,
    price: 65.00,
    icon: UserPlus,
    description: "Seguidores reales y activos para Instagram",
    deliveryTime: "1 - 3 días",
    image: "/5000s.png",
    features: [
      "Seguidores reales y activos",
      "Entrega garantizada",
      "Soporte 24/7",
      "Sin contraseña requerida",
      "Seguimiento en tiempo real",
      "Reembolso garantizado",
      "Link de Instagram requerido"
    ]
  },
]

interface InstagramServicesProps {
  addToCart: (service: Service) => void
}

export function InstagramServices({ addToCart }: InstagramServicesProps) {
  const router = useRouter()

  return (
    <>
      {/* Services Grid */}
      <section className="py-5 bg-[oklch(0.145_0_0)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-gradient mb-4">
              Servicios Destacados de Instagram
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Aumenta tu presencia en Instagram con seguidores latinos reales y de calidad garantizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instagramServices.map((service) => (
              <Card
                key={service.id}
                className={`relative bg-white/10 backdrop-blur-md border-white/20
                ${service.id === "followers-10000" ? "border-purple-500 border-2" : ""}`}
              >
                <CardHeader>
                  <div className="text-center mb-4 relative">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />

                    {service.id === "followers-10000" && (
                      <div className="mt-2">
                        <Badge className="bg-purple-500 text-white flex items-center gap-1">
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
    </>
  )
}