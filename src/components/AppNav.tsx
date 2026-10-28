"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import { Icon, type IconName } from "./Icon";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const DESKTOP: { href: string; label: string }[] = [
  { href: "/dashboard", label: "Home" },
  { href: "/wardrobe", label: "Wardrobe" },
  { href: "/outfits", label: "Mix & Match" },
  { href: "/ai", label: "AI Stylist" },
  { href: "/favorites", label: "Saved" },
];

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: "/dashboard", label: "Home", icon: "home" },
  { href: "/wardrobe", label: "Closet", icon: "hanger" },
  { href: "/outfits", label: "Mix", icon: "layers" },
  { href: "/ai", label: "Stylist", icon: "sparkle" },
];

export interface NavProfile {
  name: string;
  avatarColor: string;
  isAdmin: boolean;
}

export function AppNav({ profile }: { profile: NavProfile }) {
  const path = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const active = (href: string) => path === href || path.startsWith(href + "/");

  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    if (!menu) return;
    const close = (e: MouseEvent) => !menuRef.current?.contains(e.target as Node) && setMenu(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menu]);

  async function lock() {
    await fetch("/api/lock", { method: "POST" });
    router.replace("/profiles");
    router.refresh();
  }

  return (
    <>
      <header className="pt-safe sticky top-0 z-30 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 md:h-16">
          <Logo href="/dashboard" />
          <nav className="hidden flex-1 gap-1 md:flex">
            {DESKTOP.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx("rounded-full px-3.5 py-2 text-sm transition", active(l.href) ? "bg-ink text-bg" : "text-muted hover:bg-surface-2 hover:text-ink")}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <Link href="/wardrobe/new" className="btn-accent hidden min-h-[38px] px-4 md:inline-flex">
              <Icon name="plus" size={16} /> Add piece
            </Link>
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenu((m) => !m)} aria-label="Profile menu" aria-expanded={menu} className="flex items-center gap-2 rounded-full p-1 transition hover:bg-surface-2">
                <Avatar name={profile.name} color={profile.avatarColor} size={34} />
              </button>
              {menu && (
                <div className="absolute right-0 top-12 w-64 animate-fade-up rounded-2xl border border-line bg-surface p-2 shadow-lift">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar name={profile.name} color={profile.avatarColor} size={36} />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{profile.name}</p>
                      <p className="text-xs text-muted">{profile.isAdmin ? "Household admin" : "Member"}</p>
                    </div>
                  </div>
                  <div className="my-1 border-t border-line" />
                  <MenuLink href="/favorites" icon="heart" label="Saved looks" />
                  <MenuLink href="/settings" icon="settings" label="Settings" />
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-muted">Theme</span>
                    <ThemeToggle compact />
                  </div>
                  <div className="my-1 border-t border-line" />
                  <button onClick={() => router.push("/profiles")} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-surface-2">
                    <Icon name="users" size={18} /> Switch profile
                  </button>
                  <button onClick={lock} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-surface-2">
                    <Icon name="lock" size={18} /> Lock
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-line/70 bg-bg/90 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid h-16 max-w-md grid-cols-5 items-center px-2">
          {TABS.slice(0, 2).map((t) => <Tab key={t.href} {...t} active={active(t.href)} />)}
          <Link href="/wardrobe/new" aria-label="Add piece" className="mx-auto flex h-12 w-12 -translate-y-3 items-center justify-center rounded-full bg-accent text-accent-ink shadow-lift transition active:scale-95">
            <Icon name="plus" size={24} />
          </Link>
          {TABS.slice(2).map((t) => <Tab key={t.href} {...t} active={active(t.href)} />)}
        </div>
      </nav>
    </>
  );
}

function Tab({ href, label, icon, active }: { href: string; label: string; icon: IconName; active: boolean }) {
  return (
    <Link href={href} className={clsx("flex flex-col items-center gap-0.5 py-1 text-[11px] font-medium transition", active ? "text-ink" : "text-muted")}>
      <Icon name={icon} size={22} className={clsx(active && "text-accent")} />
      {label}
    </Link>
  );
}

function MenuLink({ href, icon, label }: { href: string; icon: IconName; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-surface-2">
      <Icon name={icon} size={18} /> {label}
    </Link>
  );
}
