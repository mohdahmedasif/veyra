import Link from "next/link";
import { OutfitCard } from "@/components/OutfitCard";
import { EmptyState } from "@/components/EmptyState";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { label } from "@/types";

export default async function Dashboard() {
  const userId = await requireUserId();
  const [user, itemCount, outfitCount, favCount, byCategory, recent] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { name: true } }),
    prisma.clothingItem.count({ where: { userId } }),
    prisma.outfit.count({ where: { userId } }),
    prisma.favoriteOutfit.count({ where: { userId } }),
    prisma.clothingItem.groupBy({ by: ["category"], where: { userId }, _count: true }),
    prisma.outfit.findMany({
      where: { userId },
      take: 3,
      orderBy: { createdAt: "desc" },
      include: { items: { include: { item: true }, orderBy: { position: "asc" } } },
    }),
  ]);

  const stats = [
    { label: "Pieces", value: itemCount, href: "/wardrobe" },
    { label: "Outfits", value: outfitCount, href: "/outfits" },
    { label: "Favorites", value: favCount, href: "/favorites" },
  ];

  return (
    <div className="space-y-10">
      <div className="card flex flex-wrap items-center justify-between gap-6 bg-veyra-glow p-8">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="mt-1 text-4xl">Good to see you, {user?.name?.split(" ")[0] ?? "stylist"}.</h1>
          <p className="mt-2 text-taupe-600">What are we wearing today?</p>
        </div>
        <div className="flex gap-3">
          <Link href="/wardrobe/new" className="btn-ghost">Add piece</Link>
          <Link href="/ai" className="btn-primary">Style me with AI</Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-6 transition hover:-translate-y-0.5">
            <p className="text-sm text-taupe-400">{s.label}</p>
            <p className="font-serif text-5xl">{s.value}</p>
          </Link>
        ))}
      </div>

      {byCategory.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {byCategory.map((c) => (
            <Link key={c.category} href={`/wardrobe?category=${c.category}`} className="chip hover:border-ink">
              {label(c.category)} · {c._count}
            </Link>
          ))}
        </div>
      )}

      <section>
        <h2 className="mb-4 text-2xl">Recent looks</h2>
        {recent.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {recent.map((o) => (
              <OutfitCard key={o.id} name={o.name} score={o.score} reason={o.aiReason} items={o.items.map((i) => i.item)} />
            ))}
          </div>
        ) : (
          <EmptyState title="No outfits yet" body="Add a few pieces, then let the AI Stylist compose your first looks." href="/ai" cta="Get suggestions" />
        )}
      </section>
    </div>
  );
}
