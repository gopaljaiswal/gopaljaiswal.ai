// Pulled from https://www.linkedin.com/in/gopal-jaiswal-568ab9a8/ (public activity).
// Job/hiring posts are excluded on purpose — only genuine posts shown here.

export type LinkedInPost = {
  id: string;
  date: string;
  text: string;
  likes: number;
  url: string;
};

export const linkedinPosts: LinkedInPost[] = [
  {
    id: "claude-code",
    date: "2026-09-15",
    text: "I was exploring Claude Code and came across this gem. A 2-hour session by an Anthropic developer that explains Claude Code really well. I knew most of the concepts already, but the way they're explained makes it worth your time. Save this post — watch it when you get 2 hours.",
    likes: 9,
    url: "https://www.linkedin.com/posts/gopal-jaiswal-568ab9a8_claudecode-agenticai-ai-activity-7505459171895582721-QbNq",
  },
];
