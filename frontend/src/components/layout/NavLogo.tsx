import Link from "next/link";
import { Flower2 } from "lucide-react";

export function NavLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition-opacity hover:opacity-80"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Flower2 className="h-5 w-5 text-primary" />
      </div>

      <span className="text-xl font-bold tracking-tight text-foreground">
        Yogbook
      </span>
    </Link>
  );
}