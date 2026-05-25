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
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 lg:px-12 py-6 backdrop-blur-[16px] border-b border-[var(--border-color)] transition-colors duration-400"
        style={{ background: "var(--nav-bg)" }}
      >
        <Link
          to="/"
          className="font-[Bodoni_Moda] text-[1.4rem] font-bold tracking-[0.04em] text-[var(--plum)] no-underline"
        >
          Only <span className="italic text-[var(--blush)]">Liyah</span>
        </Link>

        <ul className="hidden md:flex gap-10 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.to}
                className="text-[0.72rem] tracking-[0.2em] uppercase font-normal text-[var(--muted-text)] transition-colors duration-300 hover:text-[var(--plum)] no-underline"
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
            <ShoppingBag className="w-5 h-5 text-[var(--plum)]" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--blush)] text-white text-[0.6rem] font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <Link
            to="/shop"
            className="hidden sm:inline-flex text-white border-none px-7 py-2.5 rounded-[2px] text-[0.72rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:translate-y-[-1px] no-underline"
            style={{
              background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
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
              <X className="w-5 h-5 text-[var(--plum)]" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5 text-[var(--plum)]" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[499] backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: "var(--nav-bg)" }}
        >
          <ThemeToggle />
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              onClick={() => setMobileOpen(false)}
              className="text-[1rem] tracking-[0.2em] uppercase font-normal text-[var(--muted-text)] hover:text-[var(--plum)] transition-colors no-underline"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/shop"
            onClick={() => setMobileOpen(false)}
            className="text-white px-8 py-3 rounded-[2px] text-[0.72rem] tracking-[0.18em] uppercase no-underline"
            style={{
              background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
            }}
          >
            Shop Now
          </Link>
        </div>
      )}
    </>
  );
}
