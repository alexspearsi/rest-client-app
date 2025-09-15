import z from 'zod';
import { useTranslations } from 'next-intl';

const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

export function useLoginSchema() {
  const t = useTranslations('LoginValidation');

  return z.object({
    email: z
      .string()
      .min(1, t('emailRequired'))
      .regex(EMAIL_REGEX, t('invalidEmail')),

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
