import Link from "next/link";
import { NAV_LINKS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  className?: string;
};

export function NavLinks({ className }: NavLinksProps) {
  return (
    <nav className={cn("flex items-center gap-8", className)}>
      {NAV_LINKS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}