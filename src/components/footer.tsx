import { useTranslations } from 'next-intl';
import { Button } from './ui/button';
import RsschoolIcon from './ui/icons/rsschool';
import { Heading } from './ui/typography';
import GithubIcon from './ui/icons/github';

const teamGithubs = ['alexspearsi', 'FirstDayAtWork', 'olydbd'];

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-muted border-border mt-auto border-t">
      <div className="container mx-auto px-4 py-12 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-3 md:items-start">
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card flex items-center space-x-3 rounded-lg border p-4 shadow-sm duration-200 hover:shadow-md"
            >
              <RsschoolIcon />
              <div>
                <p className="text-base font-bold">RS School</p>
                <p className="text-muted-foreground text-sm">
                  React {t('course')}
                </p>
              </div>
            </a>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Heading size="h4">{t('title')}</Heading>
            <div className="flex flex-wrap justify-center gap-3">
              {teamGithubs.map((github) => (
                <Button key={github} variant="transparent" size="sm" asChild>
                  <a
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1"
                  >
                    <GithubIcon />
                    <span className="text-sm font-medium">{github}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3 md:items-end">
            <div className="text-center md:text-right">
              <div className="inline-flex items-center space-x-2">
                <div className="bg-chart-2 h-2 w-2 animate-pulse rounded-full" />
                <span className="text-accent-foreground text-base font-medium">
                  REST Client
                </span>
              </div>
              <p className="text-muted-foreground mt-2 max-w-[250px] text-sm">
                {t('about')}
              </p>
            </div>
          </div>
        </div>

        <div className="border-border mt-8 border-t pt-6">
          <p className="text-muted-foreground text-center text-sm">
            © 2025 REST Client.
          </p>
        </div>
      </div>
    </footer>
  );
}
