import type { Metadata } from "next";
import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { StickyCtaBar } from "@/components/home/sticky-cta-bar";
import { getProfileContent } from "@/data/profile";
import { getLinks } from "@/data/links";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Content is DB-backed and admin-editable — render every request fresh
// instead of caching pages as static HTML at build time.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getProfileContent();
  return {
    title: `${profile.name} — Mock Interviews & Mentorship for MAANG, Nvidia, Microsoft`,
    description: profile.tagline,
    keywords: [...profile.tags, "MAANG interview prep", "mock interviews", "system design", "career mentorship"],
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [{ profile }, links] = await Promise.all([getProfileContent(), getLinks()]);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Nav profileName={profile.name} />
          <main className="flex-1 pb-20 sm:pb-0">{children}</main>
          <Footer />
          <StickyCtaBar label={links.primaryCtaLabel} href={links.primaryCtaHref} />
        </ThemeProvider>
      </body>
    </html>
  );
}
