export type Stat = {
  label: string;
  value: string;
  href?: string;
};

// TODO: replace with your real numbers
export const stats: Stat[] = [
  { label: "1:1 mentoring rating", value: "★ 5.0 / 5" },
  { label: "Interviews conducted", value: "50+" },
  { label: "1:1 mentoring bookings", value: "30+" },
  { label: "Prior engineering", value: "TODO_PRIOR_COMPANY" },
  { label: "Research papers & patents", value: "Scholar ↗", href: "#" },
  { label: "Mentees placed at", value: "TODO_COMPANY · +5" },
];
