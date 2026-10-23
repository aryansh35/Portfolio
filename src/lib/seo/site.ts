import { requirePublicEnv } from "@/lib/env";

export const SITE = {
  // Canonical production origin (https://aryanshgupta.runs-on.dev), env-driven with no
  // hardcoded fallback. Fails the build loudly on the server if missing; on the
  // client it never throws (would crash hydration) since Next inlines the value.
  url: requirePublicEnv("NEXT_PUBLIC_SITE_URL"),
  name: "Aryansh Gupta",
  title: "Aryansh Gupta - Software Developer & Web Engineer",
  description:
    "Aryansh Gupta is a Software Developer and DevSecOps enthusiast from India who builds secure, high-performance web products across modern front-end and back-end stacks.",
  handle: "@aryansh35",
  sameAs: ["https://github.com/aryansh35", "https://www.linkedin.com/in/aryansh-gupta"],
} as const;
