import { Logo } from "@/components/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="glow pt-safe pb-safe flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <div className="mb-8"><Logo /></div>
      <div className="card w-full max-w-md animate-fade-up p-6 sm:p-8">{children}</div>
    </div>
  );
}
