import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { OutfitActions } from "@/components/OutfitActions";
import { OutfitCard } from "@/components/OutfitCard";
import { PageHeader } from "@/components/PageHeader";
import { prisma } from "@/lib/prisma";
import { requireProfile } from "@/lib/session";

export default async function FavoritesPage({ searchParams }: { searchParams: { all?: string } }) {
  const { profile } = await requireProfile();
  const profileId = profile.id;
  const showAll = searchParams.all === "1";
  const outfits = await prisma.outfit.findMany({
    where: { profileId, items: { some: {} }, ...(showAll ? {} : { favorites: { some: { profileId } } }) },
    include: { items: { include: { item: true }, orderBy: { position: "asc" } }, favorites: { where: { profileId } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <PageHeader eyebrow="Saved looks" title={showAll ? "All outfits" : "Favorites"}>
        <div className="inline-flex rounded-full border border-line bg-surface p-1">
          <Link href="/favorites" className={`rounded-full px-4 py-2 text-sm ${!showAll ? "bg-ink text-bg" : "text-muted"}`}>Favorites</Link>
          <Link href="/favorites?all=1" className={`rounded-full px-4 py-2 text-sm ${showAll ? "bg-ink text-bg" : "text-muted"}`}>All outfits</Link>
        </div>
      </PageHeader>
      {outfits.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {outfits.map((o) => (
            <OutfitCard
              key={o.id}
              name={o.name}
              score={o.score}
              reason={o.aiReason}
              items={o.items.map((i) => i.item)}
              footer={<OutfitActions id={o.id} favorite={o.favorites.length > 0} />}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="heart"
          title={showAll ? "No outfits saved" : "No favorites yet"}
          body="Save looks from Mix & Match or the AI Stylist, then heart the ones you love."
          href="/combos"
          cta="Find a look"
        />
      )}
    </div>
  );
}
