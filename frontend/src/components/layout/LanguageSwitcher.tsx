"use client";

import { Globe } from "lucide-react";
import { useState, useTransition } from "react";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [locale, setLocale] = useState(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(^|;)\s*NEXT_LOCALE\s*=\s*([^;]+)/);
      return match ? match[2] : "en";
    }
    return "en";
  });

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "hi" : "en";
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    setLocale(nextLocale);
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="flex h-10 items-center gap-1.5 rounded-full border border-border bg-background/80 px-4 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50 select-none cursor-pointer"
      aria-label="Toggle language"
    >
      <Globe className={`size-3.5 ${isPending ? "animate-spin" : ""}`} />
      <span>{locale === "en" ? "EN" : "हिं"}</span>
    </button>
  );
}
