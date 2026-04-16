"use client";

import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { onboardSchema, defaultValues, type OnboardFormValues } from "./schema";
import { TABS, countTabErrors, type TabId } from "./config";
import { OnboardHeader } from "./_components/header";
import { OnboardFooter } from "./_components/footer";
import { ClientConfigTab } from "./_components/tabs/client-config";
import { LocationTab }     from "./_components/tabs/location";
import { PaletteTab }      from "./_components/tabs/palette";
import { PGRSTab }         from "./_components/tabs/pgrs";
import { UserAccountTab }  from "./_components/tabs/user-account";

export default function OnboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("client");

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<OnboardFormValues>({
      resolver: zodResolver(onboardSchema),
      defaultValues,
      mode: "onChange",
    });

  const tabErrorCounts = Object.fromEntries(
    TABS.map((t) => [t.id, countTabErrors(t.id, errors)])
  ) as Record<TabId, number>;

  const totalErrors = Object.values(tabErrorCounts).reduce((a, b) => a + b, 0);
  const currentIndex = TABS.findIndex((t) => t.id === activeTab);
  const currentAccent = TABS[currentIndex]?.accent ?? "#6d28d9";

  function onSubmit(data: OnboardFormValues) {
    console.log("Onboard payload →", JSON.stringify(data, null, 2));
    toast.success("Onboard created successfully!", {
      description: "The client has been onboarded.",
    });
  }

  function onError(errs: FieldErrors<OnboardFormValues>) {
    const total = TABS.reduce((sum, t) => sum + countTabErrors(t.id, errs), 0);
    toast.error(
      `${total} field${total !== 1 ? "s" : ""} need${total === 1 ? "s" : ""} attention`,
      { description: "Please review all tabs and fill in the required fields." },
    );
    const first = TABS.find((t) => countTabErrors(t.id, errs) > 0);
    if (first) setActiveTab(first.id);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <OnboardHeader totalErrors={totalErrors} />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)} className="gap-0">

            {/* Tab strip */}
            <div className="mb-3 overflow-x-auto pb-1">
              <TabsList className="h-auto w-full gap-1 rounded-2xl bg-white/80 p-1.5 shadow-sm ring-1 ring-border/40 backdrop-blur-sm dark:bg-zinc-900/80">
                {TABS.map((tab) => {
                  const count = tabErrorCounts[tab.id];
                  const isActive = activeTab === tab.id;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="relative flex-1 rounded-xl px-3 py-2.5 text-[12px] font-semibold tracking-wide transition-all duration-200"
                      style={isActive ? { background: tab.accent, color: "#fff", boxShadow: `0 2px 12px ${tab.accent}55` } : {}}
                    >
                      {tab.label}
                      {count > 0 && (
                        <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                          {count}
                        </span>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Panel card */}
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
              <div className="h-[3px] w-full transition-all duration-300" style={{ background: currentAccent }} />
              <div className="px-8 py-7">
                <TabsContent value="client">
                  <ClientConfigTab register={register} errors={errors} />
                </TabsContent>
                <TabsContent value="location">
                  <LocationTab register={register} errors={errors} />
                </TabsContent>
                <TabsContent value="palette">
                  <PaletteTab register={register} errors={errors} />
                </TabsContent>
                <TabsContent value="pgrs">
                  <PGRSTab register={register} errors={errors} />
                </TabsContent>
                <TabsContent value="user">
                  <UserAccountTab register={register} errors={errors} />
                </TabsContent>
              </div>
            </div>

            <OnboardFooter
              currentIndex={currentIndex}
              activeTab={activeTab}
              tabErrorCounts={tabErrorCounts}
              isSubmitting={isSubmitting}
              onTabChange={setActiveTab}
            />

          </Tabs>
        </form>
      </main>
    </div>
  );
}
