"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const emptyForm = {
  title: "",
  slug: "",
  contentHtml: "",
  contentSource: "custom",
  seoTitle: "",
  seoDescription: "",
  canonicalUrl: "",
  h1: "",
  internalLinks: "",
  imageAltText: "",
  featuredImageUrl: "",
  featuredImageAlt: "",
  featuredImagePreview: "",
  featuredImageFile: null,
  schemaJson: "",
  status: "draft",
  source: "database",
  hasStaticFallback: false,
};

function slugify(value) {
  return value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");
}

export default function ServicePageForm({ mode, slug }) {
  const router = useRouter();
  const [formData, setFormData] = useState(emptyForm);
  const [fetching, setFetching] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (mode !== "edit" || !slug) return;

    const fetchPage = async () => {
      try {
        setFetching(true);
        const res = await fetch(`/api/service-pages/${slug}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load service page");

        const hasStaticFallback = Boolean(data.hasStaticFallback || data.source === "static");

        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          contentHtml: data.contentHtml || "",
          contentSource: hasStaticFallback ? "static" : data.contentSource || "custom",
          seoTitle: data.seo?.title || "",
          seoDescription: data.seo?.description || "",
          canonicalUrl: data.seo?.canonicalUrl || "",
          h1: data.h1 || "",
          internalLinks: data.internalLinks || "",
          imageAltText: data.imageAltText || "",
          featuredImageUrl: data.featuredImage?.url || "",
          featuredImageAlt: data.featuredImage?.altText || data.imageAltText || "",
          featuredImagePreview: data.featuredImage?.url || "",
          featuredImageFile: null,
          schemaJson: data.schemaJson || "",
          status: data.status || "draft",
          source: data.source || "database",
          hasStaticFallback,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    fetchPage();
  }, [mode, slug]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "slug" ? slugify(value) : value,
    }));
  };

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: mode === "new" && !prev.slug ? slugify(value) : prev.slug,
    }));
  };

  const handleFeaturedImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      featuredImageFile: file,
      featuredImagePreview: URL.createObjectURL(file),
    }));
  };

  const handleRemoveFeaturedImage = () => {
    setFormData((prev) => ({
      ...prev,
      featuredImageFile: null,
      featuredImageUrl: "",
      featuredImagePreview: "",
      featuredImageAlt: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      let featuredImageUrl = formData.featuredImageUrl;

      if (formData.featuredImageFile) {
        const imageData = new FormData();
        imageData.append("file", formData.featuredImageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: imageData,
        });
        const uploadResult = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadResult.error || "Featured image upload failed");
        }
        featuredImageUrl = uploadResult.url;
        setFormData((prev) => ({
          ...prev,
          featuredImageUrl,
          featuredImagePreview: featuredImageUrl,
        }));
      }

      const endpoint = mode === "new" ? "/api/service-pages" : `/api/service-pages/${slug}`;
      const method = mode === "new" ? "POST" : "PUT";
      const payload = {
        title: formData.title,
        slug: formData.slug,
        contentHtml: formData.contentHtml,
        contentSource: formData.hasStaticFallback ? "static" : formData.contentSource,
        seo: {
          title: formData.seoTitle,
          description: formData.seoDescription,
          canonicalUrl: formData.canonicalUrl,
        },
        h1: formData.h1,
        internalLinks: formData.internalLinks,
        imageAltText: formData.imageAltText || formData.featuredImageAlt,
        featuredImage: {
          url: featuredImageUrl,
          altText: formData.featuredImageAlt || formData.imageAltText,
        },
        schemaJson: formData.schemaJson,
        status: formData.status,
      };

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save service page");

      setSuccess("Service page saved successfully.");
      const nextSlug = data.page?.slug || formData.slug;
      setTimeout(() => {
        router.push(`/admin/services/${nextSlug}`);
        router.refresh();
      }, 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#202223] font-sans pb-20">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/admin/services" className="p-2 hover:bg-gray-100 rounded-md transition duration-150">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold">{mode === "new" ? "Create service page" : "Edit service page"}</h1>
            {formData.hasStaticFallback && (
              <p className="text-xs text-amber-700 mt-1">Static page — only SEO & image settings are editable.</p>
            )}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving || !formData.title || !formData.slug || (!formData.hasStaticFallback && !formData.contentHtml)}
          className="flex items-center gap-2 bg-[#008060] hover:bg-[#006e52] text-white px-4 py-2 rounded-md font-medium transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-8 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full border border-gray-300 rounded max-w-full text-base p-2 focus:ring-2 focus:ring-[#008060] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <div className="flex items-center">
                  <span className="bg-gray-100 border border-gray-300 border-r-0 text-gray-500 px-3 py-2 rounded-l text-sm">
                    /services/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-r p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                  />
                </div>
              </div>
              {!formData.hasStaticFallback && (
                <div>
                  <label className="block text-sm font-medium mb-1 mt-6">Content</label>
                  <div className="border rounded bg-white overflow-hidden" style={{ minHeight: "360px" }}>
                    <ReactQuill
                      theme="snow"
                      value={formData.contentHtml}
                      onChange={(content) => setFormData((prev) => ({ ...prev, contentHtml: content }))}
                      className="h-80 mb-12"
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ color: [] }, { background: [] }],
                          ["blockquote", "code-block"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
                          ["link", "image", "video"],
                          ["clean"],
                        ],
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-medium mb-4">SEO settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Meta title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                  placeholder="Computer Scrap Buyers in Dubai | We Buy Dead Stocks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meta description</label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                  placeholder="Write a search-friendly description for this service page."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Canonical URL</label>
                <input
                  type="url"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                  placeholder="https://webuydeadstocks.com/services/computer-scrap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">H1 / main heading</label>
                <input
                  type="text"
                  name="h1"
                  value={formData.h1}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                  placeholder="Optional SEO heading override"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Internal links notes</label>
                <textarea
                  name="internalLinks"
                  value={formData.internalLinks}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                  placeholder="Track important internal links for this service page."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image alt text</label>
                <textarea
                  name="imageAltText"
                  value={formData.imageAltText}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                  placeholder="SEO alt text notes for service page images."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Schema JSON</label>
                <textarea
                  name="schemaJson"
                  value={formData.schemaJson}
                  onChange={handleChange}
                  rows={8}
                  className="w-full font-mono text-sm border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                  placeholder='{"@context":"https://schema.org","@type":"Service"}'
                />
                <p className="text-xs text-gray-500 mt-1">Invalid JSON will be ignored on the public page instead of breaking the page.</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-medium mb-4">Publishing</h2>
            {formData.hasStaticFallback ? (
              <div className="rounded bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-800">
                This page is always live. Its design is managed via a static file.
              </div>
            ) : (
              <>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-medium mb-4">Featured image</h2>
            {formData.featuredImagePreview && (
              <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-4">
                <img src={formData.featuredImagePreview} alt="Service page image preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Upload / replace image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageChange}
                  className="w-full border border-gray-300 rounded p-1.5 focus:ring-2 focus:ring-[#008060] outline-none text-sm file:mr-3 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  name="featuredImageUrl"
                  value={formData.featuredImageUrl}
                  onChange={(event) => {
                    handleChange(event);
                    setFormData((prev) => ({ ...prev, featuredImagePreview: event.target.value }));
                  }}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none text-sm"
                  placeholder="/uploads/service-image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image alt text</label>
                <textarea
                  name="featuredImageAlt"
                  value={formData.featuredImageAlt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none text-sm"
                  placeholder="Describe this service image for SEO and accessibility."
                />
              </div>
              {(formData.featuredImagePreview || formData.featuredImageUrl) && (
                <button
                  type="button"
                  onClick={handleRemoveFeaturedImage}
                  className="w-full border border-red-300 text-red-600 rounded p-2 text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  Remove image
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              For static service pages, this image is saved for admin/SEO use. Custom pages can render it on the public page.
            </p>
          </div>

          {mode === "edit" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-medium mb-3">Preview</h2>
              <Link
                href={`/services/${formData.slug}`}
                target="_blank"
                className="inline-flex w-full justify-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition duration-150"
              >
                Open public page
              </Link>
            </div>
          )}
        </aside>
      </main>

      {error && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}
      {success && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {success}
        </div>
      )}
    </div>
  );
}
