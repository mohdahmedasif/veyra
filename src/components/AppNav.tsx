"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/wardrobe", label: "Wardrobe" },
  { href: "/outfits", label: "Mix & Match" },
  { href: "/ai", label: "AI Stylist" },
  { href: "/favorites", label: "Favorites" },
  { href: "/settings", label: "Profile" },
];

export function AppNav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-sand-100 bg-ivory/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
        <Logo href="/dashboard" />
        <nav className="flex flex-1 gap-1 overflow-x-auto">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition",
                path.startsWith(l.href) ? "bg-ink text-ivory" : "text-taupe-600 hover:bg-sand-50",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="hidden text-sm text-taupe-600 hover:text-ink sm:block">
          Sign out
        </button>
      </div>
    </header>
  );
}
