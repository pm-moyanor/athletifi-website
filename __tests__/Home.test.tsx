import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Custom404 from '@/components/common/Custom404';

describe('ContactForm', () => {
  it('renders a heading', () => {
    render(<Custom404 />); // ARRANGE

    const heading = screen.getByRole('heading', { level: 2 }); // ACT

    expect(heading).toBeInTheDocument(); // ASSERT
  });
});
