import { type FieldErrors } from "react-hook-form";
import { type OnboardFormValues } from "./schema";

export type TabId = "client" | "location" | "palette" | "pgrs" | "user";

export const TABS: { id: TabId; label: string; accent: string }[] = [
  { id: "client",   label: "Client Config", accent: "#6d28d9" },
  { id: "location", label: "Location",       accent: "#0ea5e9" },
  { id: "palette",  label: "Color Palette",  accent: "#10b981" },
  { id: "pgrs",     label: "PGRS",           accent: "#f59e0b" },
  { id: "user",     label: "User Account",   accent: "#ec4899" },
];

export function countTabErrors(id: TabId, errors: FieldErrors<OnboardFormValues>): number {
  switch (id) {
    case "client":
      return [
        errors.SClientKey, errors.TClientKey, errors.ConstituencyName,
        errors.ACKey, errors.ClientSC, errors.Theme,
      ].filter(Boolean).length;
    case "location":
      return [errors.StateKey, errors.State, errors.ECACKey].filter(Boolean).length;
    case "palette":
      return Object.keys(errors.Palette ?? {}).length;
    case "pgrs":
      return [
        errors.PGRSUserID, errors.PGRSPassword, errors.PGRSSrcID,
        errors.PGRSOfcID, errors.PGRSCreatedBy, errors.PGRSPush,
      ].filter(Boolean).length;
    case "user":
      return [
        errors.UserKey, errors.Email, errors.Name, errors.Contact, errors.Password,
      ].filter(Boolean).length;
  }
}
