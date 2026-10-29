import Link from "next/link";
import type { Category, Occasion, Prisma } from "@prisma/client";
import { DeleteItemButton } from "@/components/DeleteItemButton";
import { EmptyState } from "@/components/EmptyState";
import { ItemCard } from "@/components/ItemCard";
import { PageHeader } from "@/components/PageHeader";
import { prisma } from "@/lib/prisma";
import { requireProfile } from "@/lib/session";
import { CATEGORIES, OCCASIONS, label } from "@/types";

type Search = { category?: string; color?: string; occasion?: string };

export default async function WardrobePage({ searchParams }: { searchParams: Search }) {
  const { profile } = await requireProfile();
  const where: Prisma.ClothingItemWhereInput = { profileId: profile.id };
  if (searchParams.category && CATEGORIES.includes(searchParams.category as Category)) where.category = searchParams.category as Category;
  if (searchParams.color) where.color = { equals: searchParams.color, mode: "insensitive" };
  if (searchParams.occasion && OCCASIONS.includes(searchParams.occasion as Occasion)) where.occasions = { has: searchParams.occasion as Occasion };

  const [items, colors, total] = await Promise.all([
    prisma.clothingItem.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.clothingItem.findMany({ where: { profileId: profile.id }, distinct: ["color"], select: { color: true } }),
    prisma.clothingItem.count({ where: { profileId: profile.id } }),
  ]);

  const href = (patch: Partial<Search>) => {
    const next = { ...searchParams, ...patch };
    const qs = new URLSearchParams(Object.entries(next).filter(([, v]) => v) as [string, string][]);
    return `/wardrobe${qs.size ? `?${qs}` : ""}`;
  };
  const Filter = ({ k, values, all }: { k: keyof Search; values: string[]; all: string }) => (
    <div className="scroll-row">
      <Link href={href({ [k]: undefined })} className={`chip ${!searchParams[k] ? "chip-active" : ""}`}>{all}</Link>
      {values.map((v) => (
        <Link key={v} href={href({ [k]: v })} className={`chip ${searchParams[k] === v ? "chip-active" : ""}`}>{label(v)}</Link>
      ))}
    </div>
  );
  const filtered = Boolean(searchParams.category || searchParams.color || searchParams.occasion);

  return (
    <div>
      <PageHeader eyebrow="Wardrobe" title="Your closet" subtitle={`${total} piece${total === 1 ? "" : "s"}${filtered ? ` · showing ${items.length}` : ""}`} />

      {total > 0 && (
        <div className="mb-6 space-y-2.5">
          <Filter k="category" values={CATEGORIES} all="All pieces" />
          <Filter k="occasion" values={OCCASIONS} all="Any occasion" />
          {colors.length > 1 && <Filter k="color" values={colors.map((c) => c.color)} all="Any color" />}
        </div>
      )}

      {items.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} action={<DeleteItemButton id={item.id} />} />
          ))}
        </div>
      ) : filtered ? (
        <EmptyState title="No matches" body="Nothing in your closet fits these filters yet." href="/wardrobe" cta="Clear filters" />
      ) : (
        <EmptyState icon="camera" title="Nothing here yet" body="Photograph a piece you love and Veyra will start learning your style." href="/wardrobe/new" cta="Add your first piece" />
      )}
    </div>
  );
}
