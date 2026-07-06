"use client";

import { useState } from "react";
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

export function MobileMenu() {
  const [loginOpen, setLoginOpen] = useState(false);

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
            {navigation.map((item) => (
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
                <Link href="/appointments">
                  Book Now
                </Link>
              </Button>
            </SheetClose>

            <Button
              variant="ghost"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
      />
    </>
  );
}