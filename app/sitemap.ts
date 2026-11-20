import type { MetadataRoute } from "next";
import { projects } from "@/data/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://prakash-portfolio-prakash-chakalis-projects.vercel.app").replace(/\/$/, "");
  return [
    { url: base, lastModified: new Date() },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
