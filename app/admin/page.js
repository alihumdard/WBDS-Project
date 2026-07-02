"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Newspaper, CheckCircle2, FileEdit, Plus, Loader2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalServices: 0,
    publishedServices: 0,
    draftServices: 0,
    totalBlogs: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [servicesRes, blogsRes] = await Promise.all([
          fetch("/api/service-pages"),
          fetch("/api/blogs"),
        ]);
        const servicesData = await servicesRes.json();
        const blogsData = await blogsRes.json();

        const pages = servicesData.pages || [];
        const blogs = (blogsData.edges || []).map((edge) => edge.node);

        setStats({
          totalServices: pages.length,
          publishedServices: pages.filter((p) => p.status === "published").length,
          draftServices: pages.filter((p) => p.status === "draft").length,
          totalBlogs: blogs.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { label: "Total Service Pages", value: stats.totalServices, icon: FileText, color: "text-blue-600 bg-blue-50" },
    { label: "Published", value: stats.publishedServices, icon: CheckCircle2, color: "text-green-600 bg-green-50" },
    { label: "Drafts", value: stats.draftServices, icon: FileEdit, color: "text-amber-600 bg-amber-50" },
    { label: "Total Blogs", value: stats.totalBlogs, icon: Newspaper, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <AdminShell title="Dashboard" description="Overview of your site content.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={`p-2 rounded-lg ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : card.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{card.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/services/new"
          className="flex items-center gap-4 bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:border-[#008060] transition-colors group"
        >
          <span className="p-3 rounded-lg bg-[#e3f5ee] text-[#006e52] group-hover:bg-[#008060] group-hover:text-white transition-colors">
            <Plus className="w-5 h-5" />
          </span>
          <div>
            <div className="font-semibold text-gray-900">Create Service Page</div>
            <div className="text-sm text-gray-500">Add a new service page to the site.</div>
          </div>
        </Link>

        <Link
          href="/admin/uploadBlogs"
          className="flex items-center gap-4 bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:border-[#008060] transition-colors group"
        >
          <span className="p-3 rounded-lg bg-[#e3f5ee] text-[#006e52] group-hover:bg-[#008060] group-hover:text-white transition-colors">
            <Plus className="w-5 h-5" />
          </span>
          <div>
            <div className="font-semibold text-gray-900">Create Blog Post</div>
            <div className="text-sm text-gray-500">Publish a new blog article.</div>
          </div>
        </Link>
      </div>
    </AdminShell>
  );
}
