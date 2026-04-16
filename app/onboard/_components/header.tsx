import Image from "next/image";

export function OnboardHeader({ totalErrors }: { totalErrors: number }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/50 bg-white/70 px-4 py-3 backdrop-blur-md sm:px-8 sm:py-4 dark:bg-zinc-900/70">
      <div className="flex items-center gap-3">
        <Image
          src="/logos/logo-mobile.png"
          alt="Meenestham logo"
          width={36}
          height={36}
          className="shrink-0"
          priority
        />
        <div>
          <p className="text-[13px] font-bold tracking-tight text-foreground leading-none sm:text-[15px]">
            MEE NESTHAM Admin
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {totalErrors > 0 && (
          <span className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
            <span className="size-1.5 rounded-full bg-rose-500 animate-pulse inline-block" />
            {totalErrors} field{totalErrors !== 1 ? "s" : ""} incomplete
          </span>
        )}
        <p className="hidden text-[11px] text-muted-foreground sm:block">
          <span className="font-bold text-rose-500">*</span> required
        </p>
      </div>
    </header>
  );
}
