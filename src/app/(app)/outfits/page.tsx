import { MixMatch } from "@/components/MixMatch";
import { PageHeader } from "@/components/PageHeader";
import { requireProfile } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function OutfitsPage() {
  const { profile } = await requireProfile();
  const items = await prisma.clothingItem.findMany({ where: { profileId: profile.id }, orderBy: { category: "asc" } });
  return (
    <div>
      <PageHeader eyebrow="Mix & Match" title="Compose a look" subtitle="Tap pieces to build an outfit — the score updates live." />
      <MixMatch items={items} />
    </div>
  );
}
