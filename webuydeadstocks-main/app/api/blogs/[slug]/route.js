import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(request, { params }) {
    try {
        await connectToDatabase();

        const { slug } = await params;

        const blog = await Blog.findOne({ handle: slug });

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }


        const formattedBlog = {
            id: blog._id.toString(),
            title: blog.title,
            handle: blog.handle,
            excerpt: blog.excerpt,
            publishedAt: blog.publishedAt,
            image: blog.image,
            contentHtml: blog.contentHtml,
            seo: blog.seo,
            redirectUrl: blog.redirectUrl || ""
        };

        return NextResponse.json(formattedBlog, { status: 200 });

    } catch (error) {
        console.error("Failed to fetch blog:", error);
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { slug } = await params;
        const body = await request.json();


        if (body.handle && body.handle !== slug) {
            const existingBlog = await Blog.findOne({ handle: body.handle });
            if (existingBlog) {
                return NextResponse.json({ error: "A blog with the new handle already exists" }, { status: 400 });
            }
        }

        const updatedBlog = await Blog.findOneAndUpdate(
            { handle: slug },
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog updated successfully", blog: updatedBlog }, { status: 200 });

    } catch (error) {
        console.error("Failed to update blog:", error);
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { slug } = await params;

        const deletedBlog = await Blog.findOneAndDelete({ handle: slug });

        if (!deletedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete blog:", error);
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}
