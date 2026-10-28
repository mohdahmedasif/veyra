import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ProfilePicker } from "@/components/ProfilePicker";
import { prisma } from "@/lib/prisma";
import { getOwnerId } from "@/lib/session";

export default async function ProfilesPage({ searchParams }: { searchParams: { next?: string } }) {
  const ownerId = await getOwnerId();
  if (!ownerId) redirect("/pair");
  const profiles = await prisma.profile.findMany({
    where: { ownerId },
    orderBy: [{ isAdmin: "desc" }, { createdAt: "asc" }],
    select: { id: true, name: true, avatarColor: true, isAdmin: true },
  });
  const next = searchParams.next?.startsWith("/") && !searchParams.next.startsWith("//") ? searchParams.next : "/dashboard";
  return (
    <div className="glow pt-safe pb-safe flex min-h-dvh flex-col items-center px-4 py-10">
      <Logo href="/profiles" />
      <ProfilePicker profiles={profiles} next={next} />
    </div>
  );
}
