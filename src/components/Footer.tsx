import { Link } from "@tanstack/react-router";

const footerLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About", href: "/#about" },
  { label: "Shipping", href: "/#shipping" },
  { label: "FAQ", href: "/#faq" },
  { label: "Checkout", href: "/checkout" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-[rgba(180,140,160,0.18)] bg-white grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
      <div className="font-[Bodoni_Moda] text-[1.1rem] font-bold text-[#6b3a5e] text-center md:text-left">
        Only <span className="italic text-[#e8849a]">Liyah</span>
      </div>

      <ul className="flex flex-wrap gap-6 list-none justify-center m-0 p-0">
        {footerLinks.map((l) =>
          l.href.startsWith("/#") ? (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-[#c4aab4] text-[0.62rem] no-underline tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#6b3a5e]"
              >
                {l.label}
              </a>
            </li>
          ) : (
            <li key={l.label}>
              <Link
                to={l.href}
                className="text-[#c4aab4] text-[0.62rem] no-underline tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#6b3a5e]"
              >
                {l.label}
              </Link>
            </li>
          )
        )}
      </ul>

      <div className="text-center md:text-right font-[DM_Mono] text-[0.6rem] text-[#c4aab4] tracking-[0.05em] leading-[1.8]">
        18+ Only · All Rights Reserved © {new Date().getFullYear()}
        <br />
        Only Liyah · Payments in ZAR · South Africa
      </div>
    </footer>
  );
}
