import { Code } from 'lucide-react';
import { Button } from '../ui/button';
import { Heading } from '../ui/typography';

export default function ActionSection() {
  return (
    <section>
      <div className="container mx-auto px-6 pt-16 pb-32 lg:px-20">
        <div className="mb-12 text-center">
          <Heading size="h2" className="mb-4">
            Ready to Try REST Client?
          </Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Built with modern web technologies and designed for developers who
            need a reliable, fast, and intuitive API testing experience.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Code className="h-5 w-5" />
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
