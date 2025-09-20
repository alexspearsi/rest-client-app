import { Code, Globe, Users } from 'lucide-react';
import { Heading } from '../ui/typography';
import { Badge } from '../ui/badge';
import { useTranslations } from 'next-intl';

const technologies = [
  'React',
  'TypeScript',
  'Next.js',
  'Zustand',
  'Tailwind CSS',
];

export default function CourseSection() {
  const t = useTranslations('CourseSection');

  return (
    <section>
      <div className="container mx-auto px-6 py-16 lg:px-20">
        <div className="mb-12 text-center">
          <Heading size="h2" className="mb-4">
            {t('title')}
          </Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {t('description')}
          </p>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Heading size="h3" className="mb-6">
              {t('aboutSchoolTitle')}
            </Heading>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-secondary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                  <Code className="text-primary h-4 w-4" />
                </div>
                <div>
                  <Heading size="h4" className="mb-1">
                    {t('items.openToEveryone.title')}
                  </Heading>
                  <p className="text-muted-foreground text-base">
                    {t('items.openToEveryone.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-secondary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                  <Users className="text-primary h-4 w-4" />
                </div>
                <div>
                  <Heading size="h4" className="mb-1">
                    {t('items.openSource.title')}
                  </Heading>
                  <p className="text-muted-foreground text-base">
                    {t('items.openSource.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-secondary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                  <Globe className="text-primary h-4 w-4" />
                </div>
                <div>
                  <Heading size="h4" className="mb-1">
                    {t('items.teachForward.title')}
                  </Heading>
                  <p className="text-muted-foreground text-base">
                    {t('items.teachForward.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-2xl p-8">
            <Heading size="h3" className="mb-4">
              {t('aboutProjectTitle')}
            </Heading>

            <div className="mb-4 flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>

            <div>
              <p className="text-muted-foreground text-base">
                {t('aboutProjectDescription')}
              </p>
            </div>

            <div className="border-border mt-6 border-t pt-6">
              <p className="text-muted-foreground text-sm">{t('footerNote')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
