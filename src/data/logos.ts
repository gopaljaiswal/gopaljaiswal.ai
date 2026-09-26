// Companies mentees are now placed at, with a representative brand color
// for the monogram badge (initials only — not a reproduction of the
// company's actual logo/trademark).
export type Logo = { name: string; initials: string; color: string };

export const logos: Logo[] = [
  { name: "Amazon", initials: "A", color: "#FF9900" },
  { name: "Zeta", initials: "Z", color: "#7C3AED" },
  { name: "Adobe", initials: "Ad", color: "#FA0F00" },
  { name: "Microsoft", initials: "MS", color: "#00A4EF" },
];

// Where mentees came from before their transition.
export const mentorFromCompanies: Logo[] = [
  { name: "TCS", initials: "TCS", color: "#486AAE" },
  { name: "Infosys", initials: "IN", color: "#007CC3" },
  { name: "Capgemini", initials: "CG", color: "#0070AD" },
  { name: "Cognizant", initials: "CTS", color: "#1D428A" },
];
