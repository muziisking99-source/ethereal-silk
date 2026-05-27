import React from "react";

const STORAGE_KEY = "onlyliyah-age-verified";

export default function AgeGate() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      setVisible(!localStorage.getItem(STORAGE_KEY));
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (verified: boolean) => {
    if (verified) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center text-center p-8 bg-[rgba(var(--bg-rgb),0.97)] backdrop-blur-[20px] transition-opacity duration-500"
      role="dialog"
      aria-labelledby="age-gate-title"
    >
      <div className="font-[Cormorant_Garamond] text-[2.5rem] font-bold text-[var(--accent)] mb-10">
        Only <span className="italic text-[var(--accent)]">Liyah</span>
      </div>
      <h2 id="age-gate-title" className="font-[Cormorant_Garamond] text-[1.8rem] font-bold text-[var(--text)] mb-4">
        Are you 18 or older?
      </h2>
      <p className="text-[0.85rem] text-[var(--muted)] max-w-[420px] leading-[1.8] mb-10">
        This boutique contains intimate apparel intended for mature audiences only. By entering
        you confirm you are at least 18 years of age.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          type="button"
          onClick={() => dismiss(false)}
          className="bg-transparent text-[var(--muted)] border border-[rgba(var(--accent-rgb),0.35)] px-8 py-3.5 rounded-[2px] text-[0.78rem] tracking-[0.18em] uppercase transition-all duration-300 hover:border-[var(--muted)] hover:text-[var(--text)]"
        >
          No, I&apos;m Under 18
        </button>
        <button
          type="button"
          onClick={() => dismiss(true)}
          className="bg-[var(--accent)] text-white border-none px-10 py-3.5 rounded-[2px] text-[0.78rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:bg-[var(--accent-hover)]"
        >
          Yes, I&apos;m 18+ — Enter
        </button>
      </div>
      <p className="mt-8 font-[DM_Mono] text-[0.58rem] tracking-[0.1em] text-[var(--dim)]">
        18+ only · All products are legal adult apparel · ZA
      </p>
    </div>
  );
}
