export default function Marquee() {
  const items = [
    "Luxury Lace",
    "Silk Essentials",
    "Boudoir Sets",
    "Bridal Collection",
    "Evening Wear",
    "Comfort First",
    "South African Made",
    "Handcrafted Details",
  ];

  return (
    <div className="bg-[#6b3a5e] py-4 overflow-hidden">
      <div className="inline-flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-[Bodoni_Moda] text-[0.85rem] italic text-[rgba(255,255,255,0.6)] flex items-center gap-3">
            <span className="text-[#e8849a] not-italic text-[0.5rem]">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
