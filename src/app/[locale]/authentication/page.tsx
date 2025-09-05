import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Signin');
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
      <Heading size="h2">{t('title')}</Heading>
    </div>
  );
}
