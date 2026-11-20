import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://chakaliprakash.github.io/Portfolio/sitemap.xml" };
}
