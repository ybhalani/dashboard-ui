import {render, screen} from '@testing-library/react';
import RightSection from "./right-section";

test("renders RightSection component", () => {
    render(<RightSection altText={'Image for dashboard presentation'} ariaLabel={'Dashboard illustration'}
                         illustrationSrc={'../public/illustration.svg'}/>);

  const imageText = screen.getByAltText(/Image for dashboard presentation/i);
  
  expect(imageText).toBeInTheDocument();
});