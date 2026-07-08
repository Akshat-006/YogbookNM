"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { navigation } from "@/constants/navigation";
import { LoginDialog } from "@/features/auth/components/LoginDialog";
import { logout } from "@/lib/logout";

import { useTranslations } from "next-intl";

const labelKeyMap: Record<string, string> = {
  "Home": "home",
  "Classes": "classes",
  "Appointments": "appointments",
  "Dashboard": "dashboard"
};

export function MobileMenu() {
  const t = useTranslations("Navbar");
  const [loginOpen, setLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    checkAuth();

    const onStorage = () => checkAuth();
    const onAuthChanged = () => checkAuth();

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onAuthChanged as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged as EventListener);
    };
  }, []);

  function handleLogout() {
    logout();
    window.dispatchEvent(new Event("authChanged"));
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-72">
          <nav className="mt-12 flex flex-col gap-6">
            {navigation
              .filter((item) => item.href !== "/dashboard")
              .map((item) => {
                const translationKey = labelKeyMap[item.label] || item.label.toLowerCase();
                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {t(translationKey)}
                    </Link>
                  </SheetClose>
                );
              })}

            <SheetClose asChild>
              <Button asChild className="mt-4 rounded-full">
                <Link href="/appointments">{t("bookNow")}</Link>
              </Button>
            </SheetClose>

            {isAuthenticated ? (
              <>
                <SheetClose asChild>
                  <Button asChild variant="ghost" className="rounded-full">
                    <Link href="/dashboard">{t("dashboard")}</Link>
                  </Button>
                </SheetClose>
                <Button variant="ghost" onClick={handleLogout}>{t("logout")}</Button>
              </>
            ) : (
              <Button variant="ghost" onClick={() => setLoginOpen(true)}>
                {t("login")}
              </Button>
            )}
          </nav>
        </SheetContent>
      </Sheet>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
