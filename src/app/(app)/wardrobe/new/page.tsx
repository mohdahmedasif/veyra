import { PageHeader } from "@/components/PageHeader";
import { SnapCloset } from "@/components/SnapCloset";
import { resolveAi } from "@/lib/ai/config";
import { requireProfile } from "@/lib/session";

export default async function SnapPage() {
  const { ownerId } = await requireProfile();
  const ai = await resolveAi(ownerId);
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Add to closet" title="Snap your clothes" subtitle="Add as many pieces as you like — one item per photo." />
      <SnapCloset aiReady={Boolean(ai.complete)} />
    </div>
  );
}
