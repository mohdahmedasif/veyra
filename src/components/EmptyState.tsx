import Link from "next/link";

export function EmptyState({ title, body, href, cta }: { title: string; body: string; href?: string; cta?: string }) {
  return (
    <div className="card flex flex-col items-center px-6 py-16 text-center">
      <h3 className="text-2xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-taupe-600">{body}</p>
      {href && cta && (
        <Link href={href} className="btn-primary mt-6">
          {cta}
        </Link>
      )}
    </div>
  );
}
