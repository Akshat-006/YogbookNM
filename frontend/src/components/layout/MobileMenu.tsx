"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants/navigation";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <nav className="mt-12 flex flex-col gap-6">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          <Button className="mt-4 rounded-full">
            Book Now
          </Button>

          <Button variant="ghost">
            Login
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}