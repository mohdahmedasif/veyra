import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="font-serif text-2xl font-semibold tracking-wide text-ink">
      Veyra<span className="text-blush-400">.</span>
    </Link>
  );
}
