import { describe, expect, it } from "vitest";
import { isAllowedLogin } from "./auth-callbacks";

describe("isAllowedLogin", () => {
  it("allows the configured admin login (case-insensitive)", () => {
    expect(isAllowedLogin("aryansh35", "aryansh35")).toBe(true);
    expect(isAllowedLogin("Aryansh35", "aryansh35")).toBe(true);
  });
  it("rejects any other login", () => {
    expect(isAllowedLogin("someone-else", "aryansh35")).toBe(false);
  });
  it("rejects null/undefined login", () => {
    expect(isAllowedLogin(null, "aryansh35")).toBe(false);
    expect(isAllowedLogin(undefined, "aryansh35")).toBe(false);
  });
  it("rejects everyone when admin login is unset", () => {
    expect(isAllowedLogin("aryansh35", undefined)).toBe(false);
  });
});
