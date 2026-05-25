import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-[rgba(180,140,160,0.18)] bg-white grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      <div className="font-[Bodoni_Moda] text-[1.1rem] font-bold text-[#6b3a5e] text-center md:text-left">
        Only <span className="italic text-[#e8849a]">Liyah</span>
      </div>

      <ul className="flex flex-wrap gap-6 list-none justify-center">
        {["Shop", "About", "FAQ", "Shipping", "Contact"].map((l) => (
          <li key={l}>
            <Link
              to={l === "Shop" ? "/shop" : l === "About" ? "/#about" : l === "FAQ" ? "/#faq" : l === "Shipping" ? "/#shipping" : "/"}
              className="text-[#c4aab4] text-[0.62rem] no-underline tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#6b3a5e]"
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-center md:text-right font-[DM_Mono] text-[0.6rem] text-[#c4aab4] tracking-[0.05em] leading-[1.8]">
        All Rights Reserved © {new Date().getFullYear()}<br />
        Only Liyah · South Africa
      </div>
    </footer>
  );
}
