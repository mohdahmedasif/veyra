import { AiStylist } from "@/components/AiStylist";
import { PageHeader } from "@/components/PageHeader";
import { requireProfile } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AiPage() {
  const { profile } = await requireProfile();
  const items = await prisma.clothingItem.findMany({ where: { profileId: profile.id } });
  return (
    <div>
      <PageHeader eyebrow="AI Stylist" title="Looks, curated for you" />
      <AiStylist items={items} />
    </div>
  );
}
