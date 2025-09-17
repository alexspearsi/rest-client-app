import RestClient from '@/components/rest-client/rest-client';
import ProtectedRoute from '@/components/protected-route';
import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('RestClient');

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
        <Heading size="h2">{t('title')}</Heading>
        <RestClient />
      </div>
    </ProtectedRoute>
  );
}
