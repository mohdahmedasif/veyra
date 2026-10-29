import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const FEATURES: { title: string; body: string; icon: IconName }[] = [
  { title: "Digital closet", body: "Snap your pieces once. Veyra organises them by category, color, season and occasion.", icon: "camera" },
  { title: "Mix & Match", body: "Build outfits on a clean canvas and see a live style-match score as you go.", icon: "layers" },
  { title: "AI Stylist", body: "Gemini, OpenAI or our color-theory engine curate looks for every plan.", icon: "sparkle" },
  { title: "Whole household", body: "No accounts or emails. Pair a device once with the household key, then everyone unlocks their profile with a PIN.", icon: "users" },
];

const LOOK = [
  { c: "#F5EFE6", label: "Silk blouse" },
  { c: "#C19A6B", label: "Wide-leg trousers" },
  { c: "#1C1C1C", label: "Block heels" },
  { c: "#D4AF37", label: "Gold hoops" },
];

export default function Landing() {
  return (
    <div className="glow min-h-dvh">
      <header className="pt-safe mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-5">
        <Logo />
        <div className="flex items-center gap-2">
          <span className="hidden sm:block"><ThemeToggle compact /></span>
          <Link href="/profiles" className="btn-ghost min-h-[40px] px-4">Open app</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-8 md:grid-cols-2 md:py-24">
        <div className="animate-fade-up">
          <p className="eyebrow">Your AI wardrobe assistant</p>
          <h1 className="mt-4 text-[3.2rem] leading-[0.98] md:text-7xl">Dress with intention, effortlessly.</h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Veyra turns the clothes you already own into endless, beautifully composed outfits — styled by AI, curated by you.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/pair" className="btn-primary px-7"><Icon name="key" size={16} /> Pair this device</Link>
            <Link href="/profiles" className="btn-ghost px-7">Already paired? Open</Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-md">
          <div className="card rotate-[-2deg] p-3">
            <div className="grid grid-cols-2 gap-2">
              {LOOK.map((l) => (
                <div key={l.label} className="flex aspect-[3/4] items-end rounded-2xl p-3" style={{ background: `linear-gradient(165deg, ${l.c}, ${l.c}d9)` }}>
                  <span className="rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-[#231A16] backdrop-blur">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card absolute -bottom-6 -left-2 flex items-center gap-3 px-4 py-3 shadow-lift sm:-left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent"><Icon name="sparkle" size={18} /></span>
            <div>
              <p className="text-xs text-muted">Today&apos;s look</p>
              <p className="font-serif text-lg leading-tight">Effortless Office · 92%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent"><Icon name={f.icon} size={20} /></span>
              <h3 className="text-2xl">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="pb-safe border-t border-line py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} Veyra. Style, intelligently.
      </footer>
    </div>
  );
}
