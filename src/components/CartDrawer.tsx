import React from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[rgba(30,18,24,0.3)] backdrop-blur-sm z-[600] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0D0D0D] z-[601] shadow-[-20px_0_60px_rgba(0,0,0,0.7)] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,45,107,0.2)]">
          <h2 className="font-[Cormorant_Garamond] text-[1.2rem] font-bold text-[#F5F0EB]">
            Your Basket
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-[rgba(255,45,107,0.12)] rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#FF2D6B]" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#B8AEA8]">
              <ShoppingBag className="w-12 h-12 mb-4 opacity-40" strokeWidth={1} />
              <p className="text-[0.9rem]">Your basket is empty</p>
              <p className="text-[0.78rem] mt-1">Add some beautiful pieces</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 bg-[#1F1F1F] border border-[rgba(255,45,107,0.2)] p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover saturate-[0.75]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-[Cormorant_Garamond] text-[0.95rem] font-bold text-[#F5F0EB] truncate">
                      {item.name}
                    </div>
                    <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.2em] uppercase text-[#FF2D6B] mb-2">
                      {item.sku}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-7 h-7 border border-[rgba(255,45,107,0.35)] flex items-center justify-center hover:border-[#FF2D6B] transition-colors"
                        >
                          <Minus className="w-3 h-3 text-[#FF2D6B]" strokeWidth={1.5} />
                        </button>
                        <span className="text-[0.85rem] text-[#F5F0EB] w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-7 h-7 border border-[rgba(255,45,107,0.35)] flex items-center justify-center hover:border-[#FF2D6B] transition-colors"
                        >
                          <Plus className="w-3 h-3 text-[#FF2D6B]" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="font-[DM_Mono] text-[0.85rem] text-[#FF2D6B] font-medium">
                        R{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="self-start p-1 text-[#6B5F58] hover:text-[#FF2D6B] transition-colors"
                  >
                    <X className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[rgba(255,45,107,0.2)] bg-[#1F1F1F]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[0.85rem] text-[#B8AEA8]">Subtotal</span>
              <span className="font-[Cormorant_Garamond] text-[1.3rem] font-bold text-[#FF2D6B]">
                R{totalPrice.toLocaleString()}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-[#FF2D6B] hover:bg-[#e02560] text-white text-center py-4 text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(255,45,107,0.35)] no-underline rounded-[2px]"
            >
              Place Order via WhatsApp
            </Link>
            <button
              onClick={clearCart}
              className="w-full mt-3 text-[0.72rem] tracking-[0.15em] uppercase text-[#6B5F58] hover:text-[#FF2D6B] transition-colors"
            >
              Clear Basket
            </button>
          </div>
        )}
      </div>
    </>
  );
}
