import { Heading } from './ui/typography';
import { useTranslations } from 'next-intl';
import RestClient from './rest-client/rest-client';

export default function RestclientComponent() {
  const t = useTranslations('RestClient');

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
      <Heading size="h2">{t('title')}</Heading>
      <RestClient />
    </div>
  );
}
