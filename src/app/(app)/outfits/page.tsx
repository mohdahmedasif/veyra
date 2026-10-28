import { MixMatch } from "@/components/MixMatch";
import { PageHeader } from "@/components/PageHeader";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function OutfitsPage() {
  const userId = await requireUserId();
  const items = await prisma.clothingItem.findMany({ where: { userId }, orderBy: { category: "asc" } });
  return (
    <div>
      <PageHeader eyebrow="Mix & Match" title="Compose a look" />
      <MixMatch items={items} />
    </div>
  );
}
