"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Calendar, BookOpen, LayoutDashboard, LogIn, LogOut } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { navigation } from "@/constants/navigation";
import { LoginDialog } from "@/features/auth/components/LoginDialog";
import { logout } from "@/lib/logout";

import { useTranslations } from "next-intl";

const labelKeyMap: Record<string, string> = {
  Home: "home",
  Classes: "classes",
  Appointments: "appointments",
  Dashboard: "dashboard",
};

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-5 w-5" />,
  Classes: <BookOpen className="h-5 w-5" />,
  Appointments: <Calendar className="h-5 w-5" />,
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

    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChanged", checkAuth as EventListener);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChanged", checkAuth as EventListener);
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

        <SheetContent
          side="right"
          className="w-[88vw] max-w-[360px] border-l bg-background px-6 py-6"
        >
          <SheetHeader className="mb-8">
            <SheetTitle className="text-left text-2xl font-bold">
              Yogbook
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-3">
            {navigation
              .filter((item) => item.href !== "/dashboard")
              .map((item) => {
                const translationKey =
                  labelKeyMap[item.label] || item.label.toLowerCase();

                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                    >
                      {iconMap[item.label]}
                      {t(translationKey)}
                    </Link>
                  </SheetClose>
                );
              })}

            <div className="my-4 h-px bg-border" />

            <SheetClose asChild>
              <Button
                asChild
                className="h-12 w-full rounded-xl text-base font-semibold"
              >
                <Link href="/appointments">{t("bookNow")}</Link>
              </Button>
            </SheetClose>

            {isAuthenticated ? (
              <>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-2 h-12 w-full rounded-xl"
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {t("dashboard")}
                    </Link>
                  </Button>
                </SheetClose>

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="h-12 w-full rounded-xl"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => setLoginOpen(true)}
                className="mt-2 h-12 w-full rounded-xl"
              >
                <LogIn className="mr-2 h-4 w-4" />
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