import BodyEditor from '@/components/rest-client/body-editor/body-editor';
import CodeSnippet from '@/components/rest-client/code-snippet/code-snippet';
import HeadersTable from '@/components/rest-client/headers-table/headers-table';
import ResponseViewer from '@/components/rest-client/response-viewer/response-viewer';
import RestclientComponent from '@/components/restclient-component';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children }: React.PropsWithChildren) => <span>{children}</span>,
  useRouter: () => ({ replace: vi.fn() }),
}));

describe('Test RestClient', () => {
  it('Should Render Request Editor', () => {
    const children = <></>;
    render(<RestclientComponent>{children}</RestclientComponent>);

    const urlInput = screen.getByDisplayValue(
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    const methodSelector = screen.getByDisplayValue(/get/i);

    expect(urlInput).toBeInTheDocument();
    expect(methodSelector).toBeInTheDocument();
  });

  it('Should Render Headers Section', async () => {
    render(<HeadersTable />);

    await waitFor(() => {
      const checkbox = screen.getByTestId('add-header-btn');
      expect(checkbox).toBeInTheDocument();

      const headerName = screen.getByDisplayValue(/custom-header/i);
      expect(headerName).toBeInTheDocument();

      const headerValue = screen.getByDisplayValue(/sample-value/i);
      expect(headerValue).toBeInTheDocument();
    });
  });

  it('Should Render Body Section', async () => {
    render(<BodyEditor />);

    await waitFor(() => {
      const editorType = screen.getByText(/json/i);
      expect(editorType).toBeInTheDocument();

      const codeEditor = screen.getByTestId('code-editor');
      expect(codeEditor).toBeInTheDocument();

      const prettyButton = screen.getByTestId('pretty-btn');
      expect(prettyButton).toBeInTheDocument();
    });
  });

  it('Should Render Code Snippet Section', async () => {
    render(<CodeSnippet />);

    await waitFor(() => {
      const snippetType = screen.getByText(/csharp/i);
      expect(snippetType).toBeInTheDocument();

      const snippet = screen.getByTestId('snippet');
      expect(snippet).toBeInTheDocument();
    });
  });

  it('Should Render Response Section', async () => {
    render(<ResponseViewer />);

    await waitFor(() => {
      const responseCode = screen.getByTestId('response-code');
      expect(responseCode).toBeInTheDocument();
    });
  });
});
