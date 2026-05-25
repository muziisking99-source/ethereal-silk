import React from "react";

export default function CustomCursor() {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isCoarse) return;

    document.body.classList.add("luxury-cursor");

    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      window.setTimeout(() => {
        if (ringRef.current) {
          ringRef.current.style.left = `${e.clientX}px`;
          ringRef.current.style.top = `${e.clientY}px`;
        }
      }, 80);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      document.body.classList.remove("luxury-cursor");
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="luxury-cursor-dot fixed w-2 h-2 bg-[#6b3a5e] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="luxury-cursor-ring fixed w-8 h-8 border border-[#e8849a] rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 opacity-70 hidden md:block"
        aria-hidden
      />
    </>
  );
}
