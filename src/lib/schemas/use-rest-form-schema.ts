import { methods } from '@/components/rest-client/request-editor/method-selector/method-selector';
import { useTranslations } from 'next-intl';
import z from 'zod';

export function useRestFormSchema() {
  const t = useTranslations('RestClient');

  return z.object({
    method: z.enum(methods, { error: t('methodError') }),
    url: z.url({
      protocol: /^https?$/,
      hostname: z.regexes.domain,
      error: t('urlError'),
    }),
  });
}

export type restFormSchemaType = z.infer<ReturnType<typeof useRestFormSchema>>;
