"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Loader2, Plus, Search, EyeOff } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminServicesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/service-pages");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load service pages");
      setPages(data.pages || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublish = async (slug, title) => {
    if (!confirm(`Unpublish "${title}"? Existing static fallback pages will remain available until fully migrated.`)) return;

    try {
      const res = await fetch(`/api/service-pages/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to unpublish service page");
      await fetchPages();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredPages = pages.filter((page) => {
    const query = searchQuery.toLowerCase();
    return page.title.toLowerCase().includes(query) || page.slug.toLowerCase().includes(query);
  });

  return (
    <AdminShell title="Service Pages" description="Create, edit, and publish service pages from the admin panel.">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4">
          <div className="flex gap-2">
            <Link
              href="/admin/services/new"
              className="inline-flex items-center justify-center gap-2 bg-[#008060] hover:bg-[#006e52] text-white px-4 py-2 rounded-md font-medium transition duration-150"
            >
              <Plus className="w-5 h-5" />
              Create Service Page
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search service pages..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#008060] outline-none text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f9fafb] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Title</th>
                  <th className="px-6 py-3 font-semibold">Slug</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Source</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading service pages...
                    </td>
                  </tr>
                )}
                {!loading && error && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-red-600">{error}</td>
                  </tr>
                )}
                {!loading && !error && filteredPages.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">No service pages found.</td>
                  </tr>
                )}
                {!loading && !error && filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{page.title}</td>
                    <td className="px-6 py-4 text-gray-500">{page.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${page.status === "published" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{page.source}</td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/admin/services/${page.slug}`}
                        className="inline-flex items-center gap-1 text-sm bg-white border border-gray-300 shadow-sm px-3 py-1.5 rounded hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                        Edit
                      </Link>
                      {page.source === "database" && page.status === "published" && (
                        <button
                          onClick={() => handleUnpublish(page.slug, page.title)}
                          className="inline-flex items-center gap-1 text-sm bg-white border border-amber-300 text-amber-700 shadow-sm px-3 py-1.5 rounded hover:bg-amber-50 transition-colors"
                        >
                          <EyeOff className="w-4 h-4" />
                          Unpublish
                        </button>
                      )}
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
