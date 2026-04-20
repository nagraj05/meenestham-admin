"use client";

import { useRef, useState } from "react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { type OnboardFormValues } from "../../schema";
import { Field, PanelHeader, inp } from "../field";

type Props = {
  register: UseFormRegister<OnboardFormValues>;
  errors: FieldErrors<OnboardFormValues>;
};

type ImageKey = "MLAImage" | "CMImage" | "MinisterImage" | "StateImage" | "HandShakeImage" | "LogoImage";

type ImageState = { file: File | null; preview: string | null };

const ACCENT = "#f97316";

function ImageUpload({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: ImageState;
  onChange: (state: ImageState) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) return;
    const preview = URL.createObjectURL(file);
    onChange({ file, preview });
  }

  function clear(e: React.MouseEvent) {
    e.stopPropagation();
    if (value.preview) URL.revokeObjectURL(value.preview);
    onChange({ file: null, preview: null });
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold tracking-widest uppercase text-foreground/60">
        {label}
      </span>
      {description && (
        <span className="text-[11px] text-muted-foreground/60">{description}</span>
      )}

      <div
        role="button"
        tabIndex={0}
        aria-label={`Upload ${label}`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        className={[
          "relative flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-all duration-200",
          dragging
            ? "border-orange-400 bg-orange-50 dark:bg-orange-950/20"
            : "border-border/60 bg-muted/30 hover:border-orange-400/70 hover:bg-muted/50",
        ].join(" ")}
      >
        {value.preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.preview}
              alt={label}
              className="max-h-[110px] max-w-full rounded-lg object-contain"
            />
            <button
              type="button"
              onClick={clear}
              aria-label="Remove image"
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white shadow transition-opacity hover:bg-rose-600"
            >
              <X className="size-3.5" />
            </button>
          </>
        ) : (
          <>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: `${ACCENT}18` }}
            >
              <Upload className="size-5" style={{ color: ACCENT }} />
            </div>
            <div className="text-center">
              <p className="text-[12px] font-semibold" style={{ color: ACCENT }}>
                Click to upload
              </p>
              <p className="text-[11px] text-muted-foreground/60">or drag and drop</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground/50">PNG, JPG, WEBP</p>
            </div>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {value.file && (
        <p className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
          <ImageIcon className="size-3 shrink-0" />
          {value.file.name}
        </p>
      )}
    </div>
  );
}

const empty: ImageState = { file: null, preview: null };

export function ProfileTab({ register, errors }: Props) {
  const [images, setImages] = useState<Record<ImageKey, ImageState>>({
    MLAImage:       { ...empty },
    CMImage:        { ...empty },
    MinisterImage:  { ...empty },
    StateImage:     { ...empty },
    HandShakeImage: { ...empty },
    LogoImage:      { ...empty },
  });

  function setImage(key: ImageKey) {
    return (state: ImageState) => setImages((prev) => ({ ...prev, [key]: state }));
  }

  return (
    <>
      <PanelHeader title="Profile Customization" accent={ACCENT} />

      {/* MLA */}
      <section className="mb-8">
        <h3 className="mb-4 text-[11px] font-bold tracking-widest uppercase text-foreground/40">
          MLA
        </h3>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="sm:row-span-2">
            <ImageUpload
              label="MLA Image"
              value={images.MLAImage}
              onChange={setImage("MLAImage")}
            />
          </div>

          <Field id="MLAName" label="MLA Name" required error={errors.MLAName?.message}>
            <Input id="MLAName" placeholder="Enter MLA Name" className={inp}
              aria-invalid={!!errors.MLAName} {...register("MLAName")} />
          </Field>

          <Field id="MLALabel" label="MLA Label" required error={errors.MLALabel?.message}>
            <Input id="MLALabel" placeholder="Enter MLA Label" className={inp}
              aria-invalid={!!errors.MLALabel} {...register("MLALabel")} />
          </Field>

          <Field id="MLATagContent" label="MLA Tag" required error={errors.MLATagContent?.message} wide>
            <Input id="MLATagContent" placeholder="e.g. MLA, Visakhapatnam East" className={inp}
              aria-invalid={!!errors.MLATagContent} {...register("MLATagContent")} />
          </Field>
        </div>
      </section>

      {/* CM */}
      <section className="mb-8">
        <h3 className="mb-4 text-[11px] font-bold tracking-widest uppercase text-foreground/40">
          Chief Minister
        </h3>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="sm:row-span-2">
            <ImageUpload
              label="CM Image"
              value={images.CMImage}
              onChange={setImage("CMImage")}
            />
          </div>

          <Field id="CMLabel" label="CM Label" required error={errors.CMLabel?.message}>
            <Input id="CMLabel" placeholder="e.g. Chief Minister Name" className={inp}
              aria-invalid={!!errors.CMLabel} {...register("CMLabel")} />
          </Field>

          <Field id="CMTagContent" label="CM Tag" required error={errors.CMTagContent?.message}>
            <Input id="CMTagContent" placeholder="e.g. Chief Minister, Andhra Pradesh" className={inp}
              aria-invalid={!!errors.CMTagContent} {...register("CMTagContent")} />
          </Field>
        </div>
      </section>

      {/* Minister */}
      <section className="mb-8">
        <h3 className="mb-4 text-[11px] font-bold tracking-widest uppercase text-foreground/40">
          Cabinet Minister
        </h3>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="sm:row-span-2">
            <ImageUpload
              label="Minister Image"
              value={images.MinisterImage}
              onChange={setImage("MinisterImage")}
            />
          </div>

          <Field id="MinisterLabel" label="Minister Label" required error={errors.MinisterLabel?.message}>
            <Input id="MinisterLabel" placeholder="e.g. Minister Name" className={inp}
              aria-invalid={!!errors.MinisterLabel} {...register("MinisterLabel")} />
          </Field>

          <Field id="MinisterTagContent" label="Minister Tag" required error={errors.MinisterTagContent?.message}>
            <Input id="MinisterTagContent" placeholder="e.g. Cabinet Minister" className={inp}
              aria-invalid={!!errors.MinisterTagContent} {...register("MinisterTagContent")} />
          </Field>
        </div>
      </section>

      {/* State */}
      <section className="mb-8">
        <h3 className="mb-4 text-[11px] font-bold tracking-widest uppercase text-foreground/40">
          State
        </h3>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="sm:row-span-2">
            <ImageUpload
              label="State Image"
              value={images.StateImage}
              onChange={setImage("StateImage")}
            />
          </div>

          <Field id="StateLabel" label="State Label" required error={errors.StateLabel?.message}>
            <Input id="StateLabel" placeholder="e.g. Andhra Pradesh" className={inp}
              aria-invalid={!!errors.StateLabel} {...register("StateLabel")} />
          </Field>

          <Field id="StateTagContent" label="State Tag" required error={errors.StateTagContent?.message}>
            <Input id="StateTagContent" placeholder="e.g. State Emblem" className={inp}
              aria-invalid={!!errors.StateTagContent} {...register("StateTagContent")} />
          </Field>
        </div>
      </section>

      {/* Handshake & Logo */}
      <section>
        <h3 className="mb-4 text-[11px] font-bold tracking-widest uppercase text-foreground/40">
          Branding
        </h3>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <ImageUpload
            label="Handshake Image"
            value={images.HandShakeImage}
            onChange={setImage("HandShakeImage")}
          />
          <ImageUpload
            label="Logo Image"
            value={images.LogoImage}
            onChange={setImage("LogoImage")}
          />
        </div>
      </section>
    </>
  );
}
