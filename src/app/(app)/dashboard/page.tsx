import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { Icon } from "@/components/Icon";
import { ItemImage } from "@/components/ItemCard";
import { OutfitCard } from "@/components/OutfitCard";
import { prisma } from "@/lib/prisma";
import { requireProfile } from "@/lib/session";
import { label } from "@/types";

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

export default async function Dashboard() {
  const { profile } = await requireProfile();
  const profileId = profile.id;
  const [itemCount, outfitCount, favCount, byCategory, recent, newest] = await Promise.all([
    prisma.clothingItem.count({ where: { profileId } }),
    prisma.outfit.count({ where: { profileId } }),
    prisma.favoriteOutfit.count({ where: { profileId } }),
    prisma.clothingItem.groupBy({ by: ["category"], where: { profileId }, _count: { _all: true } }),
    prisma.outfit.findMany({
      where: { profileId },
      take: 3,
      orderBy: { createdAt: "desc" },
      include: { items: { include: { item: true }, orderBy: { position: "asc" } } },
    }),
    prisma.clothingItem.findMany({ where: { profileId }, take: 8, orderBy: { createdAt: "desc" } }),
  ]);

  const stats = [
    { label: "Pieces", value: itemCount, href: "/wardrobe" },
    { label: "Outfits", value: outfitCount, href: "/favorites?all=1" },
    { label: "Favorites", value: favCount, href: "/favorites" },
  ];

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="card glow relative overflow-hidden p-6 md:p-10">
        <p className="eyebrow">{greeting()}</p>
        <h1 className="mt-2 text-4xl leading-tight md:text-6xl">{profile.name.split(" ")[0]}, what are we wearing today?</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/ai" className="btn-accent"><Icon name="sparkle" size={18} /> Style me</Link>
          <Link href="/outfits" className="btn-ghost"><Icon name="layers" size={18} /> Mix & Match</Link>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3 md:gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-4 transition hover:-translate-y-0.5 md:p-6">
            <p className="text-xs text-muted md:text-sm">{s.label}</p>
            <p className="font-serif text-4xl md:text-5xl">{s.value}</p>
          </Link>
        ))}
      </section>

      {newest.length > 0 && (
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-2xl">Recently added</h2>
            <Link href="/wardrobe" className="text-sm text-muted hover:text-ink">See all →</Link>
          </div>
          <div className="scroll-row !flex-nowrap">
            {newest.map((i) => (
              <Link key={i.id} href="/wardrobe" className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden rounded-2xl border border-line md:w-36">
                <ItemImage src={i.imageUrl} alt={i.title} sizes="144px" />
              </Link>
            ))}
          </div>
          <div className="scroll-row mt-3">
            {byCategory.map((c) => (
              <Link key={c.category} href={`/wardrobe?category=${c.category}`} className="chip">
                {label(c.category)} · {c._count._all}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl">Recent looks</h2>
        {recent.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((o) => (
              <OutfitCard key={o.id} name={o.name} score={o.score} reason={o.aiReason} items={o.items.map((i) => i.item)} />
            ))}
          </div>
        ) : itemCount ? (
          <EmptyState icon="sparkle" title="No outfits yet" body="Let the AI Stylist compose your first looks from your closet." href="/ai" cta="Get suggestions" />
        ) : (
          <EmptyState icon="camera" title="Start your closet" body="Snap a few favourite pieces — Veyra takes it from there." href="/wardrobe/new" cta="Add your first piece" />
        )}
      </section>
    </div>
  );
}
