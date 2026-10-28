import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { OutfitActions } from "@/components/OutfitActions";
import { OutfitCard } from "@/components/OutfitCard";
import { PageHeader } from "@/components/PageHeader";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function FavoritesPage({ searchParams }: { searchParams: { all?: string } }) {
  const userId = await requireUserId();
  const showAll = searchParams.all === "1";
  const outfits = await prisma.outfit.findMany({
    where: { userId, ...(showAll ? {} : { favorites: { some: { userId } } }) },
    include: { items: { include: { item: true }, orderBy: { position: "asc" } }, favorites: { where: { userId } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <PageHeader eyebrow="Saved looks" title={showAll ? "All outfits" : "Favorites"}>
        <div className="flex gap-2">
          <Link href="/favorites" className={`chip ${!showAll ? "chip-active" : ""}`}>Favorites</Link>
          <Link href="/favorites?all=1" className={`chip ${showAll ? "chip-active" : ""}`}>All outfits</Link>
        </div>
      </PageHeader>
      {outfits.length ? (
        <div className="grid gap-6 md:grid-cols-3">
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
          title={showAll ? "No outfits saved" : "No favorites yet"}
          body="Save looks from Mix & Match or the AI Stylist, then heart the ones you love."
          href="/ai"
          cta="Find a look"
        />
      )}
    </div>
  );
}
