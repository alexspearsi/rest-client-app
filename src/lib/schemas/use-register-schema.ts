import z from 'zod';
import { useTranslations } from 'next-intl';
import { useLoginSchema } from './use-login-schema';

export function useRegisterSchema() {
  const t = useTranslations('SignupValidation');

  return useLoginSchema().extend({
    name: z.string().min(1, t('nameRequired')),
  });
}

export type RegisterSchema = z.infer<ReturnType<typeof useRegisterSchema>>;
