import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const router = useRouterState();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/#about", label: "About" },
    { to: "/#faq", label: "FAQ" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 lg:px-12 py-5 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(250,247,244,0.92)] backdrop-blur-[16px] border-b border-[rgba(180,140,160,0.18)]"
            : "bg-transparent"
        }`}
      >
        <Link to="/" className="font-[Bodoni_Moda] text-[1.4rem] font-bold tracking-[0.04em] text-[#6b3a5e]">
          Only <span className="italic text-[#e8849a]">Liyah</span>
        </Link>

        <ul className="hidden md:flex gap-10 list-none">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-[0.72rem] tracking-[0.2em] uppercase font-normal text-[#8a6e7a] transition-colors duration-300 hover:text-[#6b3a5e] no-underline"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-transparent border-none cursor-pointer p-2"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#6b3a5e]" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#e8849a] text-white text-[0.6rem] font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[499] bg-[rgba(250,247,244,0.98)] backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="text-[1rem] tracking-[0.2em] uppercase font-normal text-[#8a6e7a] hover:text-[#6b3a5e] transition-colors no-underline"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
