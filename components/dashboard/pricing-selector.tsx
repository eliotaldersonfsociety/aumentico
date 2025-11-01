"use client";

import { useState, useEffect, useTransition } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  MessageCircle,
  Music,
  Radio,
  Linkedin,
  Hash,
  ImageIcon,
  Globe,
  Star,
  Smartphone,
  MapPin,
  Mail,
  Clock,
  DollarSign,
  Package,
  CheckCircle2,
  Video,
  Link as LinkIcon,
} from "lucide-react";
import { saveOrder } from "@/app/actions/saveOrder";
import { getSettings } from "@/app/actions/settings";
import { loadServicesData } from "@/lib/servicesData";
import { Button } from "../ui/button";

// Componente para iconos personalizados
const CustomIcon = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="h-4 w-4" />
)

const iconMap: Record<string, any> = {
  Instagram: () => <CustomIcon src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new" />,
  TikTok: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/tiktok--v1.png" alt="tiktok--v1" />,
  YouTube: () => <CustomIcon src="https://img.icons8.com/color/48/youtube-squared.png" alt="youtube-squared" />,
  Facebook: () => <CustomIcon src="https://img.icons8.com/color/48/facebook.png" alt="facebook" />,
  "Twitter/X": () => <CustomIcon src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" alt="twitterx--v1" />,
  Telegram: () => <CustomIcon src="https://img.icons8.com/color/48/telegram-app--v1.png" alt="telegram-app--v1" />,
  WhatsApp: () => <CustomIcon src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1" />,
  Spotify: () => <CustomIcon src="https://img.icons8.com/fluency/48/spotify.png" alt="spotify" />,
  Twitch: () => <CustomIcon src="https://img.icons8.com/color/48/twitch--v1.png" alt="twitch--v1" />,
  Kick: Radio,
  Kwai: Video,
  LinkedIn: () => <CustomIcon src="https://img.icons8.com/color/48/linkedin.png" alt="linkedin" />,
  Discord: () => <CustomIcon src="https://img.icons8.com/color/48/discord-logo.png" alt="discord-logo" />,
  Pinterest: () => <CustomIcon src="https://img.icons8.com/color/48/pinterest--v1.png" alt="pinterest--v1" />,
  Vimeo: () => <CustomIcon src="https://img.icons8.com/plasticine/100/vimeo.png" alt="vimeo" />,
  SoundCloud: () => <CustomIcon src="https://img.icons8.com/3d-fluency/94/soundcloud.png" alt="soundcloud" />,
  Snapchat: () => <CustomIcon src="https://img.icons8.com/fluency/48/snapchat.png" alt="snapchat" />,
  Dribbble: () => <CustomIcon src="https://img.icons8.com/fluency/48/dribbble.png" alt="dribbble" />,
  Threads: () => <CustomIcon src="https://img.icons8.com/ios-filled/50/threads.png" alt="threads" />,
  Tidal: () => <CustomIcon src="https://img.icons8.com/fluency/48/tidal.png" alt="tidal" />,
  iTunes: () => <CustomIcon src="https://img.icons8.com/color/48/itunes.png" alt="itunes" />,
  "Tráfico Web": () => <CustomIcon src="https://img.icons8.com/fluency/48/internet.png" alt="internet" />,
  "Reseñas Google": Star,
  "Apps Android": Smartphone,
  "Apps iOS": Smartphone,
  TripAdvisor: () => <CustomIcon src="https://img.icons8.com/doodle/48/tripadvisor.png" alt="tripadvisor" />,
  "Reseñas Gmail": () => <CustomIcon src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-new" />,
  // Agregar más iconos según sea necesario
  Behance: () => <CustomIcon src="https://img.icons8.com/color/48/behance.png" alt="behance" />,
  AutoDesk: Globe,
  Envato: Globe,
  Flaticon: () => <CustomIcon src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-flaticon-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-flaticon-social-media-tanah-basah-glyph-tanah-basah" />,
  Freepik: () => <CustomIcon src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-freepik-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-freepik-social-media-tanah-basah-glyph-tanah-basah" />,
  Licencias: () => <CustomIcon src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/68/external-licensing-marketing-and-business-management-smashingstocks-mixed-smashing-stocks.png" alt="external-licensing-marketing-and-business-management-smashingstocks-mixed-smashing-stocks" />,
  MixCloud: Music,
  Motion: Video,
  OK: () => <CustomIcon src="https://img.icons8.com/liquid-glass/48/ok-message.png" alt="ok-message" />,
  TraficoWeb: () => <CustomIcon src="https://img.icons8.com/fluency/48/internet.png" alt="internet" />,
  // Versiones en minúscula
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
  motion: Video,
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
  const [postUrl, setPostUrl] = useState<string>("")
  const [successMsg, setSuccessMsg] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const [usdToCop, setUsdToCop] = useState<number>(4200)
  const [servicesData, setServicesData] = useState<any>({})

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

  const ServiceIcon = selectedPlatform ? iconMap[selectedPlatform] || Video : null

  // -------------------------
  // Client-side URL validation
  // -------------------------
  function validateUrlClient(url: string) {
    try {
      const parsed = new URL(url.trim());
      if (parsed.protocol !== "https:") return false;

      const allowed = [
        "instagram.com",
        "facebook.com",
        "youtube.com",
        "tiktok.com",
        "x.com",
        "twitter.com",
        "www.instagram.com",
        "www.facebook.com",
        "www.youtube.com",
        "www.tiktok.com",
        "www.x.com",
        "www.twitter.com",
      ];

      const hostname = parsed.hostname.toLowerCase();
      const ok = allowed.some(
        (d) => hostname === d || hostname.endsWith("." + d)
      );
      return ok;
    } catch {
      return false;
    }
  }

  // Build FormData to pass to saveOrder (server action)
  function buildOrderFormData() {
    const fd = new FormData();
    fd.set("servicio", selectedPlatform);
    fd.set("categoria", selectedCategory);
    fd.set("tipo", selectedType);
    fd.set("cantidad", (isCustom ? lineCount : quantityNum).toString());
    fd.set("link", postUrl.trim());
    fd.set("precioUSD", totalPriceUSD);
    fd.set("precioCOP", totalPriceCOP);

    // Agregar subcategoría si existe
    if (selectedSubCategory) {
      fd.set("subcategoria", selectedSubCategory);
    }
    // Agregar servicio específico si existe
    if (selectedService) {
      fd.set("servicioEspecifico", selectedService);
    }
    // Agregar servicio específico detallado si existe
    if (selectedServiceSpecific) {
      fd.set("servicioEspecificoDetallado", selectedServiceSpecific);
    }
    // Agregar comentarios personalizados si aplica
    if (isCustom) {
      fd.set("customComments", quantity);
    }

    return fd;
  }

  // Client submit that validates URL and calls server action via startTransition
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!selectedPlatform || !selectedCategory || !selectedType) {
      setErrorMsg("Completa plataforma, categoría y tipo antes de enviar.");
      return;
    }
    if (!isValidQuantity) {
      setErrorMsg("Cantidad inválida según los límites del servicio.");
      return;
    }
    if (!postUrl || !validateUrlClient(postUrl)) {
      setErrorMsg(
        "El enlace no es válido. Debe ser HTTPS y de Instagram/Facebook/YouTube/TikTok/X/Twitter."
      );
      return;
    }

    const fd = buildOrderFormData();

    startTransition(() => {
      (async () => {
        try {
          const result = await saveOrder(fd); // espera la respuesta del server action

          if (result?.error) {
            setErrorMsg(result.error);
            return;
          }

          setSuccessMsg("✅ Pedido enviado con éxito");
          // reset form
          setSelectedPlatform("");
          setSelectedCategory("");
          setSelectedSubCategory("");
          setSelectedType("");
          setSelectedService("");
          setSelectedServiceSpecific("");
          setQuantity("");
          setPostUrl("");
        } catch (err: any) {
          console.error("Error saveOrder:", err);
          setErrorMsg(err?.message ?? "Error al enviar el pedido en el servidor.");
        }
      })();
    });
  }

  return (
    <section id="precios" className="border-t border-border/50 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-white">
            Selecciona tu Servicio
          </h2>
          <p className="text-lg text-white/80">
            Elige la plataforma y el tipo de servicio que necesitas para hacer
            crecer tu presencia.
          </p>
        </div>

        <div className="glass border-white rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1️⃣ Servicio */}
            <div className="space-y-2">
              <Label htmlFor="service" className="font-semibold text-white">
                1. Selecciona el Servicio
              </Label>
              <Select
                value={selectedPlatform}
                onValueChange={(v: string) => {
                  setSelectedPlatform(v)
                  setSelectedCategory("")
                  setSelectedSubCategory("")
                  setSelectedType("")
                  setSelectedService("")
                  setSelectedServiceSpecific("")
                  setQuantity("")
                  setPostUrl("")
                }}
              >
                <SelectTrigger
                  id="service"
                  className="bg-white/50 h-12 border-white text-black"
                >
                  <SelectValue placeholder="Elige una plataforma..." />
                </SelectTrigger>
                <SelectContent>
                  {platformKeys.map((platform) => {
                    const Icon = iconMap[platform] || Globe
                    return (
                      <SelectItem key={platform} value={platform}>
                        <div className="flex items-center gap-2">
                          {typeof Icon === 'function' ? <Icon /> : Icon && <Icon className="h-4 w-4 text-black" />}
                          <span className="text-black truncate">{platform}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* 2️⃣ Categoría */}
            {selectedPlatform && categoryKeys.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white font-semibold">
                  2. Selecciona la Categoría
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value: string) => {
                    setSelectedCategory(value);
                    setSelectedSubCategory("")
                    setSelectedType("");
                    setSelectedService("")
                    setSelectedServiceSpecific("")
                    setQuantity("");
                    setPostUrl("");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                >
                  <SelectTrigger
                    id="category"
                    className="bg-white/50 h-12 border-white text-black max-w-full"
                  >
                    <SelectValue
                      placeholder="Elige una categoría..."
                      className="truncate"
                    />
                  </SelectTrigger>
                  <SelectContent className="max-w-[90vw] sm:max-w-[420px]">
                    {categoryKeys.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="max-w-[400px]"
                      >
                        <div
                          className="truncate"
                          style={{ maxWidth: 360 }}
                          title={category}
                        >
                          {category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* 3️⃣ Subcategoría - Solo si tiene subCategories */}
            {selectedCategory && hasSubCategories && (
              <div className="space-y-2">
                <Label htmlFor="subcategory" className="text-white font-semibold">
                  3. Selecciona la Subcategoría
                </Label>
                <Select
                  value={selectedSubCategory}
                  onValueChange={(value: string) => {
                    setSelectedSubCategory(value)
                    setSelectedType("")
                    setSelectedService("")
                    setSelectedServiceSpecific("")
                    setQuantity("")
                    setPostUrl("")
                  }}
                >
                  <SelectTrigger
                    id="subcategory"
                    className="bg-white/50 h-12 border-white text-black"
                  >
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

            {/* 4️⃣ Tipo */}
            {selectedCategory && (!hasSubCategories || selectedSubCategory) && (hasDirectTypes || (hasSubCategories && selectedSubCategory)) && typeKeys.length > 0 && (
              <div className="space-y-2">
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

            {/* 5️⃣ Servicio Específico */}
            {selectedType && hasNestedCategories && (
              <div className="space-y-2">
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

            {/* 6️⃣ Servicio Específico Detallado */}
            {selectedService && hasNestedTypes && (
              <div className="space-y-2">
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
              <div className="space-y-2">
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

            {/* 5️⃣ URL */}
            {selectedData && isValidQuantity && (
              <div className="space-y-2">
                <Label
                  htmlFor="postUrl"
                  className="text-white font-semibold flex items-center gap-2"
                >
                  5. Ingresa el Link del Post o Perfil
                  <LinkIcon className="h-4 w-4 text-white/80" />
                </Label>
                <Input
                  id="postUrl"
                  name="postUrl"
                  type="url"
                  placeholder="https://www.instagram.com/p/ejemplo/  "
                  value={postUrl}
                  onChange={(e) => {
                    setPostUrl(e.target.value);
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className="bg-white/50 border-white h-12 text-black"
                />
              </div>
            )}

            {/* Error / Success UI */}
            {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
            {successMsg && (
              <p className="text-sm text-green-400">{successMsg}</p>
            )}

            {/* 6️⃣ Enviar (cliente -> server action) */}
            {selectedData && isValidQuantity && postUrl && (
              <div className="mt-2 text-center">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  {isPending ? "Enviando..." : "Enviar Pedido"}
                </button>
              </div>
            )}

            {/* 7️⃣ Resultados (información resumen) */}
            {selectedData && isValidQuantity && postUrl && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-3 border-t border-border/50 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                    {typeof PlatformIcon === 'function' ? <PlatformIcon /> : <PlatformIcon className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {selectedServiceSpecific || selectedService || selectedType}
                    </h3>
                    <p className="text-sm text-white/70">
                      {selectedPlatform} - {selectedCategory}
                      {selectedSubCategory && ` - ${selectedSubCategory}`}
                      {selectedType && ` - ${selectedType}`}
                      {selectedService && ` - ${selectedService}`}
                      {selectedServiceSpecific && ` - ${selectedServiceSpecific}`}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="glass p-4 rounded-xl flex items-start gap-3">
                    <Package className="h-5 w-5 text-white/80" />
                    <div>
                      <p className="text-sm text-white/70">Cantidad</p>
                      <p className="text-xl font-bold text-white">{lineCount}</p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-white/80" />
                    <div>
                      <p className="text-sm text-white/70">Costo Total</p>
                      <p className="text-lg font-bold text-white">
                        ${totalPriceUSD} USD
                      </p>
                      <p className="text-sm text-white/70">
                        ${totalPriceCOP} COP
                      </p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl flex items-start gap-3">
                    <Clock className="h-5 w-5 text-white/80" />
                    <div>
                      <p className="text-sm text-white/70">Tiempo</p>
                      <p className="text-xl font-bold text-white">
                        {selectedData.deliveryTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h4 className="mb-3 font-bold text-white">
                    Descripción del Servicio
                  </h4>
                  <p className="mb-4 text-white/90">
                    {selectedData.description}
                  </p>
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
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}