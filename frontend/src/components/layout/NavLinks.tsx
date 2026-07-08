"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navigation";
import clsx from "clsx";

import { useTranslations } from "next-intl";

const labelKeyMap: Record<string, string> = {
  "Home": "home",
  "Classes": "classes",
  "Appointments": "appointments",
  "Dashboard": "dashboard"
};

export function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation
        .filter((item) => item.href !== "/dashboard")
        .map((item) => {
          const translationKey = labelKeyMap[item.label] || item.label.toLowerCase();
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "transition-colors hover:text-primary",
                pathname === item.href
                  ? "font-semibold text-primary"
                  : "text-muted-foreground"
              )}
            >
              {t(translationKey)}
            </Link>
          );
        })}
    </nav>
  );
}
