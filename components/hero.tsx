"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link";

export function Hero() {
  const mensajes = [
    "Aumenta tu presencia en redes sociales 🌟",
    "Impulsa tu cuenta con seguidores reales 🚀",
    "Aumenta tu alcance en Instagram y TikTok 💥",
    "Entrega rápida y resultados visibles 📈",
    "Confianza y soporte 24/7 🧠",
  ]

  const [index, setIndex] = useState(0)

  // Cambia el mensaje cada 3 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length)
    }, 3000)
    return () => clearInterval(intervalo)
  }, [mensajes.length])

  return (
    <section className="flex items-center justify-center py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Video de YouTube a la izquierda */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="w-full max-w-4xl">
              <div className="aspect-video overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Elementos debajo del video */}
              <div className="flex justify-center gap-2 sm:gap-4 mt-6">
                <div className="flex items-center gap-1 sm:gap-2 bg-gray-600/50 rounded-full px-2 sm:px-4 py-1 sm:py-2">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm sm:text-base">Seguidores</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-gray-600/50 rounded-full px-2 sm:px-4 py-1 sm:py-2">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm sm:text-base">Likes</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-gray-600/50 rounded-full px-2 sm:px-4 py-1 sm:py-2">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm sm:text-base">Comentarios</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-gray-600/50 rounded-full px-2 sm:px-4 py-1 sm:py-2">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm sm:text-base">Viws</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido derecho */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-gradient mb-6">
              Aumenta tus Seguidores en Redes Sociales
            </h1>
            <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl">
              Impulsa tu presencia digital con seguidores reales y de calidad. Aumenta tu alcance, engagement y autoridad en Instagram, TikTok, YouTube y más plataformas.
            </p>

            <Badge variant="secondary" className="mb-6 bg-white/20 text-white backdrop-blur-sm animate-pulse">
              Nuevo: Precios Competitivos
            </Badge>

            {/* Burbujas dinámicas */}
            <div className="relative h-20 flex items-center justify-center lg:justify-start mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block bg-white/20 backdrop-blur-md px-4 py-3 rounded-2xl text-lg text-white shadow-md border border-white/20"
                >
                  {mensajes[index]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Botones */}
            <div className="flex flex-row items-center justify-center lg:items-start lg:justify-start gap-4">
              <Link href="#pricing">
                <Button size="lg" className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white animate-bounce">
                  Ver Precios
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
