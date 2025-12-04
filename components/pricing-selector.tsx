"use client"
import { useState, useEffect, useTransition } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Clock,
  DollarSign,
  Package,
  CheckCircle2,
  MessageCircle,
  Music,
  Radio,
  LucideLinkedin,
  Hash,
  ImageIcon,
  Video,
  Globe,
  Star,
  Smartphone,
  MapPin,
  Mail,
  Globe2,
  Users,
  Heart,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  BookOpen,
  UserPlus,
  BarChart,
  AtSign,
  Repeat,
  Play,
  FileText,
  Calendar,
  Download,
  MoreHorizontal,
  Flag,
  Megaphone,
  Headphones,
  Mic,
  Crown,
  Scissors,
  Grid,
  Link,
  List
} from "lucide-react"
import { getSettings } from "@/app/actions/settings"
import { loadServicesData } from "@/lib/servicesData"
import { Button } from "./ui/button"

// Componente para iconos personalizados
const CustomIcon = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="h-4 w-4" />
)

const iconMap: { [key: string]: any } = {
  Instagram: () => <CustomIcon src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new" />,
  YouTube: () => <CustomIcon src="https://img.icons8.com/color/48/youtube-squared.png" alt="youtube-squared" />,
  Facebook: () => <CustomIcon src="https://img.icons8.com/color/48/facebook.png" alt="facebook" />,
  Twitter: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" alt="twitterx--v1" />,
  TikTok: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/tiktok--v1.png" alt="tiktok--v1" />,
  LinkedIn: () => <CustomIcon src="https://img.icons8.com/color/48/linkedin.png" alt="linkedin" />,
  Pinterest: () => <CustomIcon src="https://img.icons8.com/color/48/pinterest--v1.png" alt="pinterest--v1" />,
  Snapchat: () => <CustomIcon src="https://img.icons8.com/fluency/48/snapchat.png" alt="snapchat" />,
  Dribbble: () => <CustomIcon src="https://img.icons8.com/fluency/48/dribbble.png" alt="dribbble" />,
  Behance: () => <CustomIcon src="https://img.icons8.com/color/48/behance.png" alt="behance" />,
  Vimeo: () => <CustomIcon src="https://img.icons8.com/plasticine/100/vimeo.png" alt="vimeo" />,
  SoundCloud: () => <CustomIcon src="https://img.icons8.com/3d-fluency/94/soundcloud.png" alt="soundcloud" />,
  Spotify: () => <CustomIcon src="https://img.icons8.com/fluency/48/spotify.png" alt="spotify" />,
  Tidal: () => <CustomIcon src="https://img.icons8.com/fluency/48/tidal.png" alt="tidal" />,
  Twitch: () => <CustomIcon src="https://img.icons8.com/color/48/twitch--v1.png" alt="twitch--v1" />,
  window: () => <CustomIcon src="https://img.icons8.com/color/48/windows-logo.png" alt="windows-logo" />,
  Telegram: () => <CustomIcon src="https://img.icons8.com/color/48/telegram-app--v1.png" alt="telegram-app--v1" />,
  WhatsApp: () => <CustomIcon src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1" />,
  Discord: () => <CustomIcon src="https://img.icons8.com/color/48/discord-logo.png" alt="discord-logo" />,
  Threads: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/threads.png" alt="threads" />,
  autodesk: () => <CustomIcon src="https://img.icons8.com/ios/50/handwritten-ocr.png" alt="autodesk" />,
  envato: () => <CustomIcon src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-envato-a-marketplace-and-community-for-creative-people-logo-shadow-tal-revivo.png" alt="envato" />,
  Flaticon: () => <CustomIcon src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-flaticon-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-flaticon-social-media-tanah-basah-glyph-tanah-basah" />,
  Freepik: () => <CustomIcon src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-freepik-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-freepik-social-media-tanah-basah-glyph-tanah-basah" />,
  Gmail: () => <CustomIcon src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-new" />,
  iTunes: () => <CustomIcon src="https://img.icons8.com/color/48/itunes.png" alt="itunes" />,
  Licencias: () => <CustomIcon src="https://img.icons8.com/color/48/windows-logo.png" alt="external-licensing-marketing-and-business-management-smashingstocks-mixed-smashing-stocks" />,
  MixCloud: Music,
  stock: () => <CustomIcon src="https://img.icons8.com/doodle/48/adobe-logo.png" alt="external-Mixcloud-social-media-those-icons-fill" />,
  okru: () => <CustomIcon src="https://img.icons8.com/3d-sugary/100/ok-1.png" alt="ok-message" />,
  TripAdvisor: () => <CustomIcon src="https://img.icons8.com/doodle/48/tripadvisor.png" alt="tripadvisor" />,
  instagram: () => <CustomIcon src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new" />,
  youtube: () => <CustomIcon src="https://img.icons8.com/color/48/youtube-play.png" alt="youtube-squared" />,
  facebook: () => <CustomIcon src="https://img.icons8.com/color/48/facebook.png" alt="facebook" />,
  twitter: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" alt="twitterx--v1" />,
  tiktok: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/tiktok--v1.png" alt="tiktok--v1" />,
  linkeding: () => <CustomIcon src="https://img.icons8.com/color/48/linkedin.png" alt="linkedin" />,
  pinterest: () => <CustomIcon src="https://img.icons8.com/color/48/pinterest--v1.png" alt="pinterest--v1" />,
  snapchat: () => <CustomIcon src="https://img.icons8.com/fluency/48/snapchat.png" alt="snapchat" />,
  dribbble: () => <CustomIcon src="https://img.icons8.com/fluency/48/dribbble.png" alt="dribbble" />,
  behance: () => <CustomIcon src="https://img.icons8.com/color/48/behance.png" alt="behance" />,
  vimeo: () => <CustomIcon src="https://img.icons8.com/plasticine/100/vimeo.png" alt="vimeo" />,
  soundcloud: () => <CustomIcon src="https://img.icons8.com/3d-fluency/94/soundcloud.png" alt="soundcloud" />,
  spotify: () => <CustomIcon src="https://img.icons8.com/fluency/48/spotify.png" alt="spotify" />,
  tidal: () => <CustomIcon src="https://img.icons8.com/fluency/48/tidal.png" alt="tidal" />,
  twitch: () => <CustomIcon src="https://img.icons8.com/color/48/twitch--v1.png" alt="twitch--v1" />,
  kick: () => <CustomIcon src="https://img.icons8.com/external-others-inmotus-design/67/external-K-qwerty-keypad-others-inmotus-design.png" alt="kick"/>,
  kwai: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/FD7E14/video-call.png" alt="kwai" />,
  telegram: () => <CustomIcon src="https://img.icons8.com/color/48/telegram-app--v1.png" alt="telegram-app--v1" />,
  whatsapp: () => <CustomIcon src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1" />,
  discord: () => <CustomIcon src="https://img.icons8.com/color/48/discord-logo.png" alt="discord-logo" />,
  threads: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/threads.png" alt="threads" />,
  flaticon: () => <CustomIcon src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-flaticon-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-flaticon-social-media-tanah-basah-glyph-tanah-basah" />,
  freepik: () => <CustomIcon src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-freepik-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-freepik-social-media-tanah-basah-glyph-tanah-basah" />,
  gmail: () => <CustomIcon src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-new" />,
  itunes: () => <CustomIcon src="https://img.icons8.com/color/48/itunes.png" alt="itunes" />,
  licencias: () => <CustomIcon src="https://img.icons8.com/color/48/windows-logo.png" alt="external-licensing-marketing-and-business-management-smashingstocks-mixed-smashing-stocks" />,
  mixcloud: Music,
  motionarray: () => <CustomIcon src="https://img.icons8.com/sf-black-filled/64/m.png" alt="external-Mixcloud-social-media-those-icons-fill" />,
  ok: () => <CustomIcon src="https://img.icons8.com/liquid-glass/48/ok-message.png" alt="ok-message" />,
  tripadvisor: () => <CustomIcon src="https://img.icons8.com/doodle/48/tripadvisor.png" alt="tripadvisor" />,
  trafico: () => <CustomIcon src="https://img.icons8.com/color/48/chrome--v1.png" alt="internet" />,
  instalacion: () => <CustomIcon src="https://img.icons8.com/3d-fluency/94/android-os.png" alt="aplicacion" />,
  reportar: () => <CustomIcon src="https://img.icons8.com/office/40/skull.png" alt="reportar-bug" />,
  resenas: () => <CustomIcon src="https://img.icons8.com/color/48/google-logo.png" alt="resenas" />,
}

