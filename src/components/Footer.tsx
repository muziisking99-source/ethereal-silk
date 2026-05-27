import { Link } from "@tanstack/react-router";

const footerLinks = [
  { label: "Shop", href: "/shop" },
  { label: "How It Works", href: "/#shipping" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-[rgba(var(--accent-rgb),0.2)] bg-[var(--bg)] grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
      <div className="text-center md:text-left">
        <div className="font-[Cormorant_Garamond] text-[1.2rem] font-bold text-[var(--text)]">
          Only <span className="italic text-[var(--accent)]">Liyah</span>
        </div>
        <div className="font-[Cormorant_Garamond] italic text-[0.8rem] text-[var(--muted)] mt-1">
          Real. Worn. Yours.
        </div>
      </div>

      <ul className="flex flex-wrap gap-6 list-none justify-center m-0 p-0">
        {footerLinks.map((l) =>
          l.href.startsWith("/#") ? (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-[var(--muted)] text-[0.62rem] no-underline tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[var(--accent)] font-light font-[Jost]"
              >
                {l.label}
              </a>
            </li>
          ) : (
            <li key={l.label}>
              <Link
                to={l.href}
                className="text-[var(--muted)] text-[0.62rem] no-underline tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[var(--accent)] font-light font-[Jost]"
              >
                {l.label}
              </Link>
            </li>
          )
        )}
      </ul>

      <div className="text-center md:text-right font-[DM_Mono] text-[0.6rem] text-[var(--dim)] tracking-[0.05em] leading-[1.8]">
        © {new Date().getFullYear()} Only Liyah. All rights reserved. South Africa.
      </div>
    </footer>
  );
}
