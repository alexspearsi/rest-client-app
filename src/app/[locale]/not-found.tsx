import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/typography';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import imageSrc from '../../../public/catPic.png';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto space-y-8 px-6 text-center lg:px-20">
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <span className="text-primary block text-7xl">4</span>
            <Image
              priority
              className="h-20 w-20"
              src={imageSrc}
              alt="REST CLient Interface"
            />
            <span className="text-primary block text-7xl">4</span>
          </div>
          <Heading size="h2">{t('title')}</Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {t('description')}
          </p>
        </div>
        <Button variant="default">
          <Link href="/">{t('goBackHome')}</Link>
        </Button>
      </div>
    </section>
  );
}
