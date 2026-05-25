import { Link } from "@tanstack/react-router";

const footerLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About", href: "/#about" },
  { label: "Shipping", href: "/#shipping" },
  { label: "Checkout", href: "/checkout" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-[rgba(196,120,138,0.15)] bg-[#FAF7F4] grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
      <div className="font-[Cormorant_Garamond] text-[1.1rem] font-bold text-[#6B3556] text-center md:text-left">
        Only <span className="italic text-[#C4788A]">Liyah</span>
      </div>

      <ul className="flex flex-wrap gap-6 list-none justify-center m-0 p-0">
        {footerLinks.map((l) =>
          l.href.startsWith("/#") ? (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-[#D4A0AD] text-[0.62rem] no-underline tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#6B3556] font-light"
              >
                {l.label}
              </a>
            </li>
          ) : (
            <li key={l.label}>
              <Link
                to={l.href}
                className="text-[#D4A0AD] text-[0.62rem] no-underline tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#6B3556] font-light"
              >
                {l.label}
              </Link>
            </li>
          )
        )}
      </ul>

      <div className="text-center md:text-right font-[DM_Mono] text-[0.6rem] text-[#D4A0AD] tracking-[0.05em] leading-[1.8]">
        18+ Only · All Rights Reserved © {new Date().getFullYear()}
        <br />
        Only Liyah · Payments in ZAR · South Africa
      </div>
    </footer>
  );
}
