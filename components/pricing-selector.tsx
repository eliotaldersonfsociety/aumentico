"use client"
import { useState, useEffect, useTransition } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
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
  Globe2
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
  Kick: Radio,
  Kwai: Video,
  Telegram: () => <CustomIcon src="https://img.icons8.com/color/48/telegram-app--v1.png" alt="telegram-app--v1" />,
  WhatsApp: () => <CustomIcon src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1" />,
  Discord: () => <CustomIcon src="https://img.icons8.com/color/48/discord-logo.png" alt="discord-logo" />,
  Threads: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/threads.png" alt="threads" />,
  AutoDesk: Globe,
  Envato: Globe,
  Flaticon: () => <CustomIcon src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-flaticon-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-flaticon-social-media-tanah-basah-glyph-tanah-basah" />,
  Freepik: () => <CustomIcon src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-freepik-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-freepik-social-media-tanah-basah-glyph-tanah-basah" />,
  Gmail: () => <CustomIcon src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-new" />,
  iTunes: () => <CustomIcon src="https://img.icons8.com/color/48/itunes.png" alt="itunes" />,
  Licencias: () => <CustomIcon src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/68/external-licensing-marketing-and-business-management-smashingstocks-mixed-smashing-stocks.png" alt="external-licensing-marketing-and-business-management-smashingstocks-mixed-smashing-stocks" />,
  MixCloud: Music,
  Motion: Video,
  OK: () => <CustomIcon src="https://img.icons8.com/liquid-glass/48/ok-message.png" alt="ok-message" />,
  TripAdvisor: () => <CustomIcon src="https://img.icons8.com/doodle/48/tripadvisor.png" alt="tripadvisor" />,
  TraficoWeb: () => <CustomIcon src="https://img.icons8.com/fluency/48/internet.png" alt="internet" />,
  // Agregar más iconos según sea necesario
  instagram: () => <CustomIcon src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new" />,
  youtube: () => <CustomIcon src="https://img.icons8.com/color/48/youtube-squared.png" alt="youtube-squared" />,
  facebook: () => <CustomIcon src="https://img.icons8.com/color/48/facebook.png" alt="facebook" />,
  twitter: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" alt="twitterx--v1" />,
  tiktok: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/tiktok--v1.png" alt="tiktok--v1" />,
  linkedin: () => <CustomIcon src="https://img.icons8.com/color/48/linkedin.png" alt="linkedin" />,
  pinterest: () => <CustomIcon src="https://img.icons8.com/color/48/pinterest--v1.png" alt="pinterest--v1" />,
  snapchat: () => <CustomIcon src="https://img.icons8.com/fluency/48/snapchat.png" alt="snapchat" />,
  dribbble: () => <CustomIcon src="https://img.icons8.com/fluency/48/dribbble.png" alt="dribbble" />,
  behance: () => <CustomIcon src="https://img.icons8.com/color/48/behance.png" alt="behance" />,
  vimeo: () => <CustomIcon src="https://img.icons8.com/plasticine/100/vimeo.png" alt="vimeo" />,
  soundcloud: () => <CustomIcon src="https://img.icons8.com/3d-fluency/94/soundcloud.png" alt="soundcloud" />,
  spotify: () => <CustomIcon src="https://img.icons8.com/fluency/48/spotify.png" alt="spotify" />,
  tidal: () => <CustomIcon src="https://img.icons8.com/fluency/48/tidal.png" alt="tidal" />,
  twitch: () => <CustomIcon src="https://img.icons8.com/color/48/twitch--v1.png" alt="twitch--v1" />,
  kick: Radio,
  kwai: Video,
  telegram: () => <CustomIcon src="https://img.icons8.com/color/48/telegram-app--v1.png" alt="telegram-app--v1" />,
  whatsapp: () => <CustomIcon src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1" />,
  discord: () => <CustomIcon src="https://img.icons8.com/color/48/discord-logo.png" alt="discord-logo" />,
  threads: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/threads.png" alt="threads" />,
  autodsk: Globe,
  envato: Globe,
  flaticon: () => <CustomIcon src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-flaticon-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-flaticon-social-media-tanah-basah-glyph-tanah-basah" />,
  freepik: () => <CustomIcon src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-freepik-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-freepik-social-media-tanah-basah-glyph-tanah-basah" />,
  gmail: () => <CustomIcon src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-new" />,
  itunes: () => <CustomIcon src="https://img.icons8.com/color/48/itunes.png" alt="itunes" />,
  licencias: () => <CustomIcon src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/68/external-licensing-marketing-and-business-management-smashingstocks-mixed-smashing-stocks.png" alt="external-licensing-marketing-and-business-management-smashingstocks-mixed-smashing-stocks" />,
  mixcloud: Music,
  motion: () => <CustomIcon src="https://img.icons8.com/external-those-icons-fill-those-icons/48/external-Mixcloud-social-media-those-icons-fill-those-icons.png" alt="external-Mixcloud-social-media-those-icons-fill" />,
  ok: () => <CustomIcon src="https://img.icons8.com/liquid-glass/48/ok-message.png" alt="ok-message" />,
  tripadvisor: () => <CustomIcon src="https://img.icons8.com/doodle/48/tripadvisor.png" alt="tripadvisor" />,
  traficoweb: () => <CustomIcon src="https://img.icons8.com/fluency/48/internet.png" alt="internet" />
}

