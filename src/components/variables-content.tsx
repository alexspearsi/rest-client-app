import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';
import Variables from './variables/variables';

export default function VariablesContent() {
  const t = useTranslations('Variables');

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
      <Heading size="h2">{t('title')}</Heading>
      <Variables />
    </div>
  );
}
