import { render, screen } from '@testing-library/react';
import Page from '@/app/[locale]/authentication/page';

vi.mock('../../firebase.ts', () => ({
  auth: {},
  db: {},
  logInWithEmailAndPassword: vi.fn(),
  registerWithEmailAndPassword: vi.fn(),
  logout: vi.fn(),
  signOut: vi.fn(),
  saveUserRequest: vi.fn(),
  getUserRequests: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false],
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  Link: ({ children }: React.PropsWithChildren) => <span>{children}</span>,
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children }: React.PropsWithChildren) => (
    <button>{children}</button>
  ),
}));

vi.mock('@/components/ui/typography', () => ({
  Heading: ({ children }: React.PropsWithChildren) => <h2>{children}</h2>,
  Paragraph: ({ children }: React.PropsWithChildren) => <p>{children}</p>,
}));

vi.mock('@/components/loader', () => ({
  Loader: () => <div>Mock</div>,
}));

vi.mock('@/components/login-form', () => ({
  default: () => <form>Mock</form>,
}));

describe('Login Page', () => {
  it('renders login page correctly', () => {
    render(<Page />);

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();

    expect(screen.getByText('noAccount')).toBeInTheDocument();
    expect(screen.getByText('registerNow')).toBeInTheDocument();
  });
});
