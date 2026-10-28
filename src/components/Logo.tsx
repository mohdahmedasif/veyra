import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="font-serif text-[1.65rem] font-semibold leading-none tracking-wide text-ink">
      Veyra<span className="text-accent">.</span>
    </Link>
  );
}
