import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface CartItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("onlyliyah-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      /* ignore invalid cart data */
    }
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("onlyliyah-cart", JSON.stringify(next));
    }
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        if (existing) {
          const next = prev.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
          );
          persist(next);
          return next;
        }
        const next = [...prev, { ...item, quantity: 1 }];
        persist(next);
        return next;
      });
      setIsCartOpen(true);
    },
    [persist]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const next = prev.filter((i) => i.productId !== productId);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId);
        return;
      }
      setItems((prev) => {
        const next = prev.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        );
        persist(next);
        return next;
      });
    },
    [persist, removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("onlyliyah-cart");
    }
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
