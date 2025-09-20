import { Globe, Shield, Zap } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Heading } from '../ui/typography';
import { useTranslations } from 'next-intl';

export default function FeaturesSection() {
  const t = useTranslations('FeaturesSection');

  const content = [
    {
      title: t('features.lightningFast.title'),
      description: t('features.lightningFast.description'),
      icon: <Zap className="text-primary" />,
    },
    {
      title: t('features.secureReliable.title'),
      description: t('features.secureReliable.description'),
      icon: <Shield className="text-primary" />,
    },
    {
      title: t('features.modernWebTech.title'),
      description: t('features.modernWebTech.description'),
      icon: <Globe className="text-primary" />,
    },
  ];

  return (
    <section>
      <div className="container mx-auto px-4 py-16 lg:px-20">
        <div className="mb-12 text-center">
          <Heading size="h2" className="mb-4">
            {t('title')}
          </Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {t('description')}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {content.map((item) => (
            <Card
              key={item.title}
              className="hover:border-primary/20 transition-all"
            >
              <CardHeader>
                <div className="bg-muted mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  {item.icon}
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
