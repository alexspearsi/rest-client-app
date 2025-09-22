import VariablesContent from '@/components/variables-content';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children }: React.PropsWithChildren) => <span>{children}</span>,
  useRouter: () => ({ replace: vi.fn() }),
}));

describe('Test Variables', () => {
  it('Should Render Variable components with some values', () => {
    render(<VariablesContent />);
    const addButton = screen.getByTestId('add-var-btn');
    const variable = screen.getByDisplayValue(/example/i);
    const value = screen.getByDisplayValue(/https:\/\//i);
    const checkbox = screen.getByRole('checkbox', { checked: true });

    expect(checkbox).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(variable).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it('Should Modify existed variable value', () => {
    render(<VariablesContent />);

    const value = screen.getByDisplayValue(/https:\/\//i);

    const text = 'Some random value';
    fireEvent.change(value, { target: { value: text } });

    if (value instanceof HTMLInputElement) {
      expect(value.value).toEqual(text);
    }
  });

  it('Should Modify existed variable name', () => {
    render(<VariablesContent />);

    const variable = screen.getByDisplayValue(/example/i);

    const text = 'Some random name';
    fireEvent.change(variable, { target: { value: text } });

    if (variable instanceof HTMLInputElement) {
      expect(variable.value).toEqual(text);
    }
  });

  it('Should Add new variable and get right number of variables', () => {
    render(<VariablesContent />);

    const addButton = screen.getByTestId('add-var-btn');

    fireEvent.click(addButton);

    const tableBody = screen.getByTestId('table-body');

    expect(tableBody).toBeInTheDocument();

    expect(tableBody.childNodes.length).toEqual(4);
  });
});
