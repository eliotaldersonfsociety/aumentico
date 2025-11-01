"use client"

import SmallLogo from "@/public/logo/smalllogo"
import { Instagram, Facebook, Twitter, Youtube, Music } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo y descripción */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <SmallLogo />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Plataforma líder en marketing digital y aumento de presencia en redes sociales.
            </p>

            {/* Redes sociales */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.instagram.com/aumentodeseguidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://www.facebook.com/aumentodeseguidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://x.com/aumentodeseguidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-sky-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a
                href="https://www.tiktok.com/@aumentodeseguidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-black transition-colors"
              >
                <Music className="w-5 h-5" />
              </a>

              <a
                href="https://www.youtube.com/@aumentodeseguidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="mb-4 font-semibold">Servicios</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="mb-4 font-semibold">Acerca de</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/nosotros" className="hover:text-foreground transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contacto" className="hover:text-foreground transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/afiliados" className="hover:text-foreground transition-colors">
                  Afiliados
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/terms" className="hover:text-foreground transition-colors">
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-foreground transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/reembolso" className="hover:text-foreground transition-colors">
                  Política de Reembolso
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>© 2025 Aumento de Seguidores. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
