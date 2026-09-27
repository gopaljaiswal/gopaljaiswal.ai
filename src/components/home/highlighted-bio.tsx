const HIGHLIGHTS = ["Microsoft", "10 years", "92%", "25K+", "7K+"];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function HighlightedBio({ text }: { text: string }) {
  const pattern = new RegExp(`(${HIGHLIGHTS.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        HIGHLIGHTS.includes(part) ? (
          <span key={i} className="font-semibold text-primary">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
