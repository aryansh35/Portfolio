import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders an svg with accessible name matching /aryansh gupta/i", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: /aryansh gupta/i })).toBeInTheDocument();
  });

  it("renders wordmark 'aryansh35' when withWordmark is true", () => {
    render(<Logo withWordmark />);
    expect(screen.getByText("aryansh35")).toBeInTheDocument();
  });

  it("does NOT render wordmark by default", () => {
    render(<Logo />);
    expect(screen.queryByText("aryansh35")).not.toBeInTheDocument();
  });
});
