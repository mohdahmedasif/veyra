import { AppNav } from "@/components/AppNav";
import { requireProfile } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireProfile();
  return (
    <>
      <AppNav profile={{ name: profile.name, avatarColor: profile.avatarColor, isAdmin: profile.isAdmin }} />
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-6 md:pb-16 md:pt-10">{children}</main>
    </>
  );
}
