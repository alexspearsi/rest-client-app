'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/typography';
import { Loader } from '@/components/loader';
import LoginForm from '@/components/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
    <section>
      <div className="container mx-auto px-4 py-16 lg:px-20">
        <div className="mx-auto w-full max-w-xs space-y-8">
          <div className="space-y-2 text-center">
            <Heading size="h2">{t('title')}</Heading>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                {t('formTitle')}
              </CardTitle>
              <CardDescription>{t('formDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
          <p className="text-muted-foreground text-center text-sm">
            {t('noAccount')}
            <Button asChild variant="link" className="px-2 py-0">
              <Link href="/registration">{t('registerNow')}</Link>
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}
