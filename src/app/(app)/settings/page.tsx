import Link from "next/link";
import clsx from "clsx";
import { Icon, type IconName } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { AdminGate } from "@/components/settings/AdminGate";
import { AiSettings } from "@/components/settings/AiSettings";
import { Appearance } from "@/components/settings/Appearance";
import { Devices } from "@/components/settings/Devices";
import { HouseholdProfiles } from "@/components/settings/HouseholdProfiles";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { DEFAULT_MODELS, getHousehold } from "@/lib/ai/config";
import { decrypt, mask } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { hasAdmin, requireProfile } from "@/lib/session";

const TABS: { id: string; label: string; icon: IconName; admin?: boolean }[] = [
  { id: "profile", label: "My profile", icon: "user" },
  { id: "appearance", label: "Appearance", icon: "palette" },
  { id: "household", label: "Profiles & PINs", icon: "users", admin: true },
  { id: "devices", label: "Devices", icon: "device", admin: true },
  { id: "ai", label: "AI Stylist", icon: "sparkle", admin: true },
];

export default async function SettingsPage({ searchParams }: { searchParams: { tab?: string } }) {
  const { profile, device } = await requireProfile();
  const tab = TABS.find((t) => t.id === searchParams.tab) ?? TABS[0];
  const admin = hasAdmin(device.id);

  let body: React.ReactNode;
  if (tab.admin && !admin) body = <AdminGate />;
  else if (tab.id === "profile") body = <ProfileForm profile={{ name: profile.name, avatarColor: profile.avatarColor, stylePreferences: profile.stylePreferences }} />;
  else if (tab.id === "appearance") body = <Appearance />;
  else if (tab.id === "household") {
    const profiles = await prisma.profile.findMany({
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true, avatarColor: true, lockedUntil: true, _count: { select: { items: true } } },
    });
    body = <HouseholdProfiles meId={profile.id} profiles={profiles.map((p) => ({ id: p.id, name: p.name, avatarColor: p.avatarColor, locked: Boolean(p.lockedUntil && p.lockedUntil > new Date()), items: p._count.items }))} />;
  } else if (tab.id === "devices") {
    const devices = await prisma.device.findMany({ orderBy: { lastSeenAt: "desc" } });
    body = <Devices devices={devices.map((d) => ({ id: d.id, name: d.label, lastSeenAt: d.lastSeenAt.toISOString(), createdAt: d.createdAt.toISOString(), current: d.id === device.id }))} />;
  } else {
    const u = await getHousehold();
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
          {TABS.map((t, i) => (
            <div key={t.id} className="contents">
              {i === 2 && <p className="hidden px-4 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted md:block">Household {admin ? "· unlocked" : "· admin key"}</p>}
              <Link
                href={`/settings?tab=${t.id}`}
                className={clsx(
                  "flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-sm transition md:rounded-xl",
                  tab.id === t.id ? "bg-ink text-bg" : "border border-line bg-surface text-muted hover:text-ink md:border-transparent md:bg-transparent",
                )}
              >
                <Icon name={t.admin && !admin ? "lock" : t.icon} size={17} /> {t.label}
              </Link>
            </div>
          ))}
        </nav>
        <div className="min-w-0 max-w-2xl animate-fade-up">{body}</div>
      </div>
    </div>
  );
}
