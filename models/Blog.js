import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        handle: {
            type: String,
            required: [true, "Handle (slug) is required"],
            unique: true,
        },
        excerpt: {
            type: String,
            default: "",
        },
        contentHtml: {
            type: String,
            required: [true, "Content HTML is required"],
        },
        image: {
            url: { type: String },
            altText: { type: String, default: "" },
        },
        seo: {
            title: { type: String },
            description: { type: String },
        },
        publishedAt: {
            type: Date,
            default: Date.now,
        },
        redirectUrl: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);


const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
