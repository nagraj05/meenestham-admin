import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { type OnboardFormValues } from "../../schema";
import { Field, PanelHeader, inp } from "../field";

const PALETTE_FIELDS = [
  { key: "secondary",             label: "Secondary",               eg: "#f9f2e8" },
  { key: "secondarylight",        label: "Secondary Light",         eg: "#EFDC83" },
  { key: "secondarycontrasttext", label: "Secondary Contrast Text", eg: "#202020" },
  { key: "warningmain",           label: "Warning Main",            eg: "#FFA227" },
  { key: "warningcontrasttext",   label: "Warning Contrast Text",   eg: "#FFFFFF" },
  { key: "errormain",             label: "Error Main",              eg: "#EE3924" },
] as const;

type Props = {
  register: UseFormRegister<OnboardFormValues>;
  errors: FieldErrors<OnboardFormValues>;
};

export function PaletteTab({ register, errors }: Props) {
  return (
    <>
      <PanelHeader title="Color Palette" accent="#10b981" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {PALETTE_FIELDS.map(({ key, label, eg }) => (
          <Field
            key={key}
            id={`Palette.${key}`}
            label={label}
            required
            error={errors.Palette?.[key]?.message}
          >
            <div className="relative flex items-center">
              <Input
                id={`Palette.${key}`}
                placeholder={eg}
                className={`${inp} pl-10`}
                aria-invalid={!!errors.Palette?.[key]}
                {...register(`Palette.${key}`)}
              />
              <span className="pointer-events-none absolute left-2.5 size-5 rounded-md border border-border/50 bg-muted" />
            </div>
          </Field>
        ))}
      </div>
    </>
  );
}
