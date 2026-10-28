import { PageHeader } from "@/components/PageHeader";
import { ProfileForm } from "@/components/ProfileForm";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const userId = await requireUserId();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { name: true, email: true, stylePreferences: true } });
  return (
    <div className="max-w-xl">
      <PageHeader eyebrow="Profile" title="Your style profile" />
      <ProfileForm user={user} />
    </div>
  );
}
