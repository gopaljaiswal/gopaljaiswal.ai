// Pulled from https://topmate.io/gopal_jaiswal12/ (service cards + schema.org data).
// Prices are in INR and reflect Topmate's current discounted starting price.

export type OneOnOneService = {
  name: string;
  durationMinutes: number;
  price: number;
  href: string;
};

export const oneOnOneServices: OneOnOneService[] = [
  { name: "Quick Chat", durationMinutes: 20, price: 349, href: "https://topmate.io/gopal_jaiswal12/1508454" },
  { name: "1:1 Mentorship", durationMinutes: 30, price: 449, href: "https://topmate.io/gopal_jaiswal12/1795140" },
  { name: "Resume Review", durationMinutes: 25, price: 699, href: "https://topmate.io/gopal_jaiswal12/1795145" },
  { name: "Mock Interview — DSA", durationMinutes: 45, price: 749, href: "https://topmate.io/gopal_jaiswal12/1795156" },
  { name: "Mock Interview — System Design", durationMinutes: 60, price: 1249, href: "https://topmate.io/gopal_jaiswal12/1855880" },
  { name: "GenAI Project & Career Guidance", durationMinutes: 30, price: 649, href: "https://topmate.io/gopal_jaiswal12/1943493" },
  { name: "Job Referral & Guidance", durationMinutes: 35, price: 749, href: "https://topmate.io/gopal_jaiswal12/1943438" },
  { name: "Crack Promotion & Move to Next Level", durationMinutes: 35, price: 999, href: "https://topmate.io/gopal_jaiswal12/2270636" },
];

export const coachingPackage = {
  name: "Crack the Interview: 1:1 Coaching",
  description: "A 4-session coaching package covering resume, mock interviews, and mentorship end to end.",
  price: 1999,
  href: "https://topmate.io/gopal_jaiswal12/1943449",
};

export const priorityDM = {
  name: "Ask Gopal — Code, Job & Beyond",
  description: "A direct question, answered within 24 hours.",
  price: 45,
  href: "https://topmate.io/gopal_jaiswal12/1795180",
};

export type DigitalProduct = {
  name: string;
  price: number;
  href: string;
};

export const digitalProducts: DigitalProduct[] = [
  { name: "200 OS Interview Questions (MAANG-asked)", price: 29, href: "https://topmate.io/gopal_jaiswal12/2242334" },
  { name: "200 SQL Interview Questions (MAANG-asked)", price: 69, href: "https://topmate.io/gopal_jaiswal12/2221168" },
  { name: "200 Computer Networks Interview Questions", price: 44, href: "https://topmate.io/gopal_jaiswal12/2242540" },
  { name: "LLD Resources", price: 99, href: "https://topmate.io/gopal_jaiswal12/2086091" },
  { name: "System Design Resources (HLD)", price: 149, href: "https://topmate.io/gopal_jaiswal12/2086092" },
  { name: "Roadmap: Python for AI", price: 79, href: "https://topmate.io/gopal_jaiswal12/2242474" },
];
