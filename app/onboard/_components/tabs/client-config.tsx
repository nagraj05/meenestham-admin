import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { type OnboardFormValues } from "../../schema";
import { Field, PanelHeader, inp } from "../field";

type Props = {
  register: UseFormRegister<OnboardFormValues>;
  errors: FieldErrors<OnboardFormValues>;
};

export function ClientConfigTab({ register, errors }: Props) {
  return (
    <>
      <PanelHeader title="Client Configuration" accent="#6d28d9" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <Field id="SClientKey" label="S Client Key" required error={errors.SClientKey?.message}>
          <Input id="SClientKey" placeholder="e.g. 1" className={inp}
            aria-invalid={!!errors.SClientKey} {...register("SClientKey")} />
        </Field>

        <Field id="TClientKey" label="T Client Key" required error={errors.TClientKey?.message}>
          <Input id="TClientKey" placeholder="e.g. 102" className={inp}
            aria-invalid={!!errors.TClientKey} {...register("TClientKey")} />
        </Field>

        <Field id="ConstituencyName" label="Constituency Name" required
          error={errors.ConstituencyName?.message} wide>
          <Input id="ConstituencyName" placeholder="e.g. Example Constituency"
            className={inp} aria-invalid={!!errors.ConstituencyName}
            {...register("ConstituencyName")} />
        </Field>

        <Field id="ACKey" label="AC Key" required error={errors.ACKey?.message}>
          <Input id="ACKey" placeholder="e.g. 1" className={inp}
            aria-invalid={!!errors.ACKey} {...register("ACKey")} />
        </Field>

        <Field id="ClientSC" label="Client SC" required error={errors.ClientSC?.message}>
          <Input id="ClientSC" placeholder="e.g. EXC" maxLength={10} className={inp}
            aria-invalid={!!errors.ClientSC} {...register("ClientSC")} />
        </Field>

        <Field id="Theme" label="Theme" required error={errors.Theme?.message}>
          <Input id="Theme" placeholder="e.g. TDP" className={inp}
            aria-invalid={!!errors.Theme} {...register("Theme")} />
        </Field>
      </div>
    </>
  );
}
