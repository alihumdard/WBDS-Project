import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ServicePage from "@/models/ServicePage";
import { getStaticServiceHtml, getStaticServiceSlugs, serviceTitleFromSlug, sanitizeServiceSlug } from "@/lib/servicePages";
import { isAdminRequest } from "@/lib/adminApiAuth";

function formatServicePage(page) {
  const hasStaticFallback = Boolean(getStaticServiceHtml(page.slug));

  return {
    id: page._id.toString(),
    title: page.title,
    slug: page.slug,
    contentHtml: page.contentHtml,
    contentSource: hasStaticFallback ? "static" : page.contentSource || "custom",
    hasStaticFallback,
    seo: page.seo || {},
    h1: page.h1 || "",
    internalLinks: page.internalLinks || "",
    imageAltText: page.imageAltText || "",
    featuredImage: page.featuredImage || {},
    schemaJson: page.schemaJson || "",
    status: page.status,
    source: "database",
    publishedAt: page.publishedAt,
    updatedAt: page.updatedAt,
  };
}

export async function GET() {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const databasePages = await ServicePage.find({}).sort({ updatedAt: -1 });
    const databaseItems = databasePages.map(formatServicePage);
    const databaseSlugs = new Set(databaseItems.map((page) => page.slug));

    const staticItems = getStaticServiceSlugs()
      .filter((slug) => !databaseSlugs.has(slug))
      .map((slug) => ({
        id: `static-${slug}`,
        title: serviceTitleFromSlug(slug),
        slug,
        status: "published",
        source: "static",
        contentSource: "static",
        hasStaticFallback: true,
        publishedAt: null,
        updatedAt: null,
      }));

    return NextResponse.json({ pages: [...databaseItems, ...staticItems] }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch service pages:", error);
    return NextResponse.json({ error: "Failed to fetch service pages" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    const slug = sanitizeServiceSlug(body.slug || "");

    if (!body.title || !slug || !body.contentHtml) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
    }

    const existingPage = await ServicePage.findOne({ slug });
    if (existingPage) {
      return NextResponse.json({ error: "A service page with this slug already exists" }, { status: 400 });
    }

    const status = body.status === "published" ? "published" : "draft";
    const hasStaticFallback = Boolean(getStaticServiceHtml(slug));
    const page = await ServicePage.create({
      title: body.title,
      slug,
        contentHtml: body.contentHtml,
        contentSource: hasStaticFallback || body.contentSource === "static" ? "static" : "custom",
        seo: {
          title: body.seo?.title || "",
          description: body.seo?.description || "",
          canonicalUrl: body.seo?.canonicalUrl || "",
        },
        h1: body.h1 || "",
        internalLinks: body.internalLinks || "",
        imageAltText: body.imageAltText || "",
        featuredImage: {
          url: body.featuredImage?.url || "",
          altText: body.featuredImage?.altText || body.imageAltText || "",
        },
        schemaJson: body.schemaJson || "",
      status,
      publishedAt: status === "published" ? new Date() : null,
    });

    return NextResponse.json({ message: "Service page created successfully", page: formatServicePage(page) }, { status: 201 });
  } catch (error) {
    console.error("Failed to create service page:", error);
    return NextResponse.json({ error: "Failed to create service page" }, { status: 500 });
  }
}
