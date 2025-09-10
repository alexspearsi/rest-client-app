'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/typography';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Loader } from '@/components/loader';
import { Link } from '@/i18n/navigation';

export default function Page() {
  const t = useTranslations('HomePage');
  const [user, loading] = useAuthState(auth);

  const isLoadingUser = loading || (user && !user.displayName);

  return (
    <div className="flex h-[75vh] flex-col items-center justify-center gap-6">
      {isLoadingUser ? (
        <Loader />
      ) : user ? (
        <>
          <Heading size="h2">{`${t('title')}, ${user?.displayName}!`}</Heading>
          <div className="flex gap-4">
            <Button variant="secondary" asChild>
              <Link href="/rest-client">{t('restclient')}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/variables">{t('variables')}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/history">{t('history')}</Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <Heading size="h2">{t('title')!}</Heading>
          <div className="flex gap-4">
            <Button variant="default" asChild>
              <Link href="/authentication">{t('signin')}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/registration">{t('signup')}</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
