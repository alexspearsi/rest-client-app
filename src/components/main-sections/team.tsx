import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Heading } from '../ui/typography';
import { Button } from '../ui/button';
import GithubIcon from '../ui/icons/github';
import Image from 'next/image';
import memberFirstSrc from '../../../public/alexspearsi.jpg';
import memberSecondSrc from '../../../public/firstdayatwork.jpg';
import memberThirdSrc from '../../../public/olydbd.jpg';
import { useTranslations } from 'next-intl';

export default function TeamSection() {
  const t = useTranslations('TeamSection');

  const teamContent = [
    {
      title: t('members.alex.name'),
      role: 'Team Lead Frontend Developer',
      description: t('members.alex.description'),
      github: 'alexspearsi',
      imageSrc: memberFirstSrc,
    },
    {
      title: t('members.mikhail.name'),
      role: 'Frontend Developer',
      description: t('members.mikhail.description'),
      github: 'FirstDayAtWork',
      imageSrc: memberSecondSrc,
    },
    {
      title: t('members.olga.name'),
      role: 'Frontend Developer',
      description: t('members.olga.description'),
      github: 'olydbd',
      imageSrc: memberThirdSrc,
    },
  ];

  return (
    <section>
      <div className="container mx-auto px-4 py-8 md:py-16 lg:px-20">
        <div className="mb-12 text-center">
          <Heading size="h2" className="mb-4">
            {t('title')}
          </Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {t('description')}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {teamContent.map((item, index) => (
            <Card
              key={index}
              className="hover:border-primary/20 text-center transition-all"
            >
              <CardHeader>
                <div className="from-primary to-secondary mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br">
                  <Image
                    priority
                    className="h-full w-full"
                    src={item.imageSrc}
                    alt="REST CLient Interface"
                  />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.role}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="text-muted-foreground mb-4 text-sm">
                  {item.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                  asChild
                >
                  <a
                    href={`https://github.com/${item.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1"
                  >
                    <GithubIcon />@{item.github}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
