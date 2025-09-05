import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heading } from '@/components/ui/typography';

export default function Page() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
      <Heading size="h1">{t('title')}</Heading>
      <div className="flex gap-4">
        <Button variant="default" asChild>
          <Link href={`/authentication`}>{t('signin')}</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href={`/registration`}>{t('signup')}</Link>
        </Button>
      </div>
      <div className="mt-30 flex gap-4">
        <Button variant="secondary" asChild>
          <Link href={`/rest-client`}>{t('restclient')}</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href={`/variables`}>{t('variables')}</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href={`/history`}>{t('history')}</Link>
        </Button>
      </div>
    </div>
  );
}
