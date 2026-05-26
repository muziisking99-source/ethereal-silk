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
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center text-center p-8 bg-[rgba(13,13,13,0.97)] backdrop-blur-[20px] transition-opacity duration-500"
      role="dialog"
      aria-labelledby="age-gate-title"
    >
      <div className="font-[Cormorant_Garamond] text-[2.5rem] font-bold text-[#FF2D6B] mb-10">
        Only <span className="italic text-[#FF2D6B]">Liyah</span>
      </div>
      <h2 id="age-gate-title" className="font-[Cormorant_Garamond] text-[1.8rem] font-bold text-[#F5F0EB] mb-4">
        Are you 18 or older?
      </h2>
      <p className="text-[0.85rem] text-[#B8AEA8] max-w-[420px] leading-[1.8] mb-10">
        This boutique contains intimate apparel intended for mature audiences only. By entering
        you confirm you are at least 18 years of age.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          type="button"
          onClick={() => dismiss(false)}
          className="bg-transparent text-[#B8AEA8] border border-[rgba(255,45,107,0.35)] px-8 py-3.5 rounded-[2px] text-[0.78rem] tracking-[0.18em] uppercase transition-all duration-300 hover:border-[#8a6e7a] hover:text-[#F5F0EB]"
        >
          No, I&apos;m Under 18
        </button>
        <button
          type="button"
          onClick={() => dismiss(true)}
          className="bg-[#FF2D6B] text-white border-none px-10 py-3.5 rounded-[2px] text-[0.78rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:bg-[#e02560]"
        >
          Yes, I&apos;m 18+ — Enter
        </button>
      </div>
      <p className="mt-8 font-[DM_Mono] text-[0.58rem] tracking-[0.1em] text-[#6B5F58]">
        18+ only · All products are legal adult apparel · ZA
      </p>
    </div>
  );
}
