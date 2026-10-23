import { describe, expect, it } from "vitest";
import { ALLOWED_IMAGE_HOST_PATTERNS, isAllowedImageHost } from "../image-hosts";

describe("isAllowedImageHost", () => {
  it("accepts the Blob host uploads land on", () => {
    expect(isAllowedImageHost("https://abc123.public.blob.vercel-storage.com/avatar/x.webp")).toBe(
      true,
    );
  });

  it("accepts GitHub avatars and the site's own origin", () => {
    expect(isAllowedImageHost("https://avatars.githubusercontent.com/u/1")).toBe(true);
    expect(isAllowedImageHost("https://aryanshgupta.runs-on.dev/images/avatar.png")).toBe(true);
  });

  it("rejects a host next/image would refuse to optimise", () => {
    expect(isAllowedImageHost("https://i.imgur.com/a.png")).toBe(false);
    expect(isAllowedImageHost("https://evil.test/a.png")).toBe(false);
  });

  it("rejects a lookalike suffix rather than matching on substring", () => {
    expect(isAllowedImageHost("https://notaryanshgupta.runs-on.dev/a.png")).toBe(false);
  });

  it("accepts local paths starting with /", () => {
    expect(isAllowedImageHost("/uploads/avatar/x.webp")).toBe(true);
    expect(isAllowedImageHost("/images/avatar.png")).toBe(true);
  });

  it("rejects a non-URL and hostile paths", () => {
    expect(isAllowedImageHost("not a url")).toBe(false);
    expect(isAllowedImageHost("//evil.com/x.png")).toBe(false);
    expect(isAllowedImageHost("javascript:alert(1)")).toBe(false);
  });

  // Drift guard: the list above is a hand copy, so pin it to the real config.
  it("matches next.config.js remotePatterns exactly", async () => {
    const cfg = (await import("../../../next.config.js")) as unknown as {
      default: { images: { remotePatterns: { hostname: string }[] } };
    };
    const fromConfig = cfg.default.images.remotePatterns.map((p) => p.hostname).sort();
    expect([...ALLOWED_IMAGE_HOST_PATTERNS].sort()).toEqual(fromConfig);
  });
});
