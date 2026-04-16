import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { type OnboardFormValues } from "../../schema";
import { Field, PanelHeader, inp, sel } from "../field";

type Props = {
  register: UseFormRegister<OnboardFormValues>;
  errors: FieldErrors<OnboardFormValues>;
};

export function PGRSTab({ register, errors }: Props) {
  return (
    <>
      <PanelHeader title="PGRS Configuration" accent="#f59e0b" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <Field id="PGRSUserID" label="PGRS User ID" required error={errors.PGRSUserID?.message}>
          <Input id="PGRSUserID" placeholder="e.g. user123" className={inp}
            aria-invalid={!!errors.PGRSUserID} {...register("PGRSUserID")} />
        </Field>

        <Field id="PGRSPassword" label="PGRS Password" required error={errors.PGRSPassword?.message}>
          <Input id="PGRSPassword" type="password" placeholder="Enter password"
            className={inp} aria-invalid={!!errors.PGRSPassword} {...register("PGRSPassword")} />
        </Field>

        <Field id="PGRSSrcID" label="PGRS Source ID" required error={errors.PGRSSrcID?.message}>
          <Input id="PGRSSrcID" placeholder="e.g. 20" className={inp}
            aria-invalid={!!errors.PGRSSrcID} {...register("PGRSSrcID")} />
        </Field>

        <Field id="PGRSOfcID" label="PGRS Office ID" required error={errors.PGRSOfcID?.message}>
          <Input id="PGRSOfcID" placeholder="e.g. 30" className={inp}
            aria-invalid={!!errors.PGRSOfcID} {...register("PGRSOfcID")} />
        </Field>

        <Field id="PGRSCreatedBy" label="PGRS Created By" required error={errors.PGRSCreatedBy?.message}>
          <Input id="PGRSCreatedBy" placeholder="e.g. 1" className={inp}
            aria-invalid={!!errors.PGRSCreatedBy} {...register("PGRSCreatedBy")} />
        </Field>

        <Field id="PGRSPush" label="PGRS Push" required error={errors.PGRSPush?.message}>
          <select id="PGRSPush" aria-invalid={!!errors.PGRSPush}
            className={sel} {...register("PGRSPush")}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </Field>
      </div>
    </>
  );
}
