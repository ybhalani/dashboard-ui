import { render, screen } from '@testing-library/react';
import RightSection from "./right-section";

test("renders RightSection component", () => {
  render(<RightSection />);

  const imageText = screen.getByAltText(/Image for dashboard presentation/i);
  
  expect(imageText).toBeInTheDocument();
});