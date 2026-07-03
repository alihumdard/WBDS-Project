import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ServicePage from "@/models/ServicePage";

export async function GET() {
  try {
    await connectToDatabase();

    const pages = await ServicePage.find({ status: "published" })
      .select("title slug h1")
      .sort({ publishedAt: 1 })
      .lean();

    const items = pages.map((page) => ({
      slug: page.slug,
      title: page.h1 || page.title,
    }));

    return NextResponse.json({ pages: items }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch published service pages:", error);
    return NextResponse.json({ error: "Failed to fetch service pages" }, { status: 500 });
  }
}
