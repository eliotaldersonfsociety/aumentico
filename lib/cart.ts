export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  categoria: string;
  tipo: string;
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item: CartItem) => {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const removeFromCart = (id: string) => {
  if (typeof window === 'undefined') return;
  const cart = getCart().filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('cartUpdated'));
};

export const getCartTotal = (): number => {
  return getCart().reduce((sum, item) => sum + item.price, 0);
};

export const getCartCount = (): number => {
  return getCart().length;
};