import mongoose from "mongoose";

const ServicePageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    contentHtml: {
      type: String,
      required: [true, "Content HTML is required"],
    },
    contentSource: {
      type: String,
      enum: ["static", "custom"],
      default: "custom",
    },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      canonicalUrl: { type: String, default: "" },
    },
    h1: {
      type: String,
      default: "",
    },
    internalLinks: {
      type: String,
      default: "",
    },
    imageAltText: {
      type: String,
      default: "",
    },
    featuredImage: {
      url: { type: String, default: "" },
      altText: { type: String, default: "" },
    },
    schemaJson: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ServicePage || mongoose.model("ServicePage", ServicePageSchema);
