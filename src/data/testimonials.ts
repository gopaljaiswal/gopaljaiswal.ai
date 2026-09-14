export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  sessionTopic: string;
};

// TODO: replace with your real testimonials
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Extremely knowledgeable and helped me fine-tune my approach for both system design and leadership rounds.",
    name: "TODO Name",
    sessionTopic: "system design prep",
  },
  {
    id: "t2",
    quote:
      "Helped me eliminate the noise and use my existing skills to my advantage. Highly recommend for anyone stuck in their path.",
    name: "TODO Name",
    sessionTopic: "career direction",
  },
  {
    id: "t3",
    quote:
      "Very patient and insightful, with a strategic approach and all the resources needed to build a proper plan toward my goals.",
    name: "TODO Name",
    sessionTopic: "career planning",
  },
  {
    id: "t4",
    quote:
      "The call gave me both a bird's-eye view and a low-level picture of interview prep and the industry. Would recommend to anyone.",
    name: "TODO Name",
    sessionTopic: "interview strategy",
  },
  {
    id: "t5",
    quote:
      "Took detailed notes on every behavioural answer and gave concrete suggestions to improve each one. My best mock interview experience.",
    name: "TODO Name",
    sessionTopic: "behavioral prep",
  },
];

export const ratingSummary = {
  rating: "5.0 / 5",
  ratingCount: "TODO ratings",
  bookings: "TODO+ bookings",
};
