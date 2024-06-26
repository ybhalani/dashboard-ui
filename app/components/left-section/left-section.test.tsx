import React from "react";
import { render } from "@testing-library/react";
import LeftSection from "./left-section";

describe("LeftSection", () => {
  it("renders without error", () => {
    render(<LeftSection />);
  });

  it("displays the correct heading", () => {
    const { getByText } = render(<LeftSection />);
    const headingElement = getByText("A better way to");
    expect(headingElement).toBeInTheDocument();
  });

  it("displays the correct description", () => {
    const { getByText } = render(<LeftSection />);
    const descriptionElement = getByText(
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat."
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the email input field", () => {
    const { getByPlaceholderText } = render(<LeftSection />);
    const emailInput = getByPlaceholderText("Enter your email");
    expect(emailInput).toBeInTheDocument();
  });

  it("renders the start free trial button", () => {
    const { getByText } = render(<LeftSection />);
    const startButton = getByText("Start free trial");
    expect(startButton).toBeInTheDocument();
  });
});