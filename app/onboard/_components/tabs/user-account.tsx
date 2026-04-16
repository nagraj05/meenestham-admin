import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { type OnboardFormValues } from "../../schema";
import { Field, PanelHeader, inp } from "../field";

type Props = {
  register: UseFormRegister<OnboardFormValues>;
  errors: FieldErrors<OnboardFormValues>;
};

export function UserAccountTab({ register, errors }: Props) {
  return (
    <>
      <PanelHeader title="User Account" accent="#ec4899" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <Field id="UserKey" label="User Key" required error={errors.UserKey?.message}>
          <Input id="UserKey" placeholder="e.g. u123" className={inp}
            aria-invalid={!!errors.UserKey} {...register("UserKey")} />
        </Field>

        <Field id="Name" label="Full Name" required error={errors.Name?.message}>
          <Input id="Name" placeholder="e.g. John Doe" className={inp}
            aria-invalid={!!errors.Name} {...register("Name")} />
        </Field>

        <Field id="Email" label="Email Address" required error={errors.Email?.message}>
          <Input id="Email" type="email" placeholder="e.g. example@example.com"
            className={inp} aria-invalid={!!errors.Email} {...register("Email")} />
        </Field>

        <Field id="Contact" label="Contact" required error={errors.Contact?.message}>
          <Input id="Contact" type="tel" placeholder="10-digit number" maxLength={10}
            className={inp} aria-invalid={!!errors.Contact} {...register("Contact")} />
        </Field>

        <Field id="Password" label="Password" required error={errors.Password?.message} wide>
          <Input id="Password" type="password" placeholder="Min 8 characters"
            className={inp} aria-invalid={!!errors.Password} {...register("Password")} />
        </Field>
      </div>
    </>
  );
}
