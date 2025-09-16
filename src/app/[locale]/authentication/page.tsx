'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Heading, Paragraph } from '@/components/ui/typography';
import { Loader } from '@/components/loader';
import LoginForm from '@/components/login-form';

export default function Page() {
  const t = useTranslations('Login');

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="space-y-10">
          <div className="space-y-2 text-center">
            <Heading size="h2">{t('title')}</Heading>
            <Paragraph variant="muted">{t('description')}</Paragraph>
          </div>

          <div className="space-y-6">
            <LoginForm />
            <p className="text-muted-foreground text-center text-sm">
              {t('noAccount')}
              <Button asChild variant="link" className="px-2 py-0">
                <Link href="/registration">{t('registerNow')}</Link>
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
