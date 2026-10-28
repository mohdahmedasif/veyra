import Link from "next/link";
import { Icon, type IconName } from "./Icon";

export function EmptyState({ title, body, href, cta, icon = "hanger" }: { title: string; body: string; href?: string; cta?: string; icon?: IconName }) {
  return (
    <div className="card glow flex flex-col items-center px-6 py-14 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon name={icon} size={26} />
      </span>
      <h3 className="text-2xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{body}</p>
      {href && cta && (
        <Link href={href} className="btn-primary mt-6">
          {cta}
        </Link>
      )}
    </div>
  );
}
