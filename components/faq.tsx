"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <div className="max-w-7xl mx-auto glass-card px-6 py-4 sm:px-8 sm:py-6 md:px-10 md:py-8 rounded-3xl shadow-xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
        Preguntas Frecuentes
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-3 sm:space-y-4"
      >
        <AccordionItem
          value="item-1"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            ¿De qué trata este servicio de aumento de seguidores?
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            Somos una plataforma SMM especializada en aumentar tu visibilidad en redes sociales como Instagram, TikTok, YouTube, Facebook, X (Twitter) y más. Ofrecemos servicios de aumento de seguidores, likes, comentarios y reproducciones reales o personalizados, dependiendo de tus necesidades.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            ¿Qué información necesito proporcionar?
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            Solo pedimos el enlace del perfil o la foto/publicación donde deseas aumentar tus seguidores o interacciones. Nunca pedimos contraseñas ni acceso a tu cuenta.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            ¿Son reales los seguidores o interacciones?
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            Ofrecemos distintos tipos de servicios: algunos son seguidores reales y activos, otros son seguidores de alta calidad automatizados. Puedes elegir el tipo según tus objetivos y presupuesto.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            ¿Mis datos estarán seguros?
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            Absolutamente. Toda la información que compartes con nosotros se mantiene 100% confidencial. Nadie sabrá que estás utilizando nuestros servicios. Además, usamos sistemas seguros para proteger tus datos y pedidos.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            ¿Qué pasa si quiero comentarios personalizados?
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            Puedes escribir tus propios comentarios uno a uno. Nuestro equipo se encargará de publicarlos de forma natural para que parezcan completamente orgánicos. Ideal para aumentar el engagement en tus publicaciones.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-6"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            ¿Cuánto tarda el servicio en completarse?
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            El tiempo depende del tipo de servicio y la cantidad solicitada. En la mayoría de los casos, los aumentos comienzan entre 15 minutos y 2 horas después del pedido, y se completan progresivamente para mantener la naturalidad.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-7"
          className="bg-white/10 rounded-2xl p-1 sm:p-2"
        >
          <AccordionTrigger className="text-white text-base sm:text-lg font-medium">
            ¿Puedo hacer pedidos para varias cuentas?
          </AccordionTrigger>
          <AccordionContent className="text-white/90 text-sm sm:text-base leading-relaxed">
            Sí, puedes realizar múltiples pedidos para distintas cuentas o publicaciones. Solo asegúrate de colocar correctamente los enlaces de cada pedido.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
