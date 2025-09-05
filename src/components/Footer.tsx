import { useTranslations } from 'next-intl';
import { Button } from './ui/button';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-background flex items-center justify-between gap-4 border-t-2 p-4 text-sm font-semibold">
      <Button asChild size="none" variant="link">
        <a href="https://github.com/">Github</a>
      </Button>
      <span>{new Date().getFullYear()}</span>
      <div>{t('logo')}</div>
    </footer>
  );
}
