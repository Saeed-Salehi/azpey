"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/products", label: "لیست محصولات" },
  { href: "/products/new", label: "افزودن محصول" },
] as const;

export function ProductManageNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 rounded-xl border border-border bg-card p-1.5 shadow-sm">
      {links.map((link) => {
        const active =
          link.href === "/products"
            ? pathname === "/products"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
