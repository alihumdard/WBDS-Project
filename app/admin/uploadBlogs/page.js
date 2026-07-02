"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function UploadBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    const [formData, setFormData] = useState({
        title: "",
        handle: "",
        excerpt: "",
        contentHtml: "",
        imageFile: null,
        imagePreview: "",
        imageAlt: "",
        seoTitle: "",
        seoDescription: "",
        redirectUrl: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;


        let finalValue = value;
        if (name === "handle") {
            finalValue = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        }

        setFormData((prev) => ({ ...prev, [name]: finalValue }));


        if (name === "title" && !formData.handle) {
            setFormData((prev) => ({
                ...prev,
                handle: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }));
        }
    };

    const handleContentChange = (content, delta, source, editor) => {
        setFormData((prev) => ({ ...prev, contentHtml: content }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                imageFile: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            let uploadedImageUrl = "";


            if (formData.imageFile) {
                const imgData = new FormData();
                imgData.append("file", formData.imageFile);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: imgData,
                });

                const uploadResult = await uploadRes.json();
                if (!uploadRes.ok) {
                    throw new Error(uploadResult.error || "Image upload failed");
                }

                uploadedImageUrl = uploadResult.url;
            }

            const payload = {
                title: formData.title,
                handle: formData.handle,
                excerpt: formData.excerpt,
                contentHtml: formData.contentHtml,
                image: {
                    url: uploadedImageUrl,
                    altText: formData.imageAlt,
                },
                seo: {
                    title: formData.seoTitle,
                    description: formData.seoDescription,
                },
                redirectUrl: formData.redirectUrl,
            };

            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/blogs");
            }, 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f6f8] text-[#202223] font-sans pb-20">
            
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="p-2 hover:bg-gray-100 rounded-md transition duration-150">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <h1 className="text-xl font-semibold">Add blog post</h1>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.title || !formData.contentHtml || !formData.imageFile || !formData.imageAlt}
                    className="flex items-center gap-2 bg-[#008060] hover:bg-[#006e52] text-white px-4 py-2 rounded-md font-medium transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save"}
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
                                    onChange={handleChange}
                                    placeholder="e.g. My Awesome Blog Post"
                                    className="w-full border border-gray-300 rounded max-w-full text-base p-2 focus:ring-2 focus:ring-[#008060] focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 mt-6">Content</label>
                                <div className="border rounded bg-white overflow-hidden" style={{ minHeight: '300px' }}>
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.contentHtml}
                                        onChange={handleContentChange}
                                        className="h-64 mb-12"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ 'color': [] }, { 'background': [] }],
                                                [{ 'script': 'sub' }, { 'script': 'super' }],
                                                ['blockquote', 'code-block'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                [{ 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
                                                ['link', 'image', 'video'],
                                                ['clean']
                                            ]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                        <h2 className="text-lg font-medium mb-4">Excerpt</h2>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">
                                Add a summary of the post to appear on your home page or blog.
                            </p>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium">Search engine listing preview</h2>
                        </div>
                        <div className="space-y-4 pt-2 border-t border-gray-200 mt-2">
                            <div className="mb-4">
                                <h3 className="text-blue-800 text-lg hover:underline cursor-pointer truncate">
                                    {formData.seoTitle || formData.title || "Page title"}
                                </h3>
                                <p className="text-green-700 text-sm truncate">
                                    https://webuydeadstocks.com/Blogs/{formData.handle || "handle"}
                                </p>
                                <p className="text-gray-600 text-sm mt-1 line-clamp-2 w-full">
                                    {formData.seoDescription || formData.excerpt || "Description placeholder..."}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Page title</label>
                                <input
                                    type="text"
                                    name="seoTitle"
                                    value={formData.seoTitle}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">{formData.seoTitle.length} of 70 characters used</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="seoDescription"
                                    value={formData.seoDescription}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">{formData.seoDescription.length} of 320 characters used</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">URL and handle</label>
                                <div className="flex items-center">
                                    <span className="bg-gray-100 border border-gray-300 border-r-0 text-gray-500 px-3 py-2 rounded-l text-sm">
                                        /Blogs/
                                    </span>
                                    <input
                                        type="text"
                                        name="handle"
                                        value={formData.handle}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-r p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <label className="block text-sm font-medium mb-1">Redirect this blog to URL (Optional)</label>
                                <input
                                    type="url"
                                    name="redirectUrl"
                                    value={formData.redirectUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">If set, users visiting this blog will be redirected to this URL.</p>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="w-full lg:w-80 flex-shrink-0 space-y-6">

                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                        <h2 className="text-lg font-medium mb-4">Featured image</h2>
                        <div className="space-y-4">
                            {formData.imagePreview && (
                                <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden relative mb-2 border border-gray-200">
                                    <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium mb-1">Upload Image <span className="text-red-500">*</span></label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full border border-gray-300 rounded p-1.5 focus:ring-2 focus:ring-[#008060] outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 mt-3">Image Alt Text <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="imageAlt"
                                    value={formData.imageAlt}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#008060] outline-none text-sm"
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </main>

            
            {error && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    {error}
                </div>
            )}
            {success && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    Blog post saved successfully! Redirecting...
                </div>
            )}

        </div>
    );
}
