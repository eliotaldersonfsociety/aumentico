"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AboutUsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Mensaje enviado:", formData)
    alert("✅ Tu mensaje ha sido enviado correctamente. ¡Gracias por contactarnos!")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-white">
          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 p-6">
            Sobre Nosotros
          </h1>

          {/* Imagen + Texto */}
          <div className="glass-card p-6 md:p-8 rounded-2xl space-y-8">
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/marketing.jpg"
                alt="Nuestro equipo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-6 leading-relaxed text-lg" style={{ fontFamily: 'Helvetica, sans-serif' }}>
              <p>
                Somos un equipo apasionado por el marketing digital y la optimización de presencia en línea.
                Nuestra misión es ayudar a personas, creadores y marcas a alcanzar su máximo potencial
                en redes sociales, mediante herramientas modernas, seguras y transparentes.
              </p>

              <p>
                Desde nuestros inicios, hemos trabajado con compromiso y ética, priorizando resultados reales
                y sostenibles. Creemos que el crecimiento digital debe ser accesible para todos, y por eso
                ofrecemos soluciones que se adaptan a cada tipo de proyecto, sin complicaciones ni riesgos.
              </p>

              <p>
                Cada servicio que ofrecemos está respaldado por tecnología avanzada, análisis profundo y una atención
                personalizada. Nuestro equipo se dedica a diseñar estrategias que impulsen el crecimiento orgánico
                y mejoren la autoridad digital de nuestros clientes.
              </p>

              <p>
                Nos especializamos en el aumento de seguidores reales y segmentados, optimización de engagement,
                posicionamiento en redes sociales y creación de estrategias de crecimiento inteligente. Creemos que
                el crecimiento no se trata solo de números, sino de construir una comunidad sólida que conecte con tu marca.
              </p>

              <p>
                A través de nuestros servicios, ayudamos a creadores, emprendedores y negocios a obtener mayor
                visibilidad, alcanzar nuevos mercados y consolidar su presencia digital. Ya sea en Instagram, TikTok,
                Facebook o cualquier plataforma emergente, nuestras herramientas están diseñadas para maximizar tu alcance.
              </p>

              <p>
                Nuestra empresa se caracteriza por su transparencia y resultados comprobables. No ofrecemos atajos ni
                métodos riesgosos: todo nuestro ecosistema de crecimiento está basado en tecnología segura, procesos
                eficientes y prácticas totalmente compatibles con las plataformas de redes sociales.
              </p>

              <p>
                Creemos profundamente en que el éxito digital es una combinación de estrategia, constancia e innovación.
                Por eso, estamos en constante evolución, incorporando nuevas funciones, herramientas inteligentes y
                soluciones optimizadas para que nuestros clientes siempre estén un paso adelante en el mundo del marketing digital.
              </p>

              <p>
                Más que un servicio, somos un aliado estratégico en tu crecimiento. Cada proyecto que llega a nuestras manos
                recibe atención personalizada, análisis detallado y un plan de acción diseñado para obtener resultados
                tangibles, medibles y sostenibles.
              </p>

              <p>
                Nuestro compromiso es ayudarte a crecer de forma real, segura y efectiva. Tú pones el sueño, y nosotros
                ponemos la estrategia, la tecnología y el acompañamiento para hacerlo posible.
              </p>

              <p>
                Con el auge de las redes sociales, entendimos que las marcas y creadores necesitaban más que simples números.
                Necesitaban estrategias reales, procesos estables y sistemas que impulsaran un crecimiento genuino. Por eso,
                desarrollamos servicios que integran automatización inteligente, análisis de comportamiento de la audiencia
                y optimización constante del rendimiento.
              </p>

              <p>
                Nuestro servicio de aumento de seguidores está diseñado para ofrecer resultados progresivos, naturales y
                completamente seguros. Utilizamos tecnologías avanzadas que permiten analizar tendencias, horarios de mayor
                interacción, audiencias potenciales y perfiles con afinidad real hacia tu contenido. De esta forma, garantizamos
                un crecimiento sostenible que refuerce tu marca personal o corporativa.
              </p>

              <p>
                Además, contamos con herramientas exclusivas que permiten impulsar el engagement, mejorar la retención de
                seguidores y aumentar la visibilidad de tus publicaciones. Gracias a nuestros sistemas, miles de creadores y
                empresas han logrado fortalecer su presencia digital, alcanzar públicos internacionales y mantener un flujo
                constante de crecimiento sin riesgos.
              </p>

              <p>
                Nuestro equipo está conformado por especialistas en marketing digital, analistas de datos, diseñadores,
                estrategas de contenido y desarrolladores que trabajan continuamente para optimizar cada proceso. No solo
                te ofrecemos crecimiento: te ofrecemos estabilidad, seguridad y acompañamiento profesional en cada etapa.
              </p>

              <p>
                También implementamos estrategias de visibilidad que incluyen interacción segmentada, posicionamiento por
                nichos, análisis de competencia y monitoreo constante para garantizar que cada acción realizada aporte
                valor al crecimiento de tu cuenta. Nos aseguramos de que cada seguidor obtenido sea relevante, tenga una
                conexión potencial con tu contenido y pueda convertirse en parte de tu comunidad.
              </p>

              <p>
                A lo largo de los años, hemos ayudado a influencers, emprendedores, artistas, negocios locales, tiendas
                online, marcas personales y empresas internacionales a consolidar una presencia digital fuerte. Cada caso
                de éxito forma parte de nuestra motivación por seguir desarrollando soluciones que marquen la diferencia.
              </p>

              <p>
                Además de nuestros servicios principales, también brindamos asesorías personalizadas para quienes buscan
                mejorar su estrategia de contenido, optimizar su perfil, reforzar su identidad visual o profesionalizar
                su marca digital. Sabemos que cada proyecto es único, por eso adaptamos nuestros procesos a tus objetivos,
                necesidades y ritmo de crecimiento.
              </p>

              <p>
                Nuestro compromiso va más allá del servicio: queremos formar parte de tu progreso. Por eso, trabajamos
                bajo valores como la responsabilidad, la transparencia y la excelencia. Nos enfocamos en ofrecer soluciones
                duraderas que eviten riesgos, penalizaciones o métodos contraproducentes que puedan afectar tu reputación
                digital.
              </p>

              <p>
                Gracias a nuestra experiencia, hemos logrado construir una comunidad sólida de clientes que confían en
                nosotros por los resultados consistentes y la atención personalizada. Cada logro alcanzado por quienes
                confiaron en nuestros servicios representa para nosotros un paso más hacia nuestro objetivo: democratizar
                el crecimiento digital y poner al alcance de todos herramientas que anteriormente solo estaban disponibles
                para grandes marcas.
              </p>

              <p>
                En un mundo donde la presencia online define oportunidades, estamos aquí para ayudarte a destacar, crecer
                y convertir tus metas digitales en realidades. Porque cuando tú creces, nosotros crecemos contigo.
              </p>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
