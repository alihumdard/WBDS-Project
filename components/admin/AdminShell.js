"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Newspaper, LogOut, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/services", label: "Service Pages", icon: FileText },
];

export default function AdminShell({ title, description, children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#202223] font-sans flex">
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="px-6 py-6 border-b border-gray-200">
          <span className="text-lg font-bold tracking-tight text-gray-900">We Buy Dead Stocks</span>
          <div className="text-xs text-gray-500 mt-0.5">Admin Panel</div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#008060] hover:text-[#006e52] hover:underline mt-2"
          >
            <ExternalLink className="w-3 h-3" />
            View website
          </a>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#e3f5ee] text-[#006e52]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-gray-900">WBDS Admin</span>
          <div className="flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="p-2 rounded-md text-gray-600 hover:bg-gray-50">
                  <Icon className="w-4 h-4" />
                </Link>
              );
            })}
            <button onClick={handleLogout} className="p-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="p-6 lg:p-10">
          {(title || description) && (
            <div className="max-w-6xl mx-auto mb-8">
              {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
              {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </div>
          )}
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
