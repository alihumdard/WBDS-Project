import { NextResponse } from "next/server";
import { services } from "@/lib/data";
import connectToDatabase from "@/lib/mongodb";
import ServicePage from "@/models/ServicePage";

const SITE_URL = "https://webuydeadstocks.com";

async function getPublishedServicePages() {
  try {
    await connectToDatabase();
    return await ServicePage.find({ status: "published" })
      .select("title slug seo")
      .lean();
  } catch (error) {
    console.error("llms.txt: Failed to load service pages:", error);
    return [];
  }
}

export async function GET() {
  const dbPages = await getPublishedServicePages();
  const dbSlugs = new Set(dbPages.map((p) => p.slug));

  const serviceLinks = [
    ...dbPages.map(
      (p) => `- [${p.title}](${SITE_URL}/services/${p.slug}): ${p.seo?.description || ""}`.trim()
    ),
    ...services
      .filter((s) => s.href?.startsWith("/services/") && !dbSlugs.has(s.href.replace("/services/", "")))
      .map((s) => `- [${s.name}](${SITE_URL}${s.href})`),
  ];

  const lines = [
    "# We Buy Dead Stocks",
    "",
    "> We Buy Dead Stocks buys surplus, obsolete, and dead stock inventory directly from businesses across the GCC, including electronics, metal scrap, industrial equipment, and MRO surplus. We provide free valuations and fast collection with direct payment.",
    "",
    "## Company",
    `- [Homepage](${SITE_URL})`,
    `- [About](${SITE_URL}/about)`,
    `- [Contact](${SITE_URL}/contact)`,
    `- [Free Valuation](https://www.webuydeadstock.com/get-free-valuation-dead-stocks)`,
    `- [Careers](${SITE_URL}/career)`,
    `- [Environment](${SITE_URL}/environment)`,
    "",
    "## Services",
    ...serviceLinks,
    "",
    "## Other",
    `- [Blog](${SITE_URL}/Blogs)`,
    `- [Privacy Policy](${SITE_URL}/privacy)`,
    `- [Terms](${SITE_URL}/terms)`,
  ];

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
