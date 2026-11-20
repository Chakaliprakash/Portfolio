import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/content";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://prakash-portfolio-prakash-chakalis-projects.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Prakash Chakali — Java Backend Developer", template: "%s | Prakash Chakali" },
  description: "Prakash Chakali is a Java backend developer and software engineer focused on Spring Boot, databases, concurrency, and thoughtful software systems.",
  keywords: ["Prakash Chakali", "Java Developer", "Spring Boot", "Backend Engineer", "Hyderabad", "Software Engineer"],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Prakash Chakali — Java Backend Developer",
    description: "Engineering dependable backend systems and thoughtful product experiences.",
    siteName: "Prakash Chakali Portfolio",
  },
  twitter: { card: "summary_large_image", title: "Prakash Chakali — Java Backend Developer", description: "Engineering dependable backend systems and thoughtful product experiences." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#10120f", colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Java Backend Developer",
    url: siteUrl,
    email: profile.email,
    address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: ["Java", "Spring Boot", "MySQL", "REST APIs", "Concurrency", "Data Structures and Algorithms"],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
