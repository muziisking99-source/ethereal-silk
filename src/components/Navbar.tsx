import React from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const links = [
    { to: "/#about", label: "About" },
    { to: "/#gallery", label: "Gallery" },
    { to: "/shop", label: "Shop" },
    { to: "/#shipping", label: "Shipping" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 lg:px-12 py-6 backdrop-blur-[16px] border-b border-[rgba(196,120,138,0.15)] transition-colors duration-400"
        style={{ background: "rgba(250, 247, 244, 0.8)" }}
      >
        <Link
          to="/"
          className="font-[Cormorant_Garamond] text-[1.4rem] font-bold tracking-[0.04em] text-[#6B3556] no-underline"
        >
          Only <span className="italic text-[#C4788A]">Liyah</span>
        </Link>

        <ul className="hidden md:flex gap-10 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.to}
                className="text-[0.72rem] tracking-[0.2em] uppercase font-normal text-[#6B5260] transition-colors duration-300 hover:text-[#6B3556] no-underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative hidden md:flex bg-transparent border-none cursor-pointer p-2"
            aria-label="Open basket"
          >
            <ShoppingBag className="w-5 h-5 text-[#6B3556]" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C4788A] text-white text-[0.6rem] font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <Link
            to="/shop"
            className="hidden sm:inline-flex text-white border-none px-7 py-2.5 rounded-[4px] text-[0.72rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_12px_40px_rgba(100,50,80,0.15)]"
            style={{
              background: `linear-gradient(135deg, #6B3556, #C4788A)`,
            }}
          >
            Shop Now
          </Link>
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-[#6B3556]" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5 text-[#6B3556]" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[499] backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: "rgba(250, 247, 244, 0.95)" }}
        >
          <ThemeToggle />
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              onClick={() => setMobileOpen(false)}
              className="text-[1rem] tracking-[0.2em] uppercase font-normal text-[#6B5260] hover:text-[#6B3556] transition-colors no-underline"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/shop"
            onClick={() => setMobileOpen(false)}
            className="text-white px-8 py-3 rounded-[4px] text-[0.72rem] tracking-[0.18em] uppercase no-underline"
            style={{
              background: `linear-gradient(135deg, #6B3556, #C4788A)`,
            }}
          >
            Shop Now
          </Link>
        </div>
      )}
    </>
  );
}
