import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/typography';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto space-y-8 px-6 text-center lg:px-20">
        <div className="space-y-6">
          <span className="text-primary block text-5xl">404</span>
          <Heading size="h2">Page Not Found</Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
            Please check the URL or navigate back home.
          </p>
        </div>
        <Button variant="default">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </section>
  );
}
