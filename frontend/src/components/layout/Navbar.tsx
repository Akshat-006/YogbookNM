"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { NavLogo } from "./NavLogo";

import { LoginDialog } from "@/features/auth/components/LoginDialog";
import { logout } from "@/lib/logout";

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
          className={`mx-auto flex h-[72px] max-w-7xl items-center justify-between rounded-full border bg-background/80 px-6 backdrop-blur-xl transition-all duration-300 ${
            scrolled ? "shadow-lg" : "shadow-none"
          }`}
        >
          <NavLogo />

          <NavLinks />

          <div className="hidden items-center gap-3 lg:flex">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" className="rounded-full" onClick={() => (window.location.href = "/dashboard")}>Dashboard</Button>
                <Button variant="ghost" className="rounded-full" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>

                <Button
                  asChild
                  className="rounded-full px-6"
                >
                  <Link href="/appointments">
                    Book Now
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="lg:hidden">
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