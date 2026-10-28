export default function Loading() {
  return (
    <div aria-busy className="space-y-6">
      <div className="skeleton h-10 w-56" />
      <div className="flex gap-2">{Array.from({ length: 5 }, (_, i) => <div key={i} className="skeleton h-9 w-20 rounded-full" />)}</div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => <div key={i} className="skeleton aspect-[3/4]" />)}
      </div>
    </div>
  );
}
