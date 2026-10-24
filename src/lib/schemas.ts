import { z } from "zod";

// ---------- Table insert/update validators (admin form input) ----------

// Safe image path/URL validator: accepts http(s) URLs or local root paths (/...)
// while strictly rejecting hostile schemes like javascript:, data:, vbscript:, etc.
export const isSafeImagePath = (v: string): boolean => {
  if (typeof v !== "string") return false;
  const s = v.trim();
  if (!s) return false;
  if (s.startsWith("/")) {
    return !s.startsWith("//") && !s.includes(":");
  }
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export const imagePathSchema = z.string().trim().refine(isSafeImagePath, {
  message: "Must be a valid http(s) URL or local path starting with /",
});

export const profileInsertSchema = z.object({
  name: z.string().min(1),
  bio: z.string().min(1),
  stats: z.record(z.string(), z.union([z.string(), z.number()])).default({}),
  roles: z.array(z.string()).default([]),
  resumeUrl: z
    .union([imagePathSchema, z.literal(""), z.null()])
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .optional(),
  avatarUrl: z
    .union([imagePathSchema, z.literal(""), z.null()])
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .optional(),
  heroTagline: z.string().nullable().optional(),
  sectionVisibility: z.record(z.string(), z.boolean()).default({}),
});

export const projectInsertSchema = z.object({
  repo: z
    .string()
    .min(1)
    .regex(/^[\w.-]+$/, "repo must be a GitHub slug, not a URL"),
  title: z.string().min(1),
  customBlurb: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative().default(0),
  hidden: z.boolean().default(false),
  coverImage: z
    .union([imagePathSchema, z.literal(""), z.null()])
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .optional(),
  screenshots: z.array(imagePathSchema).max(6).default([]),
  liveUrl: z
    .union([imagePathSchema, z.literal(""), z.null()])
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .optional(),
});

export const experienceInsertSchema = z.object({
  role: z.string().min(1),
  org: z.string().min(1),
  period: z.string().min(1),
  location: z.string().nullable().optional(),
  isCurrent: z.boolean().default(false),
  description: z.array(z.string()).default([]),
  order: z.number().int().nonnegative().default(0),
});

export const skillInsertSchema = z.object({
  name: z.string().min(1),
  iconPath: z.string().min(1),
  category: z.string().min(1),
  level: z.enum(["Expert", "Intermediate", "Beginner"]).nullable().optional(),
  order: z.number().int().nonnegative().default(0),
});

export const serviceInsertSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  order: z.number().int().nonnegative().default(0),
});

export const socialLinkInsertSchema = z.object({
  platform: z.string().min(1),
  url: z
    .string()
    .min(1)
    .transform((v) => {
      const t = v.trim();
      if (/^mailto:/i.test(t)) return t;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return `mailto:${t}`;
      if (/^https?:\/\//i.test(t)) return t;
      return `https://${t}`;
    })
    .pipe(
      z
        .string()
        .refine(
          (v) => /^https?:\/\/[^\s]+$/i.test(v) || /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(v),
          { message: "Must be a valid URL (https://...) or email" },
        ),
    ),
  username: z.string().nullable().optional(),
  order: z.number().int().nonnegative().default(0),
});

export const fundingLinkInsertSchema = z.object({
  label: z.string().min(1),
  url: z.httpUrl(),
  primary: z.boolean().default(false),
  order: z.number().int().nonnegative().default(0),
});

export const taglineInsertSchema = z.object({
  text: z.string().min(1),
  active: z.boolean().default(true),
  order: z.number().int().nonnegative().default(0),
});

export const faqInsertSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.number().int().nonnegative().default(0),
});

// Reorder payload shared by all sections
export const reorderSchema = z.object({
  items: z.array(z.object({ id: z.number().int(), order: z.number().int() })),
});

// ---------- GitHub REST API response ----------
// https://docs.github.com/en/rest/repos/repos#get-a-repository
export const githubRepoSchema = z.object({
  name: z.string(),
  full_name: z.string(),
  html_url: z.httpUrl(),
  description: z.string().nullable(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  open_issues_count: z.number(),
  topics: z.array(z.string()).default([]),
  fork: z.boolean(),
  archived: z.boolean(),
  pushed_at: z.string(),
});

export const githubRepoListSchema = z.array(githubRepoSchema);

// GitHub GraphQL user stats (single query: followers, owned public non-fork
// repos + their stars, and the years the user has contributed in).
export const githubUserStatsSchema = z.object({
  data: z.object({
    user: z
      .object({
        followers: z.object({ totalCount: z.number() }),
        repositories: z.object({
          totalCount: z.number(),
          nodes: z.array(z.object({ stargazerCount: z.number() })),
        }),
        contributionsCollection: z.object({
          contributionYears: z.array(z.number()),
        }),
      })
      .nullable(),
  }),
});

// ---------- Inferred types ----------
export type ProfileInput = z.infer<typeof profileInsertSchema>;
export type ProjectInput = z.infer<typeof projectInsertSchema>;
export type ExperienceInput = z.infer<typeof experienceInsertSchema>;
export type SkillInput = z.infer<typeof skillInsertSchema>;
export type ServiceInput = z.infer<typeof serviceInsertSchema>;
export type SocialLinkInput = z.infer<typeof socialLinkInsertSchema>;
export type FundingLinkInput = z.infer<typeof fundingLinkInsertSchema>;
export type TaglineInput = z.infer<typeof taglineInsertSchema>;
export type FaqInput = z.infer<typeof faqInsertSchema>;
export type ReorderInput = z.infer<typeof reorderSchema>;
export type GithubRepo = z.infer<typeof githubRepoSchema>;
export type GithubUserStatsResponse = z.infer<typeof githubUserStatsSchema>;
