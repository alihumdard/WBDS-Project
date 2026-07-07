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

function stripTags(html = "") {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractFaqEntries(contentHtml = "") {
  if (!contentHtml) return [];

  const faqHeadingMatch = contentHtml.match(
    /<h[1-6][^>]*>\s*(?:frequently asked questions|faqs?)\s*<\/h[1-6]>/i
  );
  if (!faqHeadingMatch) return [];

  const faqSectionHtml = contentHtml.slice(faqHeadingMatch.index + faqHeadingMatch[0].length);

  const blockRegex = /<(h[1-6]|p)[^>]*>([\s\S]*?)<\/\1>/gi;
  const blocks = [];
  let match;
  while ((match = blockRegex.exec(faqSectionHtml)) !== null) {
    blocks.push({ tag: match[1].toLowerCase(), innerHtml: match[2] });
  }

  const isQuestionBlock = (block) => {
    if (block.tag.startsWith("h")) return true;
    return /^<strong>[\s\S]*<\/strong>$/i.test(block.innerHtml.trim());
  };

  const entries = [];
  let currentQuestion = null;
  let currentAnswerParts = [];

  const pushCurrent = () => {
    if (currentQuestion && currentAnswerParts.length > 0) {
      const answer = stripTags(currentAnswerParts.join(" "));
      if (answer) entries.push({ question: currentQuestion, answer });
    }
  };

  for (const block of blocks) {
    // A second consecutive FAQ-style heading marks the end of the FAQ list (e.g. "Conclusion").
    if (isQuestionBlock(block) && block.tag.startsWith("h") && /conclusion/i.test(block.innerHtml)) {
      break;
    }

    if (isQuestionBlock(block)) {
      pushCurrent();
      currentQuestion = stripTags(block.innerHtml).replace(/\?*$/, "?");
      currentAnswerParts = [];
    } else if (currentQuestion) {
      currentAnswerParts.push(block.innerHtml);
    }
  }
  pushCurrent();

  return entries;
}

export function buildFaqSchema(contentHtml = "") {
  const entries = extractFaqEntries(contentHtml);
  if (entries.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
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
