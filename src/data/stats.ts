export type StatIcon =
  | "Star"
  | "Quote"
  | "CalendarCheck"
  | "Building2"
  | "GraduationCap"
  | "Trophy";

export type Stat = {
  icon: StatIcon;
  label: string;
  value: string;
  href?: string;
};

// Rating, testimonials & bookings pulled from https://topmate.io/gopal_jaiswal12/
// TODO: fill in prior company / publications / placements once you have them
export const stats: Stat[] = [
  { icon: "Star", label: "1:1 mentoring rating", value: "5.0 / 5 · 52 ratings" },
  { icon: "Quote", label: "Testimonials on Topmate", value: "49" },
  { icon: "CalendarCheck", label: "1:1 mentoring bookings", value: "107" },
  { icon: "Building2", label: "Prior engineering", value: "TODO_PRIOR_COMPANY" },
  { icon: "GraduationCap", label: "Research papers & patents", value: "Scholar ↗", href: "#" },
  { icon: "Trophy", label: "Mentees placed at", value: "Amazon · Adobe · +2" },
];
