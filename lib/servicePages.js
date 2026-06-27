import fs from "fs";
import path from "path";

export function serviceTitleFromSlug(slug = "") {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function sanitizeServiceSlug(slug = "") {
  return slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
}

export function getStaticServiceSlugs() {
  const dir = path.join(process.cwd(), "service-next");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".html"))
    .map((file) => file.replace(/\.html$/, ""))
    .filter((slug) => slug !== "services")
    .sort();
}

export function getStaticServiceHtml(slug) {
  const safeSlug = sanitizeServiceSlug(slug);
  const filePath = path.join(process.cwd(), "service-next", `${safeSlug}.html`);
  if (!fs.existsSync(filePath)) return null;

  const rawHtml = fs.readFileSync(filePath, "utf-8");
  const blogStartIndex = rawHtml.indexOf('<div class="blog');
  let blogEndIndex = rawHtml.indexOf('<div class="bg-[#121212]');
  if (blogEndIndex === -1) {
    blogEndIndex = rawHtml.indexOf("<footer");
  }

  let content = rawHtml;
  if (blogStartIndex !== -1 && blogEndIndex !== -1) {
    content = rawHtml.substring(blogStartIndex, blogEndIndex);
  } else {
    const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) content = bodyMatch[1];
  }

  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  content = content.replace(
    /href="https?:\/\/(www\.)?webuydeadstocks\.com\/(service|services)\/([^"]*)"/gi,
    'href="/services/$3"'
  );

  return content;
}
