import Link from "next/link";
import { Flower2 } from "lucide-react";

export function NavLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
        <Flower2 className="h-4.5 w-4.5" />
      </div>

      <span className="font-heading text-lg font-bold tracking-tight text-foreground">
        Yogbook
      </span>
    </Link>
  );
}