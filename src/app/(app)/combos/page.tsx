import { CombosView } from "@/components/CombosView";
import { PageHeader } from "@/components/PageHeader";
import { resolveAi } from "@/lib/ai/config";
import { prisma } from "@/lib/prisma";
import { requireProfile } from "@/lib/session";

export default async function CombosPage() {
  const { profile } = await requireProfile();
  const [items, ai] = await Promise.all([prisma.clothingItem.findMany({ where: { profileId: profile.id } }), resolveAi()]);
  return (
    <div>
      <PageHeader eyebrow="Combos" title="Outfits from your closet" subtitle={items.length ? `Made from your ${items.length} pieces — tap a heart to save one.` : undefined} />
      <CombosView items={items} aiProvider={ai.complete ? ai.provider : null} />
    </div>
  );
}