export function PricingSelector() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [usdToCop, setUsdToCop] = useState<number>(4200)
  const [servicesData, setServicesData] = useState<any>({})
  const [isPending, startTransition] = useTransition();
  const [isMobile, setIsMobile] = useState<boolean>(false)


  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSettings()
      setUsdToCop(Number(settings.exchangeRate))
    }
    fetchSettings()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      const data = await loadServicesData()
      setServicesData(data)
    }
    loadData()
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const platformKeys = Object.keys(servicesData)
  const hasDirectTypes = selectedPlatform && selectedCategory && servicesData[selectedPlatform]?.categories?.[selectedCategory]?.types
  const categoryKeys = selectedPlatform ? Object.keys(servicesData[selectedPlatform]?.categories || {}) : []
  const typeKeys = hasDirectTypes ? Object.keys(servicesData[selectedPlatform]?.categories?.[selectedCategory]?.types) : []

  interface ServiceDetail {
    pricePerUnit: number;
    minQuantity: number;
    maxQuantity: number;
    deliveryTime: string;
    description: string;
    features: any;
  }

  const selectedData: ServiceDetail | null = (() => {
    if (!selectedPlatform || !selectedCategory || !selectedService) return null

    const [selectedType, selectedServiceName] = selectedService.split('|')

    const typeData = servicesData[selectedPlatform]?.categories?.[selectedCategory]?.types?.[selectedType]
    if (!typeData) return null

    if (selectedServiceName) {
      // Service with nested structure
      return typeData.services?.[selectedServiceName] || null
    } else {
      // Direct type without services
      return typeData
    }
  })()

  const PlatformIcon = selectedPlatform ? iconMap[selectedPlatform] || Globe : null

  return (
    <section id="precios" className="py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Lado izquierdo: Texto */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h3 className="mb-4 text-2xl font-bold text-purple-gradient">Conoce todos nuestros precios</h3>
            <p className="text-lg text-foreground">
              Descubre nuestras tarifas competitivas y elige el servicio perfecto para impulsar tu presencia en redes sociales con resultados garantizados. Elige la plataforma y el tipo de servicio que necesitas para hacer crecer tu presencia.
            </p>
          </div>

          {/* Lado derecho: Selectores */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md border-2 border-purple-500 rounded-2xl p-6 md:p-8">
          <div className="space-y-6">
            {/* Selector de Plataforma */}
            <div className="space-y-2">
              <Label htmlFor="platform" className="font-semibold text-white">
                1. Selecciona la Plataforma
              </Label>
              <Select
                value={selectedPlatform}
                onValueChange={(value) => {
                  setSelectedPlatform(value)
                  setSelectedCategory("")
                  setSelectedType("")
                  setSelectedService("")
                }}
              >
                <SelectTrigger id="platform" className="bg-white/50 h-12 border-white text-black">
                  <SelectValue placeholder="Elige una plataforma..." className="text-black" />
                </SelectTrigger>
                <SelectContent>
                  {platformKeys.map((platform) => {
                    const Icon = iconMap[platform] || Globe
                    return (
                      <SelectItem key={platform} value={platform}>
                        <div className="flex items-center gap-2">
                          {typeof Icon === 'function' ? <Icon /> : Icon && <Icon className="h-4 w-4 text-black" />}
                          <span className="text-black">{platform}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            {/* Selector de Categoría */}
            {selectedPlatform && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="category" className="font-semibold text-white">
                  2. Selecciona el Tipo de Servicio
                </Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value)
                      setSelectedService("")
                    }}
                  >
                    <SelectTrigger id="category" className="bg-white/50 h-12 border-white text-black truncate">
                      <SelectValue placeholder="Elige un tipo de servicio..." className="text-black" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto w-[var(--radix-select-trigger-width)]">
                    {categoryKeys.map((category) => {
                      // Contar servicios por tipo dentro de la categoría
                      const categoryData = servicesData[selectedPlatform]?.categories?.[category]
                      const typeCounts = { aleatorios: 0, bots: 0, personalizados: 0, directos: 0 }

                      if (categoryData?.types) {
                        Object.values(categoryData.types).forEach((typeData: any) => {
                          if (typeData.services) {
                            Object.keys(typeData.services).forEach(service => {
                              const serviceName = service.toLowerCase()
                              if (serviceName.includes('aleatorio') || serviceName.includes('random')) {
                                typeCounts.aleatorios++
                              } else if (serviceName.includes('bot') || serviceName.includes('automat') || serviceName.includes('sin caída')) {
                                typeCounts.bots++
                              } else {
                                typeCounts.personalizados++
                              }
                            })
                          } else {
                            typeCounts.directos++
                          }
                        })
                      }

                      // Crear nombre descriptivo con la plataforma
                      const displayName = `${selectedPlatform} ${category.toLowerCase()}`

                      // Función para obtener el icono según la categoría
                      const getCategoryIcon = (categoryName: string) => {
                        const cat = categoryName.toLowerCase()
                        if (cat.includes('seguidores') || cat.includes('followers')) return <Users className="h-4 w-4" />
                        if (cat.includes('likes') || cat.includes('me gusta')) return <Heart className="h-4 w-4" />
                        if (cat.includes('vistas') || cat.includes('views')) return <Eye className="h-4 w-4" />
                        if (cat.includes('comentarios') || cat.includes('comments')) return <MessageSquare className="h-4 w-4" />
                        if (cat.includes('compartir') || cat.includes('shares')) return <Share2 className="h-4 w-4" />
                        if (cat.includes('reacciones') || cat.includes('reactions')) return <ThumbsUp className="h-4 w-4" />
                        if (cat.includes('paquetes') || cat.includes('packages')) return <Package className="h-4 w-4" />
                        if (cat.includes('guardar') || cat.includes('save')) return <Bookmark className="h-4 w-4" />
                        if (cat.includes('historias') || cat.includes('stories')) return <BookOpen className="h-4 w-4" />
                        if (cat.includes('solicitudes') || cat.includes('requests')) return <UserPlus className="h-4 w-4" />
                        if (cat.includes('estadisticas') || cat.includes('statistics')) return <BarChart className="h-4 w-4" />
                        if (cat.includes('menciones') || cat.includes('mentions')) return <AtSign className="h-4 w-4" />
                        if (cat.includes('repost') || cat.includes('repost')) return <Repeat className="h-4 w-4" />
                        if (cat.includes('reproducciones') || cat.includes('plays')) return <Play className="h-4 w-4" />
                        if (cat.includes('verificados') || cat.includes('verified')) return <Crown className="h-4 w-4" />
                        if (cat.includes('visitas') || cat.includes('visits')) return <Eye className="h-4 w-4" />
                        if (cat.includes('cuentas') || cat.includes('accounts')) return <Users className="h-4 w-4" />
                        if (cat.includes('licencia') || cat.includes('license')) return <FileText className="h-4 w-4" />
                        if (cat.includes('suscripcion') || cat.includes('subscription')) return <Calendar className="h-4 w-4" />
                        if (cat.includes('descargas') || cat.includes('downloads')) return <Download className="h-4 w-4" />
                        if (cat.includes('instalacion') || cat.includes('installation')) return <Smartphone className="h-4 w-4" />
                        if (cat.includes('trafico') || cat.includes('traffic')) return <Globe className="h-4 w-4" />
                        if (cat.includes('reportar') || cat.includes('report')) return <Flag className="h-4 w-4" />
                        if (cat.includes('resenas') || cat.includes('reviews')) return <Star className="h-4 w-4" />
                        if (cat.includes('ads') || cat.includes('anuncios')) return <Megaphone className="h-4 w-4" />
                        if (cat.includes('podcast') || cat.includes('podcast')) return <Headphones className="h-4 w-4" />
                        if (cat.includes('premium') || cat.includes('premium')) return <Crown className="h-4 w-4" />
                        if (cat.includes('reacciones') || cat.includes('reactions')) return <ThumbsUp className="h-4 w-4" />
                        if (cat.includes('miembros') || cat.includes('members')) return <Users className="h-4 w-4" />
                        if (cat.includes('suscriptores') || cat.includes('subscribers')) return <Users className="h-4 w-4" />
                        if (cat.includes('opiniones') || cat.includes('reviews')) return <MessageSquare className="h-4 w-4" />
                        if (cat.includes('monetizacion') || cat.includes('monetization')) return <DollarSign className="h-4 w-4" />
                        if (cat.includes('pais') || cat.includes('country')) return <MapPin className="h-4 w-4" />
                        if (cat.includes('respuestas') || cat.includes('replies')) return <MessageSquare className="h-4 w-4" />
                        if (cat.includes('reels') || cat.includes('reels')) return <Video className="h-4 w-4" />
                        if (cat.includes('votos') || cat.includes('votes')) return <ThumbsUp className="h-4 w-4" />
                        if (cat.includes('transmision') || cat.includes('live')) return <Radio className="h-4 w-4" />
                        if (cat.includes('visualizaciones') || cat.includes('visualizations')) return <Eye className="h-4 w-4" />
                        if (cat.includes('genero') || cat.includes('gender')) return <Users className="h-4 w-4" />
                        if (cat.includes('extractor') || cat.includes('extractor')) return <Download className="h-4 w-4" />
                        if (cat.includes('batallas') || cat.includes('battles')) return <Mic className="h-4 w-4" />
                        if (cat.includes('clip') || cat.includes('clip')) return <Scissors className="h-4 w-4" />
                        if (cat.includes('envivo') || cat.includes('live')) return <Radio className="h-4 w-4" />
                        if (cat.includes('like') || cat.includes('like')) return <Heart className="h-4 w-4" />
                        if (cat.includes('comunidad') || cat.includes('community')) return <Users className="h-4 w-4" />
                        if (cat.includes('latinos') || cat.includes('latinos')) return <Globe className="h-4 w-4" />
                        if (cat.includes('shorts') || cat.includes('shorts')) return <Video className="h-4 w-4" />
                        if (cat.includes('tablero') || cat.includes('board')) return <Grid className="h-4 w-4" />
                        if (cat.includes('perfil') || cat.includes('profile')) return <UserPlus className="h-4 w-4" />
                        if (cat.includes('conectar') || cat.includes('connect')) return <Link className="h-4 w-4" />
                        if (cat.includes('mixcloud') || cat.includes('mixcloud')) return <Music className="h-4 w-4" />
                        if (cat.includes('motionarray') || cat.includes('motionarray')) return <Video className="h-4 w-4" />
                        if (cat.includes('okru') || cat.includes('okru')) return <Play className="h-4 w-4" />
                        if (cat.includes('otro') || cat.includes('other')) return <MoreHorizontal className="h-4 w-4" />
                        if (cat.includes('kwai') || cat.includes('kwai')) return <Video className="h-4 w-4" />
                        if (cat.includes('linkeding') || cat.includes('linkedin')) return <LucideLinkedin className="h-4 w-4" />
                        if (cat.includes('kick') || cat.includes('kick')) return <Mic className="h-4 w-4" />
                        if (cat.includes('gmail') || cat.includes('gmail')) return <Mail className="h-4 w-4" />
                        if (cat.includes('itunes') || cat.includes('itunes')) return <Music className="h-4 w-4" />
                        if (cat.includes('window') || cat.includes('windows')) return <Smartphone className="h-4 w-4" />
                        if (cat.includes('tripadvisor') || cat.includes('tripadvisor')) return <MapPin className="h-4 w-4" />
                        if (cat.includes('tidal') || cat.includes('tidal')) return <Music className="h-4 w-4" />
                        if (cat.includes('stock') || cat.includes('stock')) return <ImageIcon className="h-4 w-4" />
                        if (cat.includes('soundcloud') || cat.includes('soundcloud')) return <Music className="h-4 w-4" />
                        if (cat.includes('spotify') || cat.includes('spotify')) return <Music className="h-4 w-4" />
                        if (cat.includes('twitch') || cat.includes('twitch')) return <Radio className="h-4 w-4" />
                        if (cat.includes('vimeo') || cat.includes('vimeo')) return <Video className="h-4 w-4" />
                        if (cat.includes('dribbble') || cat.includes('dribbble')) return <ImageIcon className="h-4 w-4" />
                        if (cat.includes('behance') || cat.includes('behance')) return <ImageIcon className="h-4 w-4" />
                        if (cat.includes('autodesk') || cat.includes('autodesk')) return <ImageIcon className="h-4 w-4" />
                        if (cat.includes('envato') || cat.includes('envato')) return <ImageIcon className="h-4 w-4" />
                        if (cat.includes('flaticon') || cat.includes('flaticon')) return <ImageIcon className="h-4 w-4" />
                        if (cat.includes('freepik') || cat.includes('freepik')) return <ImageIcon className="h-4 w-4" />
                        if (cat.includes('discord') || cat.includes('discord')) return <MessageCircle className="h-4 w-4" />
                        if (cat.includes('threads') || cat.includes('threads')) return <Hash className="h-4 w-4" />
                        if (cat.includes('whatsapp') || cat.includes('whatsapp')) return <MessageCircle className="h-4 w-4" />
                        if (cat.includes('telegram') || cat.includes('telegram')) return <MessageCircle className="h-4 w-4" />
                        if (cat.includes('pinterest') || cat.includes('pinterest')) return <ImageIcon className="h-4 w-4" />
                        if (cat.includes('snapchat') || cat.includes('snapchat')) return <ImageIcon className="h-4 w-4" />
                        if (cat.includes('tiktok') || cat.includes('tiktok')) return <Video className="h-4 w-4" />
                        if (cat.includes('twitter') || cat.includes('twitter')) return <Hash className="h-4 w-4" />
                        if (cat.includes('facebook') || cat.includes('facebook')) return <Facebook className="h-4 w-4" />
                        if (cat.includes('instagram') || cat.includes('instagram')) return <Instagram className="h-4 w-4" />
                        if (cat.includes('youtube') || cat.includes('youtube')) return <Youtube className="h-4 w-4" />
                        return <Globe className="h-4 w-4" />
                      }

                      // Función para obtener las etiquetas principales de los servicios
                      const getServiceTypeLabels = (): string[] => {
                        const labels: string[] = []
                        const categoryData = servicesData[selectedPlatform]?.categories?.[category]

                        if (categoryData?.types) {
                          Object.values(categoryData.types).forEach((typeData: any) => {
                            if (typeData.services) {
                              Object.keys(typeData.services).forEach(service => {
                                const serviceLower = service.toLowerCase()
                                const parts = service.split(' - ')
                                let mainType = ''
                                if (parts.length >= 2) {
                                  mainType = parts[1].toLowerCase()
                                }

                                let typeLabel = ''
                                if (mainType.includes('comentarios') || mainType.includes('comments')) {
                                  if (serviceLower.includes('aleatorio') || serviceLower.includes('random') || serviceLower.includes('emoji')) {
                                    typeLabel = 'Comentarios Aleatorios'
                                  } else if (serviceLower.includes('personalizad') || serviceLower.includes('custom')) {
                                    typeLabel = 'Comentarios Personalizados'
                                  } else {
                                    typeLabel = 'Comentarios'
                                  }
                                } else if (mainType.includes('seguidores') || mainType.includes('followers')) {
                                  typeLabel = 'Seguidores'
                                } else if (mainType.includes('guardar') || mainType.includes('save')) {
                                  typeLabel = 'Guardar'
                                } else if (mainType.includes('vistas') || mainType.includes('views')) {
                                  typeLabel = 'Vistas'
                                } else if (mainType.includes('likes') || mainType.includes('me gusta')) {
                                  typeLabel = 'Likes'
                                } else if (mainType.includes('compartir') || mainType.includes('shares')) {
                                  typeLabel = 'Compartir'
                                } else if (mainType.includes('reacciones') || mainType.includes('reactions')) {
                                  typeLabel = 'Reacciones'
                                }

                                if (typeLabel && !labels.includes(typeLabel)) {
                                  labels.push(typeLabel)
                                }
                              })
                            }
                          })
                        }

                        return labels.slice(0, 3) // Mostrar máximo 3 etiquetas
                      }

                      const serviceLabels = getServiceTypeLabels()

                      return (
                        <SelectItem key={category} value={category}>
                          <div className="flex items-center gap-2 w-full max-w-full">
                            {getCategoryIcon(category)}
                            <span className="truncate flex-1 min-w-0">{displayName}</span>
                            <div className="hidden sm:flex gap-1 text-xs flex-shrink-0">
                              {serviceLabels.map((label, index) => {
                                const colorClass = label.includes('Comentarios') ? 'bg-green-100 text-green-700' :
                                                  label === 'Seguidores' ? 'bg-blue-100 text-blue-700' :
                                                  label === 'Guardar' ? 'bg-orange-100 text-orange-700' :
                                                  label === 'Vistas' ? 'bg-purple-100 text-purple-700' :
                                                  label === 'Likes' ? 'bg-pink-100 text-pink-700' :
                                                  label === 'Compartir' ? 'bg-indigo-100 text-indigo-700' :
                                                  label === 'Reacciones' ? 'bg-yellow-100 text-yellow-700' :
                                                  label === 'Miembros' ? 'bg-cyan-100 text-cyan-700' :
                                                  label === 'Suscriptores' ? 'bg-teal-100 text-teal-700' :
                                                  label === 'Solicitudes' ? 'bg-violet-100 text-violet-700' :
                                                  label === 'Historias' ? 'bg-rose-100 text-rose-700' :
                                                  label === 'Opiniones' ? 'bg-amber-100 text-amber-700' :
                                                  label === 'Monetización' ? 'bg-emerald-100 text-emerald-700' :
                                                  label === 'País' ? 'bg-slate-100 text-slate-700' :
                                                  label === 'Paquetes' ? 'bg-stone-100 text-stone-700' :
                                                  label === 'Respuestas' ? 'bg-lime-100 text-lime-700' :
                                                  label === 'Reels' ? 'bg-fuchsia-100 text-fuchsia-700' :
                                                  label === 'Votos' ? 'bg-sky-100 text-sky-700' :
                                                  label === 'Transmisión' ? 'bg-red-100 text-red-700' :
                                                  label === 'Visualizaciones' ? 'bg-indigo-100 text-indigo-700' :
                                                  label === 'Género' ? 'bg-pink-100 text-pink-700' :
                                                  label === 'Estadísticas' ? 'bg-gray-100 text-gray-700' :
                                                  label === 'Extractor' ? 'bg-orange-100 text-orange-700' :
                                                  label === 'Menciones' ? 'bg-purple-100 text-purple-700' :
                                                  label === 'Repost' ? 'bg-blue-100 text-blue-700' :
                                                  label === 'Reproducciones' ? 'bg-green-100 text-green-700' :
                                                  label === 'Verificados' ? 'bg-yellow-100 text-yellow-700' :
                                                  label === 'Visitas' ? 'bg-indigo-100 text-indigo-700' :
                                                  label === 'Cuentas' ? 'bg-teal-100 text-teal-700' :
                                                  label === 'Licencia' ? 'bg-cyan-100 text-cyan-700' :
                                                  label === 'Suscripción' ? 'bg-violet-100 text-violet-700' :
                                                  label === 'Descargas' ? 'bg-rose-100 text-rose-700' :
                                                  label === 'Instalación' ? 'bg-amber-100 text-amber-700' :
                                                  label === 'Tráfico' ? 'bg-emerald-100 text-emerald-700' :
                                                  'bg-gray-100 text-gray-700'

                                return (
                                  <span key={index} className={`${colorClass} px-1 py-0.5 rounded`}>
                                    {label}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Selector de Servicio */}
            {selectedCategory && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="service" className="text-white font-semibold">
                  3. Selecciona el Servicio
                </Label>
                  <Select
                    value={selectedService}
                    onValueChange={(value) => {
                      setSelectedService(value)
                    }}
                  >
                    <SelectTrigger id="service" className="bg-white/50 h-12 border-white text-black w-full">
                      <SelectValue placeholder="Elige el servicio..." className="text-black truncate block overflow-hidden whitespace-nowrap" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto w-[var(--radix-select-trigger-width)]">
                    {typeKeys.flatMap((type) => {
                      const typeData = servicesData[selectedPlatform]?.categories?.[selectedCategory]?.types?.[type]
                      const services = typeData?.services ? Object.keys(typeData.services) : []

                      if (services.length > 0) {
                        // Si el tipo tiene servicios, mostrar cada servicio con el tipo como prefijo
                        return services.map((service) => {
                          const serviceLower = service.toLowerCase()

                          // Extraer el tipo principal del servicio (primera parte después del nombre de plataforma)
                          const parts = service.split(' - ')
                          let mainType = ''
                          if (parts.length >= 2) {
                            mainType = parts[1].toLowerCase()
                          }

                          // Determinar la etiqueta basada en el tipo principal
                          let typeLabel = 'Bots' // Default

                          // Primero verificar tipos específicos principales
                          if (mainType.includes('seguidores') || mainType.includes('followers')) {
                            typeLabel = 'Seguidores'
                          } else if (mainType.includes('guardar') || mainType.includes('save')) {
                            typeLabel = 'Guardar'
                          } else if (mainType.includes('vistas') || mainType.includes('views')) {
                            typeLabel = 'Vistas'
                          } else if (mainType.includes('likes') || mainType.includes('me gusta')) {
                            typeLabel = 'Likes'
                          } else if (mainType.includes('compartir') || mainType.includes('shares')) {
                            typeLabel = 'Compartir'
                          } else if (mainType.includes('reacciones') || mainType.includes('reactions')) {
                            typeLabel = 'Reacciones'
                          } else if (mainType.includes('comentarios') || mainType.includes('comments')) {
                            if (serviceLower.includes('aleatorio') || serviceLower.includes('random') || serviceLower.includes('emoji')) {
                              typeLabel = 'Comentarios Aleatorios'
                            } else if (serviceLower.includes('personalizad') || serviceLower.includes('custom')) {
                              typeLabel = 'Comentarios Personalizados'
                            } else {
                              typeLabel = 'Comentarios'
                            }
                          } else if (mainType.includes('miembros') || mainType.includes('members')) {
                            typeLabel = 'Miembros'
                          } else if (mainType.includes('suscriptores') || mainType.includes('subscribers')) {
                            typeLabel = 'Suscriptores'
                          } else if (mainType.includes('solicitudes') || mainType.includes('requests')) {
                            typeLabel = 'Solicitudes'
                          } else if (mainType.includes('historias') || mainType.includes('stories')) {
                            typeLabel = 'Historias'
                          } else if (mainType.includes('opiniones') || mainType.includes('reviews')) {
                            typeLabel = 'Opiniones'
                          } else if (mainType.includes('monetizacion') || mainType.includes('monetization')) {
                            typeLabel = 'Monetización'
                          } else if (mainType.includes('pais') || mainType.includes('country')) {
                            typeLabel = 'País'
                          } else if (mainType.includes('paquetes') || mainType.includes('packages')) {
                            typeLabel = 'Paquetes'
                          } else if (mainType.includes('respuestas') || mainType.includes('replies')) {
                            typeLabel = 'Respuestas'
                          } else if (mainType.includes('reels') || mainType.includes('reels')) {
                            typeLabel = 'Reels'
                          } else if (mainType.includes('votos') || mainType.includes('votes')) {
                            typeLabel = 'Votos'
                          } else if (mainType.includes('transmision') || mainType.includes('live')) {
                            typeLabel = 'Transmisión'
                          } else if (mainType.includes('visualizaciones') || mainType.includes('visualizations')) {
                            typeLabel = 'Visualizaciones'
                          } else if (mainType.includes('genero') || mainType.includes('gender')) {
                            typeLabel = 'Género'
                          } else if (mainType.includes('estadisticas') || mainType.includes('statistics')) {
                            typeLabel = 'Estadísticas'
                          } else if (mainType.includes('extractor') || mainType.includes('extractor')) {
                            typeLabel = 'Extractor'
                          } else if (mainType.includes('menciones') || mainType.includes('mentions')) {
                            typeLabel = 'Menciones'
                          } else if (mainType.includes('repost') || mainType.includes('repost')) {
                            typeLabel = 'Repost'
                          } else if (mainType.includes('reproducciones') || mainType.includes('plays')) {
                            typeLabel = 'Reproducciones'
                          } else if (mainType.includes('verificados') || mainType.includes('verified')) {
                            typeLabel = 'Verificados'
                          } else if (mainType.includes('visitas') || mainType.includes('visits')) {
                            typeLabel = 'Visitas'
                          } else if (mainType.includes('cuentas') || mainType.includes('accounts')) {
                            typeLabel = 'Cuentas'
                          } else if (mainType.includes('licencia') || mainType.includes('license')) {
                            typeLabel = 'Licencia'
                          } else if (mainType.includes('suscripcion') || mainType.includes('subscription')) {
                            typeLabel = 'Suscripción'
                          } else if (mainType.includes('descargas') || mainType.includes('downloads')) {
                            typeLabel = 'Descargas'
                          } else if (mainType.includes('instalacion') || mainType.includes('installation')) {
                            typeLabel = 'Instalación'
                          } else if (mainType.includes('trafico') || mainType.includes('traffic')) {
                            typeLabel = 'Tráfico'
                          } else {
                            // Para servicios que no tienen un tipo principal claro, verificar características específicas
                            const isRandom = serviceLower.includes('aleatorio') || serviceLower.includes('random') || serviceLower.includes('emoji')
                            const isBot = serviceLower.includes('bot') || serviceLower.includes('automat') || serviceLower.includes('sin caída') || serviceLower.includes('garantia') || serviceLower.includes('30 dias') || serviceLower.includes('r30')
                            const isPersonalized = serviceLower.includes('personalizad') || serviceLower.includes('custom') || serviceLower.includes('especifico')

                            if (isRandom) {
                              typeLabel = 'Aleatorios'
                            } else if (isPersonalized) {
                              typeLabel = 'Personalizados'
                            } else if (isBot) {
                              typeLabel = 'Bots'
                            } else {
                              // Servicios automatizados por defecto
                              typeLabel = 'Bots'
                            }
                          }

                          return (
                            <SelectItem key={`${type}-${service}`} value={`${type}|${service}`}>
                              <div className="flex items-center gap-2 w-full max-w-full">
                                {!isMobile && (
                                  <span className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                                    typeLabel.includes('Comentarios') ? 'bg-green-100 text-green-700' :
                                    typeLabel === 'Seguidores' ? 'bg-blue-100 text-blue-700' :
                                    typeLabel === 'Guardar' ? 'bg-orange-100 text-orange-700' :
                                    typeLabel === 'Vistas' ? 'bg-purple-100 text-purple-700' :
                                    typeLabel === 'Likes' ? 'bg-pink-100 text-pink-700' :
                                    typeLabel === 'Compartir' ? 'bg-indigo-100 text-indigo-700' :
                                    typeLabel === 'Reacciones' ? 'bg-yellow-100 text-yellow-700' :
                                    typeLabel === 'Miembros' ? 'bg-cyan-100 text-cyan-700' :
                                    typeLabel === 'Suscriptores' ? 'bg-teal-100 text-teal-700' :
                                    typeLabel === 'Solicitudes' ? 'bg-violet-100 text-violet-700' :
                                    typeLabel === 'Historias' ? 'bg-rose-100 text-rose-700' :
                                    typeLabel === 'Opiniones' ? 'bg-amber-100 text-amber-700' :
                                    typeLabel === 'Monetización' ? 'bg-emerald-100 text-emerald-700' :
                                    typeLabel === 'País' ? 'bg-slate-100 text-slate-700' :
                                    typeLabel === 'Paquetes' ? 'bg-stone-100 text-stone-700' :
                                    typeLabel === 'Respuestas' ? 'bg-lime-100 text-lime-700' :
                                    typeLabel === 'Reels' ? 'bg-fuchsia-100 text-fuchsia-700' :
                                    typeLabel === 'Votos' ? 'bg-sky-100 text-sky-700' :
                                    typeLabel === 'Transmisión' ? 'bg-red-100 text-red-700' :
                                    typeLabel === 'Visualizaciones' ? 'bg-indigo-100 text-indigo-700' :
                                    typeLabel === 'Género' ? 'bg-pink-100 text-pink-700' :
                                    typeLabel === 'Estadísticas' ? 'bg-gray-100 text-gray-700' :
                                    typeLabel === 'Extractor' ? 'bg-orange-100 text-orange-700' :
                                    typeLabel === 'Menciones' ? 'bg-purple-100 text-purple-700' :
                                    typeLabel === 'Repost' ? 'bg-blue-100 text-blue-700' :
                                    typeLabel === 'Reproducciones' ? 'bg-green-100 text-green-700' :
                                    typeLabel === 'Verificados' ? 'bg-yellow-100 text-yellow-700' :
                                    typeLabel === 'Visitas' ? 'bg-indigo-100 text-indigo-700' :
                                    typeLabel === 'Cuentas' ? 'bg-teal-100 text-teal-700' :
                                    typeLabel === 'Licencia' ? 'bg-cyan-100 text-cyan-700' :
                                    typeLabel === 'Suscripción' ? 'bg-violet-100 text-violet-700' :
                                    typeLabel === 'Descargas' ? 'bg-rose-100 text-rose-700' :
                                    typeLabel === 'Instalación' ? 'bg-amber-100 text-amber-700' :
                                    typeLabel === 'Tráfico' ? 'bg-emerald-100 text-emerald-700' :
                                    typeLabel === 'Aleatorios' ? 'bg-green-100 text-green-700' :
                                    typeLabel === 'Bots' ? 'bg-blue-100 text-blue-700' :
                                    'bg-purple-100 text-purple-700'
                                  }`}>
                                    {typeLabel}
                                  </span>
                                )}
                                <span className="truncate flex-1 min-w-0">{service}</span>
                              </div>
                            </SelectItem>
                          )
                        })
                      } else {
                        // Si el tipo no tiene servicios, mostrar el tipo directamente
                        return (
                          <SelectItem key={type} value={`${type}|`}>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                Directo
                              </span>
                              <span>{type}</span>
                            </div>
                          </SelectItem>
                        )
                      }
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Especificaciones del Servicio */}
            {selectedData && PlatformIcon && (
              <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 border-t border-border/50 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                    {typeof PlatformIcon === 'function' ? <PlatformIcon /> : <PlatformIcon className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {selectedService ? selectedService.split('|')[1] || selectedService.split('|')[0] : ''}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPlatform} - {selectedCategory}
                      {selectedService && ` - ${selectedService.split('|')[0]}`}
                      {selectedService && selectedService.split('|')[1] && ` - ${selectedService.split('|')[1]}`}
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="glass flex items-start gap-3 rounded-xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-light text-white">Cantidad Mínima</p>
                      <p className="text-xl font-bold text-white">{selectedData.minQuantity.toLocaleString()}</p>
                      <p className="text-sm font-light text-white">Máxima: {selectedData.maxQuantity.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="glass flex items-start gap-3 rounded-xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div className="w-full">
                      <p className="text-sm font-light text-white">Precio por Mil</p>
                      <p className="text-lg font-bold text-white">${(selectedData.pricePerUnit * 1000).toFixed(2)} USD</p>
                      <p className="text-sm font-light text-white">${Math.round(selectedData.pricePerUnit * 1000 * usdToCop).toLocaleString("es-CO")} COP</p>
                    </div>
                  </div>
                  <div className="glass flex items-start gap-3 rounded-xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-light text-white">Tiempo de Entrega</p>
                      <p className="text-xl font-bold text-white">{selectedData.deliveryTime}</p>
                    </div>
                  </div>
                </div>
                {/* Descripción */}
                <div className="glass rounded-xl p-6">
                  <h4 className="mb-3 font-bold text-white">Descripción del Servicio</h4>
                  <p className="mb-4 text-pretty leading-relaxed text-white">{selectedData.description}</p>
                  <div className="space-y-2">
                    {(Array.isArray(selectedData.features) ? selectedData.features : Object.values(selectedData.features || {})).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-white/20" />
                        <span className="text-sm text-white font-extralight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
