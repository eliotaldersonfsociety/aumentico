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
    <section className="container mx-auto px-4 py-16">
      {/* Contenedor principal con borde rasgado */}
      <div className="relative bg-white shadow-2xl p-8 md:p-12 overflow-hidden">

        {/* Borde superior rasgado negro */}
        <svg
          className="absolute top-0 left-0 w-full h-12"
          viewBox="0 0 1360 40"
          preserveAspectRatio="none"
        >
          <path
            d="M1360 40H0V4l1 1v1c1 1 2 2 4 1h16l1 1h8l1-1h13v1c3 0 6 0 8-4 11-1 22 1 33 3h4l2 1h5l15 5 1 1h1l15 5 7 1 2 1 4 1v1l1 1 2 1h24l6 2 3 1 3-1h2l5 1h3l1-1h3l1-1c2-2 4-2 6-2l1 1h2v1h1l8-1 1-1h1l7-1 4-2h1l3-1 5-1 1-1h2l1-1h1l8-4 1-1h2l2-1h7l2-1 3-2h1l9-3h8l4-1h6l22-2h8v1h4l6-1 2-1h11c7-2 15-1 23 1l6 2 2 1 4 1a75 75 0 0017 4l1-1h1c1 0 3 0 4 2 4-1 8 0 10 4l3 3 1 1h1v1l6 3 2 1 3 2h29c2 0 3 0 4-2v-1c1-2 2-2 4-2h11l12-1h7l16-2h10l2 1 9 2h1c3 1 6 1 8-1h1l7-2 6 1 3 1h2l4-1h2l2-1h3c2 2 4 3 6 2h1l2-1h14a47 47 0 007 0h5c4-1 9-1 13 1l5-1h5a60 60 0 0117-2h2l11 3h2l4-1h2l16 1 2 1h9l2 1 24-1h7l1 1h5l10-2 2-1 9-3h6l2 1a19 19 0 004 0h3l3 1v-1h14c3 0 6 0 9 2l3 1 1 1h4a64 64 0 0018 0h10l2-1a94 94 0 0125 1h1l3-1h3a42 42 0 0116 0l4 1 2 1 17 1h8l23 4 8 1a1111 1111 0 0115 3h1c2 2 5 2 7 1 2-2 5-2 7-2h6c2 0 3 1 4 3l2 1h5c2-1 4 0 5 1 3 3 7 3 10 4h4c5-2 11-3 16-2h17l8-1 7 1 7 1h17c5 2 9 1 13-3l3-1h1l24-1h1c4 1 7 0 10-1h1c3-2 7-2 10-2l3 1h2l11-1 3-1 11-1 18-1 5-1 13-1 8-1 3-1 8-1h2l6-2c2-1 5-2 7 0h3c2-2 3-3 5-3l6-2h1l2-1h4c3-1 5-1 7-3 5-5 9-6 14-3v1c4 3 7 3 11 2h3l3-1c8-1 17-2 25 0l2 1h2l2 1h1l10 4v1c4 3 8 3 12 1h1v22z"
            fill="#000000"
            fillRule="evenodd"
            transform="rotate(180 680 20)"
          />
        </svg>

        {/* Contenido de encabezado */}
        <div className="relative z-10 text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-black">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="mb-4 text-2xl font-bold text-purple-gradient">
            Ofrecemos los mejores servicios con garantía de calidad
          </p>
        </div>

        {/* Grilla de características */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-gradient">
                <feature.icon className="h-8 w-8 text-black" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-purple">
                {feature.title}
              </h3>
              <p className="text-black text-pretty">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Borde inferior rasgado volteado 180° */}
        <svg
          className="absolute bottom-0 left-0 w-full h-12"
          viewBox="0 0 1360 40"
          preserveAspectRatio="none"
        >
          <path
            d="M1360 40H0V4l1 1v1c1 1 2 2 4 1h16l1 1h8l1-1h13v1c3 0 6 0 8-4 11-1 22 1 33 3h4l2 1h5l15 5 1 1h1l15 5 7 1 2 1 4 1v1l1 1 2 1h24l6 2 3 1 3-1h2l5 1h3l1-1h3l1-1c2-2 4-2 6-2l1 1h2v1h1l8-1 1-1h1l7-1 4-2h1l3-1 5-1 1-1h2l1-1h1l8-4 1-1h2l2-1h7l2-1 3-2h1l9-3h8l4-1h6l22-2h8v1h4l6-1 2-1h11c7-2 15-1 23 1l6 2 2 1 4 1a75 75 0 0017 4l1-1h1c1 0 3 0 4 2 4-1 8 0 10 4l3 3 1 1h1v1l6 3 2 1 3 2h29c2 0 3 0 4-2v-1c1-2 2-2 4-2h11l12-1h7l16-2h10l2 1 9 2h1c3 1 6 1 8-1h1l7-2 6 1 3 1h2l4-1h2l2-1h3c2 2 4 3 6 2h1l2-1h14a47 47 0 007 0h5c4-1 9-1 13 1l5-1h5a60 60 0 0117-2h2l11 3h2l4-1h2l16 1 2 1h9l2 1 24-1h7l1 1h5l10-2 2-1 9-3h6l2 1a19 19 0 004 0h3l3 1v-1h14c3 0 6 0 9 2l3 1 1 1h4a64 64 0 0018 0h10l2-1a94 94 0 0125 1h1l3-1h3a42 42 0 0116 0l4 1 2 1 17 1h8l23 4 8 1a1111 1111 0 0115 3h1c2 2 5 2 7 1 2-2 5-2 7-2h6c2 0 3 1 4 3l2 1h5c2-1 4 0 5 1 3 3 7 3 10 4h4c5-2 11-3 16-2h17l8-1 7 1 7 1h17c5 2 9 1 13-3l3-1h1l24-1h1c4 1 7 0 10-1h1c3-2 7-2 10-2l3 1h2l11-1 3-1 11-1 18-1 5-1 13-1 8-1 3-1 8-1h2l6-2c2-1 5-2 7 0h3c2-2 3-3 5-3l6-2h1l2-1h4c3-1 5-1 7-3 5-5 9-6 14-3v1c4 3 7 3 11 2h3l3-1c8-1 17-2 25 0l2 1h2l2 1h1l10 4v1c4 3 8 3 12 1h1v22z"
            fill="#000000"
            fillRule="evenodd"
          />
        </svg>

      </div>
    </section>
  )
}

