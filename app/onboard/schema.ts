import { z } from "zod";

const hexColor = z
  .string()
  .min(1, "Color is required")
  .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (e.g. #F9F2E8)");

export const onboardSchema = z.object({
  SClientKey:       z.string().min(1, "S Client Key is required"),
  TClientKey:       z.string().min(1, "T Client Key is required"),
  ConstituencyName: z.string().min(2, "Must be at least 2 characters"),
  ACKey:            z.string().min(1, "AC Key is required"),
  ClientSC:         z.string().min(1, "Required").max(10, "Max 10 characters"),
  Theme:            z.string().min(1, "Theme is required"),

  Palette: z.object({
    secondary:             hexColor,
    secondarylight:        hexColor,
    secondarycontrasttext: hexColor,
    warningmain:           hexColor,
    warningcontrasttext:   hexColor,
    errormain:             hexColor,
  }),

  StateKey:      z.string().min(1, "State Key is required"),
  State:         z.string().min(1, "State is required"),
  ECACKey:       z.string().min(1, "ECAC Key is required"),

  PGRSUserID:    z.string().optional(),
  PGRSPassword:  z.string().optional(),
  PGRSSrcID:     z.string().optional(),
  PGRSOfcID:     z.string().optional(),
  PGRSCreatedBy: z.string().optional(),
  PGRSPush:      z.enum(["true", "false"]).optional(),

  Email:    z.string().min(1, "Email is required").email("Enter a valid email"),
  Name:     z.string().min(2, "Must be at least 2 characters"),
  Contact:  z.string().regex(/^[0-9]{10}$/, "Must be exactly 10 digits"),
  Password: z.string().min(8, "Must be at least 8 characters"),
});

export type OnboardFormValues = z.infer<typeof onboardSchema>;

export const defaultValues: OnboardFormValues = {
  SClientKey: "", TClientKey: "", ConstituencyName: "", ACKey: "",
  ClientSC: "", Theme: "",
  Palette: {
    secondary: "", secondarylight: "", secondarycontrasttext: "",
    warningmain: "", warningcontrasttext: "", errormain: "",
  },
  StateKey: "", State: "", ECACKey: "",
  PGRSUserID: "", PGRSPassword: "", PGRSSrcID: "", PGRSOfcID: "",
  PGRSCreatedBy: "", PGRSPush: "true",
  Email: "", Name: "", Contact: "", Password: "",
};
