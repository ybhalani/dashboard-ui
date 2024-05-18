import { render, screen } from '@testing-library/react';
import NavBar from './navbar';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

test('renders navbar with correct links', () => {
  render(<NavBar />);
  
  const productLink = screen.getByText(/Product/i);
  const featuresLink = screen.getByText(/Features/i);
  const marketplaceLink = screen.getByText(/Marketplace/i);
  const companyLink = screen.getByText(/Company/i);
  
  expect(productLink).toBeInTheDocument();
  expect(featuresLink).toBeInTheDocument();
  expect(marketplaceLink).toBeInTheDocument();
  expect(companyLink).toBeInTheDocument();
});