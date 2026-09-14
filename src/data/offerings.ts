export type OfferingIcon = "Library" | "Mic" | "Compass" | "PenLine";

export type Offering = {
  number: string;
  icon: OfferingIcon;
  title: string;
  description: string;
  meta: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const offerings: Offering[] = [
  {
    number: "01",
    icon: "Library",
    title: "System Design & Engineering Vault",
    description:
      "A growing set of answers to the questions senior and staff interviews actually turn on: framing, trade-offs, failure modes, and the language to explain them.",
    meta: ["Paid", "Lifetime access"],
    ctaLabel: "Explore the vault",
    ctaHref: "/vault",
  },
  {
    number: "02",
    icon: "Mic",
    title: "Mock Interviews",
    description:
      "Live 1:1 mock interviews across formats — system design, DSA/LLD, behavioural, and monthly deep-dives.",
    meta: ["Live 1:1", "4 formats"],
    ctaLabel: "See formats",
    ctaHref: "/coaching#mock-interviews",
  },
  {
    number: "03",
    icon: "Compass",
    title: "Career Mentorship",
    description:
      "Ongoing 1:1 guidance on levelling up, interview strategy, and career decisions — tailored to where you are today.",
    meta: ["Live 1:1"],
    ctaLabel: "Book mentorship",
    ctaHref: "/coaching#mentorship",
  },
  {
    number: "04",
    icon: "PenLine",
    title: "Essays",
    description:
      "Free, long-form writing on engineering, system design, and career growth.",
    meta: ["Free"],
    ctaLabel: "Read the blog",
    ctaHref: "/blog",
  },
];
