export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -start-32 top-1/4 size-[28rem] rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -end-24 bottom-0 size-[22rem] rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-900/20"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-4 py-10 sm:px-6">
        {children}
      </div>
    </div>
  );
}
