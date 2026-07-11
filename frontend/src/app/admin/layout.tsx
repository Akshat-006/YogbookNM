"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpenCheck,
  CalendarDays,
  CreditCard,
  LayoutTemplate,
  Flower2,
  ChevronRight,
  Moon,
  Sun,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";

const sidebarLinks = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Classes",
    href: "/admin/classes",
    icon: BookOpenCheck,
  },
  {
    label: "Appointments",
    href: "/admin/appointments",
    icon: CalendarDays,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    label: "Website CMS",
    href: "/admin/cms",
    icon: LayoutTemplate,
  },
  {
    label: "FAQ CMS",
    href: "/admin/cms/faq",
    icon: HelpCircle,
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted/60 transition hover:bg-muted"
      aria-label="Toggle theme"
    >
      <Sun className="size-4 rotate-0 scale-100 transition dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition dark:rotate-0 dark:scale-100" />
    </button>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* ── Sidebar ── */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar lg:flex lg:flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
            <Flower2 className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-foreground">Yogbook</p>
            <p className="text-[11px] text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Management
          </p>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="admin-sidebar-pill"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <Icon className="relative size-4 shrink-0" />
                <span className="relative">{link.label}</span>
                {isActive && (
                  <ChevronRight className="relative ml-auto size-3.5 text-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2.5">
            <Link
              href="/"
              className="text-xs text-muted-foreground transition hover:text-primary"
            >
              ← Public Site
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-24 flex-col justify-center border-b border-border bg-sidebar px-4 lg:hidden">
        <div className="flex items-center justify-between h-10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <Flower2 className="size-4 text-primary" />
            </div>
            <span className="text-sm font-bold">Yogbook Admin</span>
          </Link>
        </div>

        {/* Mobile nav - horizontal scroll & centered */}
        <nav className="flex items-center justify-center gap-1.5 overflow-x-auto py-1 w-full">
          {sidebarLinks.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 overflow-auto">
        <div className="pt-24 lg:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
