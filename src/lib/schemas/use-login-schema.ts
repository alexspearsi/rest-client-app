import z from 'zod';
import { useTranslations } from 'next-intl';

export function useLoginSchema() {
  const t = useTranslations('LoginValidation');

  return z.object({
    email: z
      .string()
      .min(1, t('emailRequired'))
      .regex(z.regexes.email, t('invalidEmail')),

    password: z
      .string()
      .min(1, t('passwordRequired'))
      .min(8, t('passwordMinLength'))
      .regex(/\p{L}/u, t('mustContainLetter'))
      .regex(/\p{N}/u, t('mustContainDigit'))
      .regex(/[\p{S}\p{P}]/u, t('mustContainSpecial')),
  });
}

export type LoginSchema = z.infer<ReturnType<typeof useLoginSchema>>;
