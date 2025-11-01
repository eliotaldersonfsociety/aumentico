"use client"

import { Shield, Zap, HeadphonesIcon, TrendingUp } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Entrega Rápida",
      description: "Comenzamos a procesar tu orden inmediatamente. La mayoría de servicios se completan en 24-48 horas.",
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Todos nuestros servicios cumplen con las políticas de las plataformas. No requieren contraseña.",
    },
    {
      icon: TrendingUp,
      title: "Crecimiento Real",
      description: "Trabajamos con usuarios reales y activos. Sin bots, sin cuentas falsas, solo crecimiento orgánico.",
    },
    {
      icon: HeadphonesIcon,
      title: "Soporte 24/7",
      description: "Nuestro equipo está disponible las 24 horas para ayudarte con cualquier pregunta o problema.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">¿Por Qué Elegirnos?</h2>
        <p className="text-lg text-muted-foreground">Ofrecemos los mejores servicios con garantía de calidad</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <feature.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground text-pretty">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