export function PricingSelector() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedServiceSpecific, setSelectedServiceSpecific] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [usdToCop, setUsdToCop] = useState<number>(4200)
  const [servicesData, setServicesData] = useState<any>({})
  const [isPending, startTransition] = useTransition();
  

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

  const platformKeys = Object.keys(servicesData)
  const hasSubCategories = selectedPlatform && selectedCategory && servicesData[selectedPlatform]?.categories?.[selectedCategory]?.subCategories && Object.keys(servicesData[selectedPlatform]?.categories?.[selectedCategory]?.subCategories).length > 0
  const hasDirectTypes = selectedPlatform && selectedCategory && servicesData[selectedPlatform]?.categories?.[selectedCategory]?.types && Object.keys(servicesData[selectedPlatform]?.categories?.[selectedCategory]?.types).length > 0
  const categoryKeys = selectedPlatform ? Object.keys(servicesData[selectedPlatform]?.categories || {}) : []
  const subCategoryKeys = hasSubCategories ? Object.keys(servicesData[selectedPlatform]?.categories?.[selectedCategory]?.subCategories || {}) : []
  let typesPath: any = null
  if (hasSubCategories && selectedSubCategory) {
    typesPath = servicesData[selectedPlatform]?.categories?.[selectedCategory]?.subCategories?.[selectedSubCategory]?.types
  } else if (hasDirectTypes) {
    typesPath = servicesData[selectedPlatform]?.categories?.[selectedCategory]?.types
  }
  const typeKeys = typesPath ? Object.keys(typesPath) : []
  const hasNestedCategories = selectedType && typesPath?.[selectedType]?.categories
  const serviceKeys = hasNestedCategories ? Object.keys(typesPath[selectedType].categories) : []
  const hasNestedTypes = selectedService && typesPath?.[selectedType]?.categories?.[selectedService]?.types
  const serviceSpecificKeys = hasNestedTypes ? Object.keys(typesPath[selectedType].categories[selectedService].types) : []

  interface ServiceDetail {
    pricePerUnit: number;
    minQuantity: number;
    maxQuantity: number;
    deliveryTime: string;
    description: string;
    features: any;
  }

  const selectedData: ServiceDetail | null = (() => {
    if (!selectedPlatform || !selectedCategory || !selectedType) return null
    let dataPath: any = null
    if (hasSubCategories && selectedSubCategory) {
      if (hasNestedCategories && selectedService) {
        if (hasNestedTypes && selectedServiceSpecific) {
          dataPath = servicesData[selectedPlatform]?.categories?.[selectedCategory]?.subCategories?.[selectedSubCategory]?.types?.[selectedType]?.categories?.[selectedService]?.types?.[selectedServiceSpecific]
        } else if (!hasNestedTypes) {
          dataPath = servicesData[selectedPlatform]?.categories?.[selectedCategory]?.subCategories?.[selectedSubCategory]?.types?.[selectedType]?.categories?.[selectedService]
        }
      } else if (!hasNestedCategories) {
        dataPath = servicesData[selectedPlatform]?.categories?.[selectedCategory]?.subCategories?.[selectedSubCategory]?.types?.[selectedType]
      }
    } else if (!hasSubCategories) {
      if (hasNestedCategories && selectedService) {
        if (hasNestedTypes && selectedServiceSpecific) {
          dataPath = servicesData[selectedPlatform]?.categories?.[selectedCategory]?.types?.[selectedType]?.categories?.[selectedService]?.types?.[selectedServiceSpecific]
        } else if (!hasNestedTypes) {
          dataPath = servicesData[selectedPlatform]?.categories?.[selectedCategory]?.types?.[selectedType]?.categories?.[selectedService]
        }
      } else if (!hasNestedCategories) {
        dataPath = servicesData[selectedPlatform]?.categories?.[selectedCategory]?.types?.[selectedType]
      }
    }
    return dataPath || null
  })()

  const PlatformIcon = selectedPlatform ? iconMap[selectedPlatform] || Globe : null

  // Custom comments detection
  const isCustom = selectedType.toLowerCase().includes("personalizado")

  const quantityNum = Number.parseInt(quantity) || 0
  const lineCount = isCustom
    ? quantity
        .split("\n")
        .filter((line) => line.trim() !== "")
        .length
    : quantityNum

  const minQuantity = selectedData?.minQuantity || 0
  const maxQuantity = selectedData?.maxQuantity || 0
  const totalPriceUSD = selectedData && (isCustom ? lineCount > 0 : quantityNum > 0) ? (selectedData.pricePerUnit * (isCustom ? lineCount : quantityNum)).toFixed(2) : "0.00"
  const totalPriceCOP =
    selectedData && (isCustom ? lineCount > 0 : quantityNum > 0)
      ? Math.round(selectedData.pricePerUnit * (isCustom ? lineCount : quantityNum) * usdToCop).toLocaleString("es-CO")
      : "0"
  const isValidQuantity =
    selectedData && (isCustom ? lineCount >= minQuantity && lineCount <= maxQuantity : quantityNum >= minQuantity && quantityNum <= maxQuantity)

  return (
    <section id="precios" className="border-t border-border/50 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">Selecciona tu Servicio</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Elige la plataforma y el tipo de servicio que necesitas para hacer crecer tu presencia
          </p>
        </div>
        <div className="glass border-white rounded-2xl p-6 md:p-8">
          <div className="space-y-6">
            {/* Selector de Plataforma */}
            <div className="space-y-2">
              <Label htmlFor="platform" className="font-semibold text-white">
                1. Selecciona el Servicio
              </Label>
              <Select
                value={selectedPlatform}
                onValueChange={(value) => {
                  setSelectedPlatform(value)
                  setSelectedCategory("")
                  setSelectedSubCategory("")
                  setSelectedType("")
                  setSelectedService("")
                  setSelectedServiceSpecific("")
                  setQuantity("")
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
                    setSelectedSubCategory("")
                    setSelectedType("")
                    setSelectedService("")
                    setSelectedServiceSpecific("")
                    setQuantity("")
                  }}
                >
                  <SelectTrigger id="category" className="bg-white/50 h-12 border-white text-black">
                    <SelectValue placeholder="Elige una categoría..." className="text-black" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryKeys.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Selector de Subcategoría - Solo si tiene subCategories */}
            {selectedCategory && hasSubCategories && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="subcategory" className="font-semibold text-white">
                  3. Selecciona la Subcategoría
                </Label>
                <Select
                  value={selectedSubCategory}
                  onValueChange={(value) => {
                    setSelectedSubCategory(value)
                    setSelectedType("")
                    setSelectedService("")
                    setSelectedServiceSpecific("")
                    setQuantity("")
                  }}
                >
                  <SelectTrigger id="subcategory" className="bg-white/50 h-12 border-white text-black">
                    <SelectValue placeholder="Elige una subcategoría..." className="text-black" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategoryKeys.map((subCategory) => (
                      <SelectItem key={subCategory} value={subCategory}>
                        {subCategory}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Selector de Tipo */}
            {selectedCategory && (!hasSubCategories || selectedSubCategory) && (hasDirectTypes || (hasSubCategories && selectedSubCategory)) && typeKeys.length > 0 && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="type" className="text-white font-semibold">
                  {hasSubCategories ? "4. Selecciona el Tipo Específico" : "3. Selecciona el Tipo Específico"}
                </Label>
                <Select
                  value={selectedType}
                  onValueChange={(value) => {
                    setSelectedType(value)
                    setSelectedService("")
                    setSelectedServiceSpecific("")
                    setQuantity("")
                  }}
                >
                  <SelectTrigger id="type" className="bg-white/50 h-12 border-white text-black">
                    <SelectValue placeholder="Elige el tipo de servicio..." className="text-black" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeKeys.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Selector de Servicio Específico */}
            {selectedType && hasNestedCategories && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="service" className="text-white font-semibold">
                  {hasSubCategories ? "5. Selecciona el Servicio Específico" : "4. Selecciona el Servicio Específico"}
                </Label>
                <Select
                  value={selectedService}
                  onValueChange={(value) => {
                    setSelectedService(value)
                    setSelectedServiceSpecific("")
                    setQuantity("")
                  }}
                >
                  <SelectTrigger id="service" className="bg-white/50 h-12 border-white text-black">
                    <SelectValue placeholder="Elige el servicio específico..." className="text-black" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceKeys.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Selector de Servicio Específico Detallado */}
            {selectedService && hasNestedTypes && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="serviceSpecific" className="text-white font-semibold">
                  {hasSubCategories ? "6. Selecciona el Servicio Específico Detallado" : "5. Selecciona el Servicio Específico Detallado"}
                </Label>
                <Select
                  value={selectedServiceSpecific}
                  onValueChange={(value) => {
                    setSelectedServiceSpecific(value)
                    setQuantity("")
                  }}
                >
                  <SelectTrigger id="serviceSpecific" className="bg-white/50 h-12 border-white text-black max-w-full">
                    <SelectValue
                      placeholder="Elige el servicio específico detallado..."
                      className="truncate"
                    />
                  </SelectTrigger>
                  <SelectContent className="max-w-[90vw] sm:max-w-[420px]">
                    {serviceSpecificKeys.map((serviceSpecific) => (
                      <SelectItem
                        key={serviceSpecific}
                        value={serviceSpecific}
                        className="max-w-[400px]"
                      >
                        <div
                          className="truncate"
                          style={{ maxWidth: 360 }}
                          title={serviceSpecific}
                        >
                          {serviceSpecific}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {selectedData && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="quantity" className="text-white font-semibold">
                  {hasSubCategories && hasNestedCategories && hasNestedTypes ? "7. Ingresa la Cantidad" :
                   hasSubCategories && hasNestedCategories ? "6. Ingresa la Cantidad" :
                   hasSubCategories ? "4. Ingresa la Cantidad" :
                   hasNestedCategories && hasNestedTypes ? "6. Ingresa la Cantidad" :
                   hasNestedCategories ? "5. Ingresa la Cantidad" : "4. Ingresa la Cantidad"}
                </Label>

                {isCustom ? (
                  <>
                    <textarea
                      id="customComments"
                      placeholder="Un comentario por línea..."
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="bg-white/50 border-white h-32 w-full text-black p-3 rounded-lg resize-none"
                    />
                    <div className="flex justify-between items-center text-sm">
                      <p
                        className={
                          isValidQuantity
                            ? "text-green-400 font-medium"
                            : "text-red-400 font-medium"
                        }
                      >
                        {lineCount} comentario{lineCount !== 1 ? "s" : ""}{" "}
                        escrito
                      </p>
                      <p className="text-white/70">
                        Mín: {minQuantity} • Máx:{" "}
                        {maxQuantity}
                      </p>
                    </div>
                  </>
                ) : (
                  <Input
                    id="quantity"
                    type="number"
                    placeholder={`Mínimo ${minQuantity}, Máximo ${maxQuantity}`}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={minQuantity}
                    max={maxQuantity}
                    className="bg-white/50 border-white h-12 text-black"
                  />
                )}
                {quantity && !isValidQuantity && (
                  <p className="text-sm text-destructive">
                    La cantidad debe estar entre {minQuantity.toLocaleString()} y {maxQuantity.toLocaleString()}
                  </p>
                )}
              </div>
            )}
            {/* Información del Servicio Seleccionado */}
            {selectedData && PlatformIcon && quantity && isValidQuantity && (
              <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 border-t border-border/50 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                    {typeof PlatformIcon === 'function' ? <PlatformIcon /> : <PlatformIcon className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {selectedServiceSpecific || selectedService || selectedType}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPlatform} - {selectedCategory}
                      {selectedSubCategory && ` - ${selectedSubCategory}`}
                      {selectedType && ` - ${selectedType}`}
                      {selectedService && ` - ${selectedService}`}
                      {selectedServiceSpecific && ` - ${selectedServiceSpecific}`}
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="glass flex items-start gap-3 rounded-xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-light text-white">Cantidad</p>
                      <p className="text-xl font-bold text-white">{isCustom ? lineCount.toLocaleString() : quantityNum.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="glass flex items-start gap-3 rounded-xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div className="w-full">
                      <p className="text-sm font-light text-white">Costo Total</p>
                      <p className="text-lg font-bold text-white">${totalPriceUSD} USD</p>
                      <p className="text-sm font-light text-white">${totalPriceCOP} COP</p>
                    </div>
                  </div>
                  <div className="glass flex items-start gap-3 rounded-xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-light text-white">Tiempo</p>
                      <p className="text-xl font-bold text-white">{selectedData.deliveryTime}</p>
                    </div>
                  </div>
                </div>
                {/* Descripción */}
                <div className="glass rounded-xl p-6">
                  <h4 className="mb-3 font-bold text-white">Descripción del Servicio</h4>
                  <p className="mb-4 text-pretty leading-relaxed text-white">{selectedData.description}</p>
                  <div className="space-y-2">
                    {(Array.isArray(selectedData.features) ? selectedData.features : [
                      "Rápido y seguro",
                      "Muy rápido",
                      "Entrega en menos de 24 horas",
                      "Cuenta personal de estudiante",
                      "46 productos con licencia"
                    ]).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-white/20" />
                        <span className="text-sm text-white font-extralight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 6️⃣ Enviar (cliente -> server action) */}
            {selectedData && isValidQuantity && (
              <div className="mt-2 text-center">
                <Button
                  onClick={() => {
                    const message = encodeURIComponent(
                      `¡Hola! Quiero hacer un pedido:\n\n` +
                      `📱 Plataforma: ${selectedPlatform}\n` +
                      `📂 Categoría: ${selectedCategory}\n` +
                      `${selectedSubCategory ? `📂 Subcategoría: ${selectedSubCategory}\n` : ''}` +
                      `🔧 Tipo: ${selectedType}\n` +
                      `${selectedService ? `🔧 Servicio: ${selectedService}\n` : ''}` +
                      `${selectedServiceSpecific ? `🔧 Servicio Específico: ${selectedServiceSpecific}\n` : ''}` +
                      `📦 Cantidad: ${isCustom ? lineCount.toLocaleString() : quantityNum.toLocaleString()}\n` +
                      `💰 Precio USD: $${totalPriceUSD}\n` +
                      `💰 Precio COP: $${totalPriceCOP}\n` +
                      `⏰ Tiempo de entrega: ${selectedData.deliveryTime}\n\n` +
                      `📝 Descripción: ${selectedData.description}`
                    )
                    window.open(`https://wa.me/573219412929?text=${message}`, '_blank')
                  }}
                  disabled={isPending}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  {isPending ? "Enviando..." : "Enviar Pedido por WhatsApp"}
                </Button>
              </div>
            )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
