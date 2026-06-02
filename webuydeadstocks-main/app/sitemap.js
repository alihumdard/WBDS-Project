import { services } from "@/lib/data";

export default async function sitemap() {
  const baseUrl = "https://webuydeadstocks.com";

  const staticPages = [
    { url: baseUrl, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/Blogs`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/services`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/career`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/environment`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/interest`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.4 },
  ].map((page) => ({
    ...page,
    lastModified: new Date().toISOString(),
  }));

  const servicePages = services
    .filter((s) => s.href && s.href.startsWith("/services/"))
    .map((s) => ({
      url: `${baseUrl}${s.href}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  let blogUrls = [];
  try {
    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const edges = data.edges || [];

      blogUrls = edges
        .filter((edge) => edge?.node?.handle)
        .map((edge) => ({
          url: `${baseUrl}/Blogs/${edge.node.handle}`,
          lastModified: edge.node.publishedAt
            ? new Date(edge.node.publishedAt).toISOString()
            : new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 0.7,
        }));
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch blog URLs:", error);
  }

  return [...staticPages, ...servicePages, ...blogUrls];
}