/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

it("App Router: Works with Server Components", () => {
  render(<Page />);
  expect(screen.getByText("A better way to")).toBeInTheDocument();
});
