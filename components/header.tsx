"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu, User, ShoppingCart, Sun, Moon, X, Trash2 } from "lucide-react";
import Logo from "@/public/logo/logo";
import SmallLogo from "@/public/logo/smalllogo";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { logout } from "@/app/actions/auth/logout";
import { getCartCount, getCart, removeFromCart, clearCart, CartItem } from "@/lib/cart";

interface HeaderProps {
  className?: string;
  cartCount?: number;
  onCartClick?: () => void;
}

export function Header({ className, cartCount: propCartCount = 0, onCartClick }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState("inicio");
  const { theme, toggleTheme } = useTheme();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(propCartCount ?? 0);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "pricing", "faq"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveMenu(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadCart = () => {
      const cartItems = getCart();
      setCart(cartItems);
      if (propCartCount === undefined) {
        setCartCount(cartItems.length);
      }
    };

    loadCart();

    // Listen for storage changes
    const handleStorageChange = () => loadCart();
    window.addEventListener('storage', handleStorageChange);

    // Listen for cart updates
    const handleCartUpdate = () => {
      console.log('Cart updated event received');
      loadCart();
    };
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (propCartCount !== undefined) {
      setCartCount(propCartCount);
    }
  }, [propCartCount]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveMenu(sectionId);
  };

  return (
    <header
      className={`${theme === 'dark' ? 'bg-[oklch(0.145_0_0)]' : 'bg-white'} fixed top-0 left-0 w-full z-50 ${
        className || ""
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <SmallLogo />
            </Link>
          </div>

          {/* Navegación escritorio */}
          <nav className="hidden items-center gap-6 md:flex">
            <button
              onClick={() => window.location.href = "/"}
              className={`text-sm font-medium px-3 py-2 rounded-md transition-all ${
                activeMenu === "inicio" ? "text-pink-400 bg-pink-500/20" : `${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-md`
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className={`text-sm font-medium px-3 py-2 rounded-md transition-all ${
                activeMenu === "features" ? "text-pink-400 bg-pink-500/20" : `${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-md`
              }`}
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className={`text-sm font-medium px-3 py-2 rounded-md transition-all ${
                activeMenu === "pricing" ? "text-pink-400 bg-pink-500/20" : `${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-md`
              }`}
            >
              Precios
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className={`text-sm font-medium px-3 py-2 rounded-md transition-all ${
                activeMenu === "faq" ? "text-pink-400 bg-pink-500/20" : `${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-md`
              }`}
            >
              FAQ
            </button>
            <Link href="/contacto">
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-md transition-all px-3 py-2 rounded-md cursor-pointer`}>
                Contacto
              </span>
            </Link>
          </nav>

          {/* Botones escritorio */}
          <div className="hidden md:flex items-center gap-3">
            {/* Menú hamburguesa */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-pink-400 hover:bg-pink-500/20 transition-colors`}>
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex flex-col justify-between bg-[oklch(0.145_0_0)] border-white/30 overflow-y-auto"
              >
                <div>
                  <SheetHeader>
                    <VisuallyHidden>
                      <SheetTitle>Menú</SheetTitle>
                    </VisuallyHidden>
                    <div className="flex items-center justify-between">
                      <SmallLogo />
                    </div>
                  </SheetHeader>

                  <nav className="mt-8 flex flex-col gap-4 ml-6">
                    <a href="/" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">Inicio</a>
                    <a href="#servicios" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">Servicios</a>
                    <a href="#precios" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">Precios</a>
                    <a href="#faq" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">FAQ</a>
                    <a href="/contacto" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">Contacto</a>
                    <div className="border-t border-white/30 my-4"></div>
                    <span className="text-xs text-white/80 font-semibold px-3">Landing Pages</span>
                    <a href="/instagram" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">Instagram</a>
                  </nav>
                </div>

                <hr />

                <div className="flex flex-col gap-3 mb-5 mx-6">
                  <Button
                    onClick={onCartClick || (() => setShowCart(!showCart))}
                    variant="ghost"
                    className="relative bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-all"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Carrito ({cartCount})
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                  <div className="flex gap-3">
                    <Link href="/auth/login">
                      <Button variant="ghost" size="lg" className="bg-white/20 shadow-md text-white border border-white/30 hover:bg-white/30 transition-all">
                        <User />
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button size="lg" className="w-full bg-white/20 border shadow-md border-white/30 text-white hover:bg-white/30 transition-all">
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Carrito */}
            <Button
              onClick={onCartClick || (() => setShowCart(!showCart))}
              variant="ghost"
              size="icon"
              className={`relative ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-pink-400 hover:bg-pink-500/20 transition-colors`}
            >
              <ShoppingCart className="h-8 w-8" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Tema */}
            <Button
              variant="ghost"
              size="icon"
              className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-pink-400 hover:bg-pink-500/20 transition-colors`}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />}
            </Button>

            {/* Dashboard */}
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="bg-purple-600 text-white hover:bg-purple-700 transition-all"
              >
                Dashboard
              </Button>
            </Link>

            {/* Logout */}
            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="bg-gray-600 text-white hover:bg-gray-700 transition-all"
              >
                Logout
              </Button>
            </form>
          </div>

          {/* Menú móvil (solo móviles) */}
          <div className="md:hidden flex items-center gap-2">
            {/* Menú hamburguesa */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-pink-400 hover:bg-pink-500/20 transition-colors">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex flex-col justify-between bg-[oklch(0.145_0_0)] border-white/30 overflow-y-auto"
              >
                <div>
                  <SheetHeader>
                    <VisuallyHidden>
                      <SheetTitle>Menú</SheetTitle>
                    </VisuallyHidden>
                    <div className="flex items-center justify-between">
                      <SmallLogo />
                    </div>
                  </SheetHeader>

                  <nav className="mt-8 flex flex-col gap-4 ml-6">
                    <a href="/" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">Inicio</a>
                    <a href="#servicios" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">Servicios</a>
                    <a href="#precios" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">Precios</a>
                    <a href="#faq" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">FAQ</a>
                    <a href="/contacto" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">Contacto</a>
                    <div className="border-t border-white/30 my-4"></div>
                    <span className="text-xs text-white/80 font-semibold px-3">Landing Pages</span>
                    <a href="/instagram" className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md">Instagram</a>
                  </nav>
                </div>

                <hr />

                <div className="flex flex-col gap-3 mb-5 mx-6">
                  <Button
                    onClick={onCartClick || (() => setShowCart(!showCart))}
                    variant="ghost"
                    className="relative bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-all"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Carrito ({cartCount})
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                  <div className="flex gap-3">
                    <Link href="/auth/login">
                      <Button variant="ghost" size="lg" className="bg-white/20 shadow-md text-white border border-white/30 hover:bg-white/30 transition-all">
                        <User />
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button size="lg" className="w-full bg-white/20 border shadow-md border-white/30 text-white hover:bg-white/30 transition-all">
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Carrito */}
            <Button
              onClick={onCartClick || (() => setShowCart(!showCart))}
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-pink-400 hover:bg-pink-500/20 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Tema */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-pink-400 hover:bg-pink-500/20 transition-colors"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>

            {/* Dashboard (User icon en móvil) */}
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-pink-400 hover:bg-pink-500/20 transition-colors"
              >
                <User className="h-6 w-6" />
              </Button>
            </Link>

            {/* Logout (icono) */}
            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="text-white hover:text-pink-400 hover:bg-pink-500/20 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Sidebar del Carrito */}
      <Sheet open={showCart} onOpenChange={setShowCart}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-[oklch(0.145_0_0)] z-[60]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <ShoppingCart className="h-5 w-5 text-purple-500" />
              Carrito de Compras
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500">Tu carrito está vacío</p>
            ) : (
              <>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.categoria} - {item.tipo}</p>
                        <p className="text-sm">Cantidad: {item.quantity}</p>
                        <p className="text-sm font-semibold">${item.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">${cart.reduce((sum, item) => sum + item.price, 0)}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowCart(false)}
                      className="flex-1"
                    >
                      Continuar Comprando
                    </Button>
                    <Link href="/checkout" className="flex-1">
                      <Button className="w-full bg-pink-500 hover:bg-pink-600">
                        Proceder al Pago
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

    </header>
  );
}
