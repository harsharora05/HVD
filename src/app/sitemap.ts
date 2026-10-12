import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/services", "/solutions", "/work", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
