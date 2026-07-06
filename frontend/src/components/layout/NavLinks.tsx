"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navigation";
import clsx from "clsx";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) => (
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
          {item.label}
        </Link>
      ))}
    </nav>
  );
}