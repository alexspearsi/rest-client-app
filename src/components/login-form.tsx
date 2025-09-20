'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Lock, Mail } from 'lucide-react';
import { logInWithEmailAndPassword } from '@/firebase';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import ShowHideButton from './ui/show-hide-button';
import { LoginSchema, useLoginSchema } from '@/lib/schemas/use-login-schema';

export default function LoginForm() {
  const t = useTranslations('LoginForm');
  const tt = useTranslations('Notification');

  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = useLoginSchema();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogIn = useCallback(
    async ({ email, password }: LoginSchema) => {
      const id = toast.loading(tt('loggingIn'));

      try {
        await logInWithEmailAndPassword(email, password);
        toast.success(tt('loginSuccess'), { id });
      } catch {
        toast.error(tt('loginFailed'), { id });
      }
    },
    [tt],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogIn)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('emailLabel')} *</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('emailPlaceholder')}
                  type="text"
                  contentBefore={
                    <Mail className="text-muted-foreground h-4 w-4" />
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('passwordLabel')} *</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('passwordPlaceholder')}
                  type={showPassword ? 'text' : 'password'}
                  contentBefore={
                    <Lock className="text-muted-foreground h-4 w-4" />
                  }
                  contentAfter={
                    <ShowHideButton
                      onClick={() => setShowPassword(!showPassword)}
                      show={showPassword}
                      className="text-muted-foreground h-4 w-4"
                    />
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t('login')}
        </Button>
      </form>
    </Form>
  );
}
