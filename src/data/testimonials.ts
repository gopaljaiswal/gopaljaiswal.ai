export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  sessionTopic: string;
};

// Pulled from https://topmate.io/gopal_jaiswal12/ (pinned testimonials).
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I had a resume review session with Gopal, and it was extremely valuable. He provided clear, honest, and actionable feedback that helped me better structure my resume and highlight my strengths more effectively. Gopal has a great eye for detail and really understands what recruiters look for.",
    name: "Anonymous",
    sessionTopic: "resume review",
  },
  {
    id: "t2",
    quote:
      "I had an in-depth resume review with Gopal, and it was extremely insightful. He clearly pointed out my strengths, highlighted gaps, and gave very practical suggestions on how to improve the technical depth of my experience and showcase it more effectively.",
    name: "Anonymous",
    sessionTopic: "resume review",
  },
  {
    id: "t3",
    quote:
      "Very supportive throughout the session and created a comfortable environment. The interview closely simulated a real interview experience and was very insightful.",
    name: "Khemendra Bhardwaj",
    sessionTopic: "mock interview",
  },
  {
    id: "t4",
    quote:
      "He helped me refine my resume in a very clear and structured way, pointing out even the smallest improvements that make a big difference. He also explained how to effectively apply to companies, build visibility, and increase the chances of getting shortlisted.",
    name: "Saket Sagar",
    sessionTopic: "resume & career guidance",
  },
  {
    id: "t5",
    quote:
      "I'm grateful to Gopal for taking the time to conduct a mock interview with me. His insights into problem-solving, communication structure were extremely valuable. His mentorship has boosted my confidence for upcoming interviews.",
    name: "Anonymous",
    sessionTopic: "mock interview",
  },
  {
    id: "t6",
    quote:
      "Amazing! Gopal explained in depth on what software development means, what the industry is looking for and presented tips and tricks to achieve our goal. Will meet again!",
    name: "Anonymous",
    sessionTopic: "career guidance",
  },
  {
    id: "t7",
    quote:
      "Gopal is a very good mentor. He is very helpful in the discussion. I would love to have a call again in the future.",
    name: "Bhargav Tenali",
    sessionTopic: "mentorship call",
  },
  {
    id: "t8",
    quote:
      "Gopal has vast experience around software engineering and IT careers growth. He explained with good real time examples and practical use cases, and suggested resources for DSA, algorithms, and system design (LLD, HLD) prep. It's worth connecting.",
    name: "Jyoti Rani",
    sessionTopic: "interview prep mentorship",
  },
];

// Pulled from the live Topmate profile stats.
export const ratingSummary = {
  rating: "5.0 / 5",
  ratingCount: "52 ratings",
  bookings: "107 bookings",
};
