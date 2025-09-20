'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/typography';
import { Loader } from '@/components/loader';
import RegisterForm from '@/components/register-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Page() {
  const t = useTranslations('Signup');

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
    <div className="flex h-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-xs">
        <div className="space-y-8">
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
              <RegisterForm />
            </CardContent>
          </Card>
          <p className="text-muted-foreground text-center text-sm">
            {t('haveAccount')}
            <Button asChild variant="link" className="px-2 py-0">
              <Link href="/authentication">{t('loginNow')}</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
