"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PenSquare, Trash2, Plus, Search, Loader2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/blogs");
            const data = await res.json();
            if (res.ok) {
                const fetchedBlogs = data.edges.map(edge => edge.node);
                setBlogs(fetchedBlogs);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug, title) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            const res = await fetch(`/api/blogs/${slug}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setBlogs(blogs.filter(b => b.handle !== slug));
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete blog.");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <AdminShell title="Blogs" description="Create, edit, and manage blog posts.">
            <div className="space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4">
                    <div className="flex gap-2">
                        <Link
                            href="/admin/uploadBlogs"
                            className="inline-flex items-center justify-center gap-2 bg-[#008060] hover:bg-[#006e52] text-white px-4 py-2 rounded-md font-medium transition duration-150"
                        >
                            <Plus className="w-5 h-5" />
                            Create Blog
                        </Link>
                    </div>
                </div>


                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

                    
                    <div className="p-4 border-b border-gray-200 flex items-center gap-2">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search blogs by title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#008060] outline-none text-sm"
                            />
                        </div>
                    </div>

                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#f9fafb] border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 font-semibold w-12">Image</th>
                                    <th className="px-6 py-3 font-semibold">Title</th>
                                    <th className="px-6 py-3 font-semibold">Slug</th>
                                    <th className="px-6 py-3 font-semibold">Published</th>
                                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Loading blogs...
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredBlogs.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            No blogs found matching your search.
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredBlogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                                                {blog.image?.url && (
                                                    <img src={blog.image.url} alt="" className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{blog.title}</td>
                                        <td className="px-6 py-4 text-gray-500">{blog.handle}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(blog.publishedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link
                                                href={`/admin/blogs/${blog.handle}`}
                                                className="inline-flex items-center gap-1 text-sm bg-white border border-gray-300 shadow-sm px-3 py-1.5 rounded hover:bg-gray-50 transition-colors"
                                            >
                                                <PenSquare className="w-4 h-4 text-gray-600" />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(blog.handle, blog.title)}
                                                className="inline-flex items-center gap-1 text-sm bg-white border border-red-300 text-red-600 shadow-sm px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AdminShell>
    );
}
