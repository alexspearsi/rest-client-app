import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@messages/en.json';
import Footer from '@/components/Footer';

test('Footer renders', () => {
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <Footer />
    </NextIntlClientProvider>,
  );

  const githubLink = screen.getByText('Github');
  expect(githubLink).toBeTruthy();
});
