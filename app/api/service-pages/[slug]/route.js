import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ServicePage from "@/models/ServicePage";
import { getStaticServiceHtml, serviceTitleFromSlug, sanitizeServiceSlug } from "@/lib/servicePages";
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

export async function GET(request, { params }) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { slug: rawSlug } = await params;
    const slug = sanitizeServiceSlug(rawSlug);

    const page = await ServicePage.findOne({ slug });
    if (page) {
      return NextResponse.json(formatServicePage(page), { status: 200 });
    }

    const staticHtml = getStaticServiceHtml(slug);
    if (!staticHtml) {
      return NextResponse.json({ error: "Service page not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: `static-${slug}`,
        title: serviceTitleFromSlug(slug),
        slug,
        contentHtml: staticHtml,
        contentSource: "static",
        seo: {},
        h1: "",
        internalLinks: "",
        imageAltText: "",
        featuredImage: {},
        schemaJson: "",
        status: "published",
        source: "static",
        hasStaticFallback: true,
        publishedAt: null,
        updatedAt: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch service page:", error);
    return NextResponse.json({ error: "Failed to fetch service page" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { slug: rawSlug } = await params;
    const currentSlug = sanitizeServiceSlug(rawSlug);
    const body = await request.json();
    const nextSlug = sanitizeServiceSlug(body.slug || currentSlug);

    const isStatic = Boolean(getStaticServiceHtml(nextSlug));
    if (!body.title || !nextSlug || (!isStatic && !body.contentHtml)) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
    }

    if (nextSlug !== currentSlug) {
      const duplicate = await ServicePage.findOne({ slug: nextSlug });
      if (duplicate) {
        return NextResponse.json({ error: "A service page with the new slug already exists" }, { status: 400 });
      }
    }

    const hasStaticFallback = Boolean(getStaticServiceHtml(nextSlug));
    const status = hasStaticFallback ? "published" : (body.status === "published" ? "published" : "draft");
    const existingPage = await ServicePage.findOne({ slug: currentSlug });
    const publishedAt =
      status === "published"
        ? existingPage?.publishedAt || new Date()
        : null;

    const page = await ServicePage.findOneAndUpdate(
      { slug: currentSlug },
      {
        $set: {
          title: body.title,
          slug: nextSlug,
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
          publishedAt,
        },
      },
      { new: true, runValidators: true, upsert: true }
    );

    return NextResponse.json({ message: "Service page saved successfully", page: formatServicePage(page) }, { status: 200 });
  } catch (error) {
    console.error("Failed to update service page:", error);
    return NextResponse.json({ error: "Failed to update service page" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { slug: rawSlug } = await params;
    const slug = sanitizeServiceSlug(rawSlug);

    const page = await ServicePage.findOneAndUpdate(
      { slug },
      { $set: { status: "draft", publishedAt: null } },
      { new: true }
    );

    if (!page) {
      return NextResponse.json({ error: "Service page not found in database" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service page unpublished successfully", page: formatServicePage(page) }, { status: 200 });
  } catch (error) {
    console.error("Failed to unpublish service page:", error);
    return NextResponse.json({ error: "Failed to unpublish service page" }, { status: 500 });
  }
}
