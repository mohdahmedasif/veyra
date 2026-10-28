import Link from "next/link";
import { Logo } from "@/components/Logo";

const FEATURES = [
  { title: "Digital wardrobe", body: "Snap your pieces once. Veyra organises them by category, color, season and occasion." },
  { title: "Mix & Match studio", body: "Combine pieces on a clean canvas and see a live style-match score as you build." },
  { title: "AI Stylist", body: "Color theory meets your taste — get curated looks for work, weekends and nights out." },
  { title: "Saved looks", body: "Keep the outfits you love and plan the week ahead in seconds." },
];

export default function Landing() {
  return (
    <div className="bg-veyra-glow">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <Logo />
        <div className="flex gap-2">
          <Link href="/login" className="btn-ghost">Sign in</Link>
          <Link href="/signup" className="btn-primary">Get started</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">Your AI wardrobe assistant</p>
          <h1 className="mt-4 text-5xl leading-[1.05] md:text-7xl">Dress with intention, effortlessly.</h1>
          <p className="mt-6 max-w-md text-lg text-taupe-600">
            Veyra turns the clothes you already own into endless, beautifully composed outfits — styled by AI, curated by you.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/signup" className="btn-primary px-7 py-3">Build my wardrobe</Link>
            <Link href="/login" className="btn-ghost px-7 py-3">Try the demo</Link>
          </div>
        </div>
        <div className="relative">
          <div className="card grid grid-cols-2 gap-3 p-4">
            {["#F5EFE6", "#C19A6B", "#1C1C1C", "#D4AF37"].map((c, i) => (
              <div key={c} className="aspect-[3/4] rounded-2xl" style={{ background: `linear-gradient(160deg, ${c}, ${c}cc)`, opacity: 1 - i * 0.05 }} />
            ))}
          </div>
          <div className="card absolute -bottom-6 -left-6 px-5 py-4">
            <p className="text-xs text-taupe-400">Today&apos;s look</p>
            <p className="font-serif text-xl">Effortless Office · 92%</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-6">
              <h3 className="text-2xl">{f.title}</h3>
              <p className="mt-2 text-sm text-taupe-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-sand-100 py-8 text-center text-sm text-taupe-400">
        © {new Date().getFullYear()} Veyra. Style, intelligently.
      </footer>
    </div>
  );
}
