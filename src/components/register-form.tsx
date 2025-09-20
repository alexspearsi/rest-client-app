'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/i18n/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Lock, Mail, User } from 'lucide-react';
import { registerWithEmailAndPassword } from '@/firebase';
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
import {
  RegisterSchema,
  useRegisterSchema,
} from '@/lib/schemas/use-register-schema';

export default function RegisterForm() {
  const t = useTranslations('SignupForm');
  const tt = useTranslations('Notification');

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const registerSchema = useRegisterSchema();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSignUp = useCallback(
    async ({ name, email, password }: RegisterSchema) => {
      const id = toast.loading(tt('creatingAccount'));

      try {
        await registerWithEmailAndPassword(name, email, password);
        toast.success(tt('signupSuccess'), { id });
        router.replace('/');
      } catch {
        toast.error(tt('signupFailed'), { id });
      }
    },
    [tt, router],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nameLabel')} *</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('namePlaceholder')}
                  type="text"
                  contentBefore={
                    <User className="text-muted-foreground h-4 w-4" />
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
          {t('signup')}
        </Button>
      </form>
    </Form>
  );
}
