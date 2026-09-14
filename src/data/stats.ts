export type StatIcon = "Star" | "Users" | "CalendarCheck" | "Building2" | "GraduationCap" | "Trophy";

export type Stat = {
  icon: StatIcon;
  label: string;
  value: string;
  href?: string;
};

// TODO: replace with your real numbers
export const stats: Stat[] = [
  { icon: "Star", label: "1:1 mentoring rating", value: "5.0 / 5" },
  { icon: "Users", label: "Interviews conducted", value: "50+" },
  { icon: "CalendarCheck", label: "1:1 mentoring bookings", value: "30+" },
  { icon: "Building2", label: "Prior engineering", value: "TODO_PRIOR_COMPANY" },
  { icon: "GraduationCap", label: "Research papers & patents", value: "Scholar ↗", href: "#" },
  { icon: "Trophy", label: "Mentees placed at", value: "TODO_COMPANY · +5" },
];
