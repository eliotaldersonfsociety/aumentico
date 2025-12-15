"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, Eye, EyeOff } from "lucide-react";
import { validateSession } from "@/app/actions/auth/validate-session";
import { loginForCheckout } from "@/app/actions/auth/login-checkout";
import { registerForCheckout } from "@/app/actions/auth/register-checkout";
import { saveOrder } from "@/app/actions/saveOrder";
import { getCart, CartItem } from "@/lib/cart";

export default function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Login/Register form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Checkout form states
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [instagramLink, setInstagramLink] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Service data from URL params (for single item)
  const [serviceData, setServiceData] = useState({
    servicio: 'MLBB - 30 days',
    categoria: 'Mobile Legends',
    tipo: 'days',
    cantidad: '30',
    precioUSD: '50.00',
    precioCOP: '200000'
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateSession();
        if (result.valid && result.user) {
          setUser(result.user);
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    // Load cart items
    const items = getCart();
    setCartItems(items);
  }, []);

  useEffect(() => {
    // Read service data from URL params
    const servicio = searchParams.get('servicio') || 'MLBB - 30 days';
    const categoria = searchParams.get('categoria') || 'Mobile Legends';
    const tipo = searchParams.get('tipo') || 'days';
    const cantidad = searchParams.get('cantidad') || '30';
    const precioUSD = searchParams.get('precioUSD') || '50.00';
    const precioCOP = searchParams.get('precioCOP') || '200000';

    console.log('URL params:', { servicio, categoria, tipo, cantidad, precioUSD, precioCOP });

    setServiceData({
      servicio,
      categoria,
      tipo,
      cantidad,
      precioUSD,
      precioCOP
    });
  }, [searchParams]);

  const handleLogin = async (formData: FormData) => {
    try {
      const result = await loginForCheckout(formData);
      if (result.success) {
        setUser(result.user);
      } else {
        alert(result.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al iniciar sesión");
    }
  };

  const handleRegister = async (formData: FormData) => {
    try {
      const result = await registerForCheckout(formData);
      if (result.success) {
        setUser(result.user);
        alert("Registro exitoso. Ahora puedes proceder al pago.");
      } else {
        alert(result.error || "Error al registrarse");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrarse");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    const itemsToOrder = cartItems.length > 0 ? cartItems : [{
      name: serviceData.servicio,
      categoria: serviceData.categoria,
      tipo: serviceData.tipo,
      quantity: parseInt(serviceData.cantidad),
      price: parseFloat(serviceData.precioUSD)
    }];

    let successCount = 0;
    for (const item of itemsToOrder) {
      const formData = new FormData();
      formData.append('servicio', item.name);
      formData.append('categoria', item.categoria || 'Instagram Likes');
      formData.append('tipo', item.tipo || 'likes');
      formData.append('cantidad', item.quantity.toString());
      formData.append('link', instagramLink || '');
      formData.append('precioUSD', item.price.toString());
      formData.append('precioCOP', Math.round(item.price * 4200).toString());
      if (specialRequests) {
        formData.append('customComments', specialRequests);
      }
      if (uploadedFile) {
        formData.append('file', uploadedFile);
      }

      const result = await saveOrder(formData, true);
      if (result.success) {
        successCount++;
      } else {
        console.error('Error saving order:', result.error);
        alert(`Error al enviar el pedido: ${result.error}`);
      }
    }

    if (successCount > 0) {
      alert(`${successCount} pedido(s) enviado(s) exitosamente. Procesaremos tu orden en 24 horas.`);
      router.push('/dashboard/client');
    } else {
      alert("Error al enviar los pedidos");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[oklch(0.145_0_0)]">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Cargando...</h1>
          <p>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[oklch(0.145_0_0)] text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {!user ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-2 text-purple-gradient">
              Iniciar Sesión para Continuar
            </h1>
            <p className="text-center text-white mb-12">
              Debes iniciar sesión o registrarte para completar tu compra.
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex justify-center mb-6">
                <div className="flex bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`px-4 py-2 rounded-md transition ${isLogin ? 'bg-white/20 text-white' : 'text-white/60'}`}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`px-4 py-2 rounded-md transition ${!isLogin ? 'bg-white/20 text-white' : 'text-white/60'}`}
                  >
                    Registrarse
                  </button>
                </div>
              </div>

              {isLogin ? (
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Iniciar Sesión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form action={handleLogin} className="space-y-4">
                      <div>
                        <label className="block text-white mb-2">Email</label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="tuemail@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/20 border-white/30 text-white placeholder-white/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Contraseña</label>
                        <div className="relative">
                          <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/20 border-white/30 text-white placeholder-white/50 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                        Iniciar Sesión
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Registrarse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form action={handleRegister} className="space-y-4">
                      <div>
                        <label className="block text-white mb-2">Nombre</label>
                        <Input
                          name="name"
                          type="text"
                          placeholder="Tu nombre"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-white/20 border-white/30 text-white placeholder-white/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Email</label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="tuemail@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/20 border-white/30 text-white placeholder-white/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Teléfono</label>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="Tu teléfono"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-white/20 border-white/30 text-white placeholder-white/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Contraseña</label>
                        <div className="relative">
                          <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/20 border-white/30 text-white placeholder-white/50 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                        Registrarse
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-center mb-2 text-purple-gradient">
              Completa tu compra
            </h1>
            <p className="text-center text-white mb-12">
              Complete sus datos y cargue el comprobante de pago para completar su pedido.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.length > 0 ? (
                    <>
                      {cartItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex justify-between items-center">
                          <span className="text-white">{item.name}</span>
                          <span className="text-white font-bold">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                      <hr className="border-white/20" />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-white">Total:</span>
                        <span className="text-purple-gradient">
                          ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-white">{serviceData.servicio}</span>
                      <span className="text-white font-bold">${serviceData.precioUSD}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Checkout Form */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">información adicional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">Email</label>
                    <Input
                      type="email"
                      value={user.email}
                      readOnly
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Link de Instagram</label>
                    <Input
                      type="url"
                      placeholder="https://instagram.com/tuusuario"
                      value={instagramLink}
                      onChange={(e) => setInstagramLink(e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Solicitudes o preguntas especiales</label>
                    <Textarea
                      placeholder="Any special requests or questions..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder-white/50"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">
                      Subir comprobante de pago <span className="text-red-400">*</span>
                    </label>
                    <p className="text-white/80 text-sm mb-2">
                      Sube una captura de pantalla de tu pago. Formatos aceptados: JPG, PNG, PDF.
                    </p>
                    <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-8 w-8 text-white/60 mb-2" />
                        <p className="text-white/80">
                          {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                        </p>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Instructions */}
            <Card className="mt-8 bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Instrucciones de pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-white mb-4">1. Envíe $ a uno de nuestros métodos de pago:</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">PayPal:</h4>
                      <p className="text-white/80">bucarmarketing@gmail.com</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Zelle:</h4>
                      <p className="text-white/80">9549313426 Maikol Ardila</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Nequi:</h4>
                      <p className="text-white/80">3219412929</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-white">
                  <p>2. Tome una captura de pantalla de la transacción</p>
                  <p>3. Sube el archivo arriba y envía este formulario.</p>
                  <p>4. Procesaremos su pedido dentro de las 24 horas y le avisamos en el dashboard cuando este listo.</p>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-6"
                  disabled={!uploadedFile}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Order
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}