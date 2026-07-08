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

export function MobileMenu() {
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
              .map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}

            <SheetClose asChild>
              <Button asChild className="mt-4 rounded-full">
                <Link href="/appointments">Book Now</Link>
              </Button>
            </SheetClose>

            {isAuthenticated ? (
              <>
                <SheetClose asChild>
                  <Button asChild variant="ghost" className="rounded-full">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </SheetClose>
                <Button variant="ghost" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button variant="ghost" onClick={() => setLoginOpen(true)}>
                Login
              </Button>
            )}
          </nav>
        </SheetContent>
      </Sheet>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
