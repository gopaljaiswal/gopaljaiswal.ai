const companies = [
  { name: "Meta", initials: "M", color: "#0866FF" },
  { name: "Amazon", initials: "A", color: "#FF9900" },
  { name: "Apple", initials: "A", color: "#A2AAAD" },
  { name: "Netflix", initials: "N", color: "#E50914" },
  { name: "Google", initials: "G", color: "#4285F4" },
  { name: "Nvidia", initials: "N", color: "#76B900" },
  { name: "Microsoft", initials: "MS", color: "#00A4EF" },
  { name: "Flipkart", initials: "F", color: "#2874F0" },
  { name: "Myntra", initials: "M", color: "#FF3F6C" },
  { name: "Adobe", initials: "Ad", color: "#FA0F00" },
  { name: "Micron", initials: "Mi", color: "#0071CE" },
];

export function TargetCompanies() {
  const track = [...companies, ...companies];

  return (
    <div className="mt-4 max-w-2xl overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.07] py-2.5">
      <p className="px-4 pb-2 text-xs font-semibold tracking-wide text-primary uppercase">Aiming for</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-2 px-4" style={{ animationDuration: "22s" }}>
          {track.map((c, i) => (
            <span
              key={`${c.name}-${i}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-xs font-medium shadow-sm"
            >
              <span
                className="flex size-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white"
                style={{ backgroundColor: c.color }}
              >
                {c.initials}
              </span>
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
