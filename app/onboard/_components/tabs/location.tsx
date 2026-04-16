import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { type OnboardFormValues } from "../../schema";
import { Field, PanelHeader, inp } from "../field";

type Props = {
  register: UseFormRegister<OnboardFormValues>;
  errors: FieldErrors<OnboardFormValues>;
};

export function LocationTab({ register, errors }: Props) {
  return (
    <>
      <PanelHeader title="Location" accent="#0ea5e9" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <Field id="StateKey" label="State Key" required error={errors.StateKey?.message}>
          <Input id="StateKey" placeholder="e.g. 28" className={inp}
            aria-invalid={!!errors.StateKey} {...register("StateKey")} />
        </Field>

        <Field id="State" label="State" required error={errors.State?.message}>
          <Input id="State" placeholder="e.g. AndhraPradesh" className={inp}
            aria-invalid={!!errors.State} {...register("State")} />
        </Field>

        <Field id="ECACKey" label="ECAC Key" required error={errors.ECACKey?.message}>
          <Input id="ECACKey" placeholder="Add Election Commission AC Code" className={inp}
            aria-invalid={!!errors.ECACKey} {...register("ECACKey")} />
        </Field>
      </div>
    </>
  );
}
