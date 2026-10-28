import Link from "next/link";
import type { Category, Occasion, Prisma } from "@prisma/client";
import { DeleteItemButton } from "@/components/DeleteItemButton";
import { EmptyState } from "@/components/EmptyState";
import { ItemCard } from "@/components/ItemCard";
import { PageHeader } from "@/components/PageHeader";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CATEGORIES, OCCASIONS, label } from "@/types";

type Search = { category?: string; color?: string; occasion?: string };

export default async function WardrobePage({ searchParams }: { searchParams: Search }) {
  const userId = await requireUserId();
  const where: Prisma.ClothingItemWhereInput = { userId };
  if (searchParams.category) where.category = searchParams.category as Category;
  if (searchParams.color) where.color = searchParams.color;
  if (searchParams.occasion) where.occasions = { has: searchParams.occasion as Occasion };

  const [items, colors] = await Promise.all([
    prisma.clothingItem.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.clothingItem.findMany({ where: { userId }, distinct: ["color"], select: { color: true } }),
  ]);

  const href = (patch: Partial<Search>) => {
    const next = { ...searchParams, ...patch };
    const qs = new URLSearchParams(Object.entries(next).filter(([, v]) => v) as [string, string][]);
    return `/wardrobe${qs.size ? `?${qs}` : ""}`;
  };
  const Filter = ({ k, values }: { k: keyof Search; values: string[] }) => (
    <div className="flex flex-wrap gap-2">
      <Link href={href({ [k]: undefined })} className={`chip ${!searchParams[k] ? "chip-active" : ""}`}>All</Link>
      {values.map((v) => (
        <Link key={v} href={href({ [k]: v })} className={`chip ${searchParams[k] === v ? "chip-active" : ""}`}>{label(v)}</Link>
      ))}
    </div>
  );

  return (
    <div>
      <PageHeader eyebrow="Wardrobe" title="Your closet">
        <Link href="/wardrobe/new" className="btn-primary">+ Add piece</Link>
      </PageHeader>

      <div className="mb-8 space-y-3">
        <Filter k="category" values={CATEGORIES} />
        <Filter k="occasion" values={OCCASIONS} />
        {colors.length > 0 && <Filter k="color" values={colors.map((c) => c.color)} />}
      </div>

      {items.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} action={<DeleteItemButton id={item.id} />} />
          ))}
        </div>
      ) : (
        <EmptyState title="Nothing here yet" body="Photograph a piece you love and Veyra will start learning your style." href="/wardrobe/new" cta="Add your first piece" />
      )}
    </div>
  );
}
