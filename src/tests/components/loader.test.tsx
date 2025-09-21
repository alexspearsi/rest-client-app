import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from '@/components/loader';

test('Loader renders', () => {
  render(<Loader />);

  const loaderIcon = screen.getByTestId('loader-icon');
  expect(loaderIcon).toBeInTheDocument();
});
