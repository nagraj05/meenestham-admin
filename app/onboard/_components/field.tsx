import { Label } from "@/components/ui/label";

export const inp =
  "h-10 rounded-xl border-border/70 bg-muted/40 text-[13px] placeholder:text-muted-foreground/50 transition-all focus-visible:bg-background focus-visible:border-ring";

export const sel =
  "h-10 w-full rounded-xl border border-border/70 bg-muted/40 px-3 text-[13px] text-foreground outline-none transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

export function Field({
  id, label, required, error, wide, children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <Label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-bold tracking-widest uppercase text-foreground/60"
      >
        {label}
        {required && (
          <span className="ml-0.5 font-bold text-rose-500" aria-hidden="true">*</span>
        )}
      </Label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-rose-500">
          <svg className="size-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
            <path d="M6 3.5v3M6 8.5v.5" stroke="currentColor" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export function PanelHeader({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="mb-6 flex items-center gap-2.5">
      <span className="h-5 w-1 rounded-full" style={{ background: accent }} />
      <h2 className="text-[12px] font-bold tracking-widest uppercase text-foreground/50">
        {title}
      </h2>
    </div>
  );
}
