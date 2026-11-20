import type { MetadataRoute } from "next";
import { projects } from "@/data/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://chakaliprakash.github.io/Portfolio";
  return [{ url: base, lastModified: new Date() }, ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date() }))];
}
