import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ProfilePicker } from "@/components/ProfilePicker";
import { prisma } from "@/lib/prisma";
import { getDevice } from "@/lib/session";

export default async function ProfilesPage(props: { searchParams: Promise<{ next?: string }> }) {
  const searchParams = await props.searchParams;
  if (!(await getDevice())) redirect("/pair");
  const profiles = await prisma.profile.findMany({ orderBy: { createdAt: "asc" }, select: { id: true, name: true, avatarColor: true } });
  const next = searchParams.next?.startsWith("/") && !searchParams.next.startsWith("//") ? searchParams.next : "/dashboard";
  return (
    <div className="glow pt-safe pb-safe flex min-h-dvh flex-col items-center px-4 py-10">
      <Logo href="/profiles" />
      <ProfilePicker profiles={profiles} next={next} />
    </div>
  );
}
