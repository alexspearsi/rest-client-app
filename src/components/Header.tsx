'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split('/');
  const currentLang = segments[1] || 'en';

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    segments[1] = newLang;
    router.push(segments.join('/'));
  };

  const handleNavigate = (path: string) => router.push(path);

  return (
    <header className="sticky top-0 flex items-center justify-between bg-gray-200 p-4 text-black">
      <div>
        <Link href={`/${currentLang}`}>{t('logo')}</Link>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={toggleLanguage}>
          {currentLang.toUpperCase()}
        </Button>
        <Button
          onClick={() => handleNavigate(`/${currentLang}/authentication`)}
        >
          {t('signin')}
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleNavigate(`/${currentLang}/registration`)}
        >
          {t('signup')}
        </Button>
      </div>
    </header>
  );
}
