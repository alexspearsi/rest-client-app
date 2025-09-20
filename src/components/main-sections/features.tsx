import { Globe, Shield, Zap } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Heading } from '../ui/typography';

const content = [
  {
    title: 'Lightning Fast',
    description:
      'Optimized performance with instant response visualization and request history.',
    icon: <Zap className="text-primary" />,
  },
  {
    title: 'Secure & Reliable',
    description:
      'Data security is fully guaranteed through the implementation of Firebase Authentication standards.',
    icon: <Shield className="text-primary" />,
  },
  {
    title: 'Modern Web Tech',
    description:
      'Built with Next.js, TypeScript and Tailwind CSS for the best performance and UX.',
    icon: <Globe className="text-primary" />,
  },
];

export default function FeaturesSection() {
  return (
    <section>
      <div className="container mx-auto px-6 py-16 lg:px-20">
        <div className="mb-12 text-center">
          <Heading size="h2" className="mb-4">
            Why REST Client?
          </Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Built with modern web technologies and designed for the best
            developer experience.
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
