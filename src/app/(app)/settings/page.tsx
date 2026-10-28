import Link from "next/link";
import clsx from "clsx";
import { cookies } from "next/headers";
import { Icon, type IconName } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { AiSettings } from "@/components/settings/AiSettings";
import { Appearance } from "@/components/settings/Appearance";
import { Devices } from "@/components/settings/Devices";
import { HouseholdProfiles } from "@/components/settings/HouseholdProfiles";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { DEFAULT_MODELS } from "@/lib/ai/config";
import { decrypt, mask, sha256 } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { DEVICE_COOKIE } from "@/lib/profile-token";
import { requireProfile } from "@/lib/session";

const TABS: { id: string; label: string; icon: IconName; admin?: boolean }[] = [
  { id: "profile", label: "My profile", icon: "user" },
  { id: "appearance", label: "Appearance", icon: "palette" },
  { id: "household", label: "Profiles & PINs", icon: "users", admin: true },
  { id: "devices", label: "Devices", icon: "device", admin: true },
  { id: "ai", label: "AI Stylist", icon: "sparkle", admin: true },
];

export default async function SettingsPage({ searchParams }: { searchParams: { tab?: string } }) {
  const { ownerId, profile } = await requireProfile();
  const tabs = TABS.filter((t) => !t.admin || profile.isAdmin);
  const tab = tabs.find((t) => t.id === searchParams.tab)?.id ?? "profile";

  let body: React.ReactNode;
  if (tab === "profile") body = <ProfileForm profile={{ name: profile.name, avatarColor: profile.avatarColor, stylePreferences: profile.stylePreferences }} />;
  else if (tab === "appearance") body = <Appearance />;
  else if (tab === "household") {
    const profiles = await prisma.profile.findMany({
      where: { ownerId },
      orderBy: [{ isAdmin: "desc" }, { createdAt: "asc" }],
      select: { id: true, name: true, avatarColor: true, isAdmin: true, lockedUntil: true, _count: { select: { items: true } } },
    });
    body = <HouseholdProfiles meId={profile.id} profiles={profiles.map((p) => ({ ...p, locked: Boolean(p.lockedUntil && p.lockedUntil > new Date()), items: p._count.items }))} />;
  } else if (tab === "devices") {
    const token = cookies().get(DEVICE_COOKIE)?.value;
    const currentHash = token ? sha256(token) : null;
    const devices = await prisma.device.findMany({ where: { ownerId, revokedAt: null }, orderBy: { lastSeenAt: "desc" } });
    body = <Devices devices={devices.map((d) => ({ id: d.id, name: d.name, lastSeenAt: d.lastSeenAt.toISOString(), createdAt: d.createdAt.toISOString(), current: d.tokenHash === currentHash }))} />;
  } else {
    const u = await prisma.user.findUniqueOrThrow({ where: { id: ownerId } });
    body = (
      <AiSettings
        initial={{
          provider: u.aiProvider,
          gemini: { key: mask(decrypt(u.geminiKeyEnc)), model: u.geminiModel || DEFAULT_MODELS.GEMINI, envFallback: Boolean(process.env.GEMINI_API_KEY) },
          openai: { key: mask(decrypt(u.openaiKeyEnc)), model: u.openaiModel || DEFAULT_MODELS.OPENAI, envFallback: Boolean(process.env.OPENAI_API_KEY) },
        }}
      />
    );
  }

  return (
    <div>
      <PageHeader eyebrow="Settings" title="Settings" />
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
        <nav className="scroll-row md:mx-0 md:flex-col md:flex-nowrap md:px-0">
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={`/settings?tab=${t.id}`}
              className={clsx(
                "flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-sm transition md:rounded-xl",
                tab === t.id ? "bg-ink text-bg" : "border border-line bg-surface text-muted hover:text-ink md:border-transparent md:bg-transparent",
              )}
            >
              <Icon name={t.icon} size={17} /> {t.label}
            </Link>
          ))}
        </nav>
        <div className="min-w-0 max-w-2xl animate-fade-up">{body}</div>
      </div>
    </div>
  );
}
