import React from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const links = [
    { to: "/#about", label: "About" },
    { to: "/#gallery", label: "Gallery" },
    { to: "/shop", label: "Shop" },
    { to: "/#shipping", label: "Shipping" },
    { to: "/#faq", label: "FAQ" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 lg:px-12 py-6 bg-[rgba(250,247,244,0.88)] backdrop-blur-[16px] border-b border-[rgba(180,140,160,0.18)]">
        <Link
          to="/"
          className="font-[Bodoni_Moda] text-[1.4rem] font-bold tracking-[0.04em] text-[#6b3a5e] no-underline"
        >
          Only <span className="italic text-[#e8849a]">Liyah</span>
        </Link>

        <ul className="hidden md:flex gap-10 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.to}
                className="text-[0.72rem] tracking-[0.2em] uppercase font-normal text-[#8a6e7a] transition-colors duration-300 hover:text-[#6b3a5e] no-underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative hidden md:flex bg-transparent border-none cursor-pointer p-2"
            aria-label="Open basket"
          >
            <ShoppingBag className="w-5 h-5 text-[#6b3a5e]" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#e8849a] text-white text-[0.6rem] font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <Link
            to="/shop"
            className="hidden sm:inline-flex bg-[#6b3a5e] text-white border-none px-7 py-2.5 rounded-[2px] text-[0.72rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:bg-[#e8849a] hover:translate-y-[-1px] no-underline"
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
              <X className="w-5 h-5 text-[#6b3a5e]" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5 text-[#6b3a5e]" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[499] bg-[rgba(250,247,244,0.98)] backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              onClick={() => setMobileOpen(false)}
              className="text-[1rem] tracking-[0.2em] uppercase font-normal text-[#8a6e7a] hover:text-[#6b3a5e] transition-colors no-underline"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/shop"
            onClick={() => setMobileOpen(false)}
            className="bg-[#6b3a5e] text-white px-8 py-3 rounded-[2px] text-[0.72rem] tracking-[0.18em] uppercase no-underline"
          >
            Shop Now
          </Link>
        </div>
      )}
    </>
  );
}
