import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { Icon } from "@/components/Icon";
import { ItemImage } from "@/components/ItemCard";
import { OutfitCard } from "@/components/OutfitCard";
import { prisma } from "@/lib/prisma";
import { generateOutfits } from "@/lib/style-engine";
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
      where: { profileId, items: { some: {} } },
      take: 3,
      orderBy: { createdAt: "desc" },
      include: { items: { include: { item: true }, orderBy: { position: "asc" } } },
    }),
    prisma.clothingItem.findMany({ where: { profileId }, orderBy: { createdAt: "desc" } }),
  ]);
  const allItems = newest;
  const byId = new Map(allItems.map((i) => [i.id, i]));
  const todays = generateOutfits(allItems, { count: 3 });

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
          <Link href="/wardrobe/new" className="btn-accent"><Icon name="camera" size={18} /> Snap clothes</Link>
          <Link href="/combos" className="btn-ghost"><Icon name="sparkle" size={18} /> See combos</Link>
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
            <Link href="/wardrobe" className="-my-2 py-2 text-sm text-muted hover:text-ink">See all →</Link>
          </div>
          <div className="scroll-row !flex-nowrap md:!mx-0 md:grid md:grid-cols-8 md:!px-0">
            {newest.slice(0, 8).map((i) => (
              <Link key={i.id} href="/wardrobe" className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden rounded-2xl border border-line bg-photo md:w-auto">
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

      {todays.length > 0 && (
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-2xl">Today&apos;s combos</h2>
            <Link href="/combos" className="-my-2 py-2 text-sm text-muted hover:text-ink">All combos →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {todays.map((s) => (
              <OutfitCard key={s.itemIds.join()} name={s.name} score={s.score} reason={s.reason} items={s.itemIds.map((id) => byId.get(id)!).filter(Boolean)} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl">Saved looks</h2>
        {recent.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((o) => (
              <OutfitCard key={o.id} name={o.name} score={o.score} reason={o.aiReason} items={o.items.map((i) => i.item)} />
            ))}
          </div>
        ) : itemCount ? (
          <EmptyState icon="heart" title="No saved looks yet" body="Open Combos and tap the heart on the outfits you love." href="/combos" cta="See combos" />
        ) : (
          <EmptyState icon="camera" title="Start your closet" body="Snap your shirts, pants and dresses — Veyra makes the outfits." href="/wardrobe/new" cta="Snap clothes" />
        )}
      </section>
    </div>
  );
}
