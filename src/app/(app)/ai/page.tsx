import { AiStylist } from "@/components/AiStylist";
import { PageHeader } from "@/components/PageHeader";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AiPage() {
  const userId = await requireUserId();
  const items = await prisma.clothingItem.findMany({ where: { userId } });
  return (
    <div>
      <PageHeader eyebrow="AI Stylist" title="Looks, curated for you" />
      <AiStylist items={items} />
    </div>
  );
}
