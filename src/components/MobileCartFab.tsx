import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function MobileCartFab() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <button
      type="button"
      onClick={() => setIsCartOpen(true)}
      className="md:hidden fixed bottom-6 right-6 z-[450] w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-[0_12px_30px_rgba(var(--accent-rgb),0.35)] flex items-center justify-center transition-all duration-300 hover:bg-[var(--accent)] hover:scale-105 active:scale-95"
      aria-label="Open basket"
    >
      <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 bg-[var(--accent)] text-white text-[0.6rem] font-medium rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}
