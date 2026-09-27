// One-time content update: add the remaining real Topmate + Propeers
// testimonials (pasted directly by the user from their Topmate dashboard,
// since only 8 of 49 are reachable via public scraping).
// Run against a specific DB with: DATABASE_URL="..." node scripts/add-testimonials.mjs
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

async function getRow(key) {
  const { rows } = await pool.query("select data from content where key = $1", [key]);
  return rows[0]?.data;
}

async function setRow(key, data) {
  await pool.query(
    `insert into content (key, data, updated_at) values ($1, $2, now())
     on conflict (key) do update set data = excluded.data, updated_at = now()`,
    [key, JSON.stringify(data)]
  );
  console.log("updated:", key);
}

// New real testimonials from Topmate (t9-t49) + Propeers (t50).
// Quotes kept verbatim from the source (typos included) to preserve authenticity.
const newTestimonials = [
  { id: "t9", name: "Umang Sinha", sessionTopic: "career guidance", quote: "He patiently listened to all my queries and provided very valuable advice. He is highly knowledgeable and has a great understanding of the latest hiring trends and industry requirements." },
  { id: "t10", name: "Rahul Dudani", sessionTopic: "mentorship call", quote: "He is really helpful & supportive!" },
  { id: "t11", name: "Dheen Elahi", sessionTopic: "career guidance", quote: "I really Love that gopal give a way to get your dream job, befor connect to him i get confuse what to do now I m clear mind" },
  { id: "t12", name: "Aman Singh", sessionTopic: "job switch guidance", quote: "Gopal has provided good insight of job switch preparation and right approach , addressed my doubt patiently and clearly" },
  { id: "t13", name: "Akhil kumar", sessionTopic: "mentorship call", quote: "Had a great great time and got very valuable aspects from gopal. He listened to everything properly and gave the best advices possible .definitely worth the call.everything was so better and got valuable advices.." },
  { id: "t14", name: "Anonymous", sessionTopic: "resume review", quote: "He was very helpful and patiently solved all my queries regarding resume improvement and placements. The session was clear, practical, and really useful for my preparation. Highly recommended!" },
  { id: "t15", name: "Anonymous", sessionTopic: "interview prep", quote: "It was insightful discussion. Got to know tips how to crack for my upcoming microsoft interview" },
  { id: "t16", name: "Anonymous", sessionTopic: "resume review", quote: "Gopal is very supportive, reviewed my resume in a very good manner and suggested me some points i can improve." },
  { id: "t17", name: "Anonymous", sessionTopic: "priority DM", quote: "Very fast response" },
  { id: "t18", name: "Harsh Kumar", sessionTopic: "mentorship call", quote: "Had a great conversation." },
  { id: "t19", name: "Anonymous", sessionTopic: "mentorship call", quote: "Really helpful and friendly nature" },
  { id: "t20", name: "Bhavya Gupta", sessionTopic: "mentorship call", quote: "Gopal is a very helpful and highly intellectual person." },
  { id: "t21", name: "Kadhirvel M", sessionTopic: "resume review", quote: "Easily the best 1:1 I've had. Gopal went through my resume properly, line by line, instead of giving the usual generic advice. What I didn't expect was how technical it got — he works on agentic AI and RAG at Microsoft, so we ended up in a real discussion about holding retrieval accuracy without blowing up latency and token cost, which is something I've been stuck on in my own product. He also gave me a clear plan for the role I'm targeting and offered to help with the referral. Very generous with his time. Highly recommend booking a session with him." },
  { id: "t22", name: "Ritam Ghosh", sessionTopic: "mock interview", quote: "I booked mock interviews with Gopal before my MSFT interviews. He was really helpful in giving me a clear idea of how to prepare and what to expect." },
  { id: "t23", name: "Anonymous", sessionTopic: "mock interview (LLD)", quote: "Had LLD mock with Gopal.. he patiently assisted and asked relevant questions and shared valuable feedback on what i need to work on.. it was great interaction with Gopal" },
  { id: "t24", name: "Aditya Kumar Goswami", sessionTopic: "job referral & guidance", quote: "I had a great session with Gopal regarding job referrals and career guidance. He clearly explained the hiring process at top tech companies and shared practical strategies for interview preparation, resume improvement, and networking. The discussion was very insightful and motivating. I truly appreciate the time and guidance he provided, and I would definitely recommend his sessions to students and professionals looking for career direction in tech." },
  { id: "t25", name: "Anonymous", sessionTopic: "mentorship call", quote: "Very polite, helpful and friendly guy." },
  { id: "t26", name: "Anonymous", sessionTopic: "mock interview (system design)", quote: "Thank you for the mock interview session. It felt very close to a real interview environment. I especially liked how you drilled into the \"why\" behind my design decisions instead of just accepting surface-level answers. Your feedback around consistency vs performance tradeoffs was eye-opening and helped me understand how interviewers evaluate depth. Overall, this was extremely helpful and gave me a clearer picture of where I stand and what to work on next." },
  { id: "t27", name: "Anonymous", sessionTopic: "mentorship call", quote: "Super insightful session. Cleared my doubts and gave me a practical roadmap to improve and start ahead" },
  { id: "t28", name: "Skanda Bhat", sessionTopic: "mock interview", quote: "One of the best mock interviews I've done. The questions were very realistic and the feedback was clear and actionable. Helped me understand exactly where I stand and what to improve. The interviewer went deep into problem-solving and system design and gave precise feedback on how to structure answers better." },
  { id: "t29", name: "Suman Bej", sessionTopic: "resume review", quote: "It was a good session, he gave me lot of insights about crafting my resume, how real interviews take place. Overall very nice session" },
  { id: "t30", name: "Asad", sessionTopic: "mentorship call", quote: "Loving Guy, and was very friendly. made my doubts clear" },
  { id: "t31", name: "Anonymous", sessionTopic: "system design mentorship", quote: "I had a great talk with Gopal and we discussed a lot of points related to HLD,LLD and projects I am working on and he gave me suggestions on the things I need to improve." },
  { id: "t32", name: "Vishnu Sangadala", sessionTopic: "mentorship call", quote: "Very helpful and insightful session. Clear explanations, friendly approach, and practical guidance. Highly recommended." },
  { id: "t33", name: "SaiPraveenKumar Jallipalli", sessionTopic: "mentorship call", quote: "I had a really amazing 1:1 Session with Gopal. He was so patient and listened to every question I asked and gave me the answers for everything I need. The conversation went really well - more of like an elder brother/ friend sharing his knowledge and experience with me maintianing the formal etiqquetes at the same time. It's really great connecting with Gopal!" },
  { id: "t34", name: "Anonymous", sessionTopic: "priority DM", quote: "Good person helped me, in my problem and quickly reacts to my queries.." },
  { id: "t35", name: "Anonymous", sessionTopic: "career guidance", quote: "He was so cool to get clarified all the doubts and share informations for right career direction." },
  { id: "t36", name: "Anonymous", sessionTopic: "mentorship call", quote: "Very friendly and session was very helpful" },
  { id: "t37", name: "Harsh Kumar", sessionTopic: "mentorship call", quote: "Had a really insightful conversation." },
  { id: "t38", name: "Nupur Khare", sessionTopic: "mentorship call", quote: "The session was extremely insightful and he explained important key points which helped me a lot." },
  { id: "t39", name: "Anonymous", sessionTopic: "mock interview", quote: "Call was very insightful . He gave detailed feedback on my mock interview." },
  { id: "t40", name: "Harshita Gupta", sessionTopic: "mentorship call", quote: "The session was extremely insightful and well-structured. It offered valuable learnings with practical strategies to work upon.Highly Recommended." },
  { id: "t41", name: "Shivam Desale", sessionTopic: "mentorship call", quote: "Gopal sir tells you everything in detail and helps you in everything! Please take one session with him and you will see the difference!" },
  { id: "t42", name: "Anonymous", sessionTopic: "career guidance", quote: "He gave clarity like how can I present myself with right skills set to show case more about me" },
  { id: "t43", name: "Mohit Srivastava", sessionTopic: "mentorship call", quote: "Session was great, Gopal Sir cleared all my doubts." },
  { id: "t44", name: "Anonymous", sessionTopic: "mentorship call", quote: "Very helpful and provided on point insights and guidence." },
  { id: "t45", name: "Anonymous", sessionTopic: "mentorship call", quote: "He is such a nice personality" },
  { id: "t46", name: "Vaibhav", sessionTopic: "mentorship call", quote: "Really helpful, guides with clarity and patience" },
  { id: "t47", name: "Khushi Jain", sessionTopic: "mentorship call", quote: "Hr is very helpful and clear my all doubts patiently" },
  { id: "t48", name: "Anonymous", sessionTopic: "career guidance", quote: "Thank you for taking the time to guide me today. Your clarity and honesty really helped me understand my direction better. I truly appreciate your support." },
  { id: "t49", name: "Anonymous", sessionTopic: "mentorship call", quote: "Awesome and deep understanding" },
  { id: "t50", name: "Asmit Kulshreshtha", sessionTopic: "mentorship call (Propeers)", quote: "The session was good, had a clear plan" },
];

async function main() {
  const testimonialsContent = await getRow("testimonials");
  if (!testimonialsContent) throw new Error("testimonials content not found");

  const existingIds = new Set(testimonialsContent.testimonials.map((t) => t.id));
  const toAdd = newTestimonials.filter((t) => !existingIds.has(t.id));

  testimonialsContent.testimonials = [...testimonialsContent.testimonials, ...toAdd];
  await setRow("testimonials", testimonialsContent);

  console.log(`added ${toAdd.length} testimonials, total now ${testimonialsContent.testimonials.length}`);

  await pool.end();
  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
