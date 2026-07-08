"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { NavLogo } from "./NavLogo";

import { LoginDialog } from "@/features/auth/components/LoginDialog";
import { logout } from "@/lib/logout";

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;
  return (
    <button
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header className="sticky top-4 z-50 px-4">
        <div
          className={`mx-auto flex h-[68px] max-w-7xl items-center justify-between rounded-full border border-border/60 bg-background/85 px-5 backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? "shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-border"
              : "shadow-none"
          }`}
        >
          <NavLogo />

          <NavLinks />

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className="rounded-full text-sm font-medium"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full text-sm font-medium text-muted-foreground"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="rounded-full text-sm font-medium"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>

                <Button
                  asChild
                  className="rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
                >
                  <Link href="/appointments">Book Now</Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </header>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
      />
    </>
  );
}