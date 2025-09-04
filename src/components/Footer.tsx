'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="flex items-center justify-between gap-4 bg-gray-200 p-4">
      <a href="https://github.com/" className="hover:underline">
        Github
      </a>
      <span>{new Date().getFullYear()}</span>
      <div>{t('logo')}</div>
    </footer>
  );
}
