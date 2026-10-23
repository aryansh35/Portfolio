import { db } from "@/db/client";
import { profile } from "@/db/schema";
import { updateProfile } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Panel, Field, Input, Textarea, SubmitButton } from "@/components/admin/ui";
import { AvatarField } from "@/components/admin/AvatarField";

export const dynamic = "force-dynamic";

export default async function ProfileEditor() {
  // Profile is a singleton — read the first row (its serial id can drift after
  // a reseed, so don't filter by a hardcoded id).
  const [row] = await db.select().from(profile).limit(1);

  async function action(formData: FormData) {
    "use server";
    // Roles feed the hero marquee. Accept comma- or newline-separated input,
    // trim, and drop blanks.
    const roles = String(formData.get("roles") ?? "")
      .split(/[\n,]/)
      .map((r) => r.trim())
      .filter(Boolean);
    // avatarUrl is deliberately absent: AvatarField owns that column and writes it on upload.
    // Zod drops the absent optional, so Drizzle leaves the column alone rather than nulling it.
    const currentStats = (row?.stats as Record<string, string | number>) ?? {};
    const stats: Record<string, string | number> = {
      ...currentStats,
    };
    for (let i = 1; i <= 4; i++) {
      const label = formData.get(`stat${i}_label`);
      const value = formData.get(`stat${i}_value`);
      const suffix = formData.get(`stat${i}_suffix`);
      if (label !== null) stats[`stat${i}_label`] = String(label).trim();
      if (value !== null && value !== "") stats[`stat${i}_value`] = Number(value);
      if (suffix !== null) stats[`stat${i}_suffix`] = String(suffix).trim();
    }

    await updateProfile({
      name: String(formData.get("name")),
      bio: String(formData.get("bio")),
      stats,
      roles,
      // Visibility is managed on the dashboard; preserve it unchanged on save.
      sectionVisibility: row?.sectionVisibility ?? {},
      resumeUrl: (formData.get("resumeUrl") as string) || null,
      heroTagline: (formData.get("heroTagline") as string) || null,
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader title="Profile" description="Your name, bio, roles, and links." />

      <Panel>
        <form action={action} className="flex flex-col gap-4">
          <AvatarField defaultValue={row?.avatarUrl ?? ""} />

          <Field label="Name">
            <Input name="name" defaultValue={row?.name} placeholder="Name" />
          </Field>
          <Field label="Bio">
            <Textarea name="bio" defaultValue={row?.bio} rows={4} placeholder="Bio" />
          </Field>
          <Field
            label="Roles"
            hint="Shown in the scrolling hero marquee. One per line, or comma-separated."
          >
            <Textarea
              name="roles"
              defaultValue={(row?.roles ?? []).join("\n")}
              rows={3}
              placeholder={
                "Software Development Engineer\nFull Stack Developer\nOpen Source Contributor"
              }
            />
          </Field>
          <Field label="Resume URL" hint="Full https URL to your resume/CV.">
            <Input name="resumeUrl" defaultValue={row?.resumeUrl ?? ""} placeholder="https://…" />
          </Field>
          <Field
            label="Hero tagline"
            hint="Short phrase shown beside the glowing dot above your name. Leave empty to hide."
          >
            <Input
              name="heroTagline"
              defaultValue={row?.heroTagline ?? ""}
              placeholder="AI-native engineering"
            />
          </Field>

          <div className="border-border border-t pt-4">
            <h4 className="text-foreground text-sm font-semibold">About Highlights & Stats</h4>
            <p className="text-muted mt-0.5 text-xs">
              The 4 highlight cards shown in the About section. Customize the number, suffix (e.g. +
              or %), and label.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => {
                const s = (row?.stats as Record<string, string | number>) ?? {};
                const defaultLabel =
                  s[`stat${i}_label`] ??
                  (i === 1
                    ? "Years of Experience"
                    : i === 2
                      ? "Projects Built"
                      : i === 3
                        ? "Certifications"
                        : "Current CGPA");
                const defaultValue =
                  s[`stat${i}_value`] ?? (i === 1 ? 2 : i === 2 ? 5 : i === 3 ? 15 : 8.9);
                const defaultSuffix = s[`stat${i}_suffix`] ?? (i === 4 ? "" : "+");

                return (
                  <div key={i} className="border-border/70 bg-background/60 rounded-xl border p-3">
                    <span className="text-muted text-xs font-medium">Card #{i}</span>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <Field label="Number">
                          <Input
                            type="number"
                            step="any"
                            name={`stat${i}_value`}
                            defaultValue={String(defaultValue)}
                            placeholder="e.g. 8.9"
                          />
                        </Field>
                      </div>
                      <div>
                        <Field label="Suffix">
                          <Input
                            name={`stat${i}_suffix`}
                            defaultValue={String(defaultSuffix)}
                            placeholder="+"
                          />
                        </Field>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Field label="Label">
                        <Input
                          name={`stat${i}_label`}
                          defaultValue={String(defaultLabel)}
                          placeholder="e.g. Problems Solved"
                        />
                      </Field>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <SubmitButton>Save changes</SubmitButton>
        </form>
      </Panel>
    </div>
  );
}
