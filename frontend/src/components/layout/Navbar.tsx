"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { NavLogo } from "./NavLogo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-4 z-50 px-4">
      <div
        className={`mx-auto flex h-[72px] max-w-7xl items-center justify-between rounded-full border bg-background/80 px-6 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "shadow-lg" : "shadow-none"
        }`}
      >
        <NavLogo />

        <NavLinks className="hidden lg:flex" />

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" className="rounded-full">
            Login
          </Button>

          <Button className="rounded-full px-6">
            Book Now
          </Button>
        </div>

        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}