'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Heading } from '../ui/typography';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { Shield, Zap } from 'lucide-react';
import catFirstSrc from '../../../public/cat-1.jpg';
import catSecondSrc from '../../../public/cat-2.jpg';
import catThirdSrc from '../../../public/cat-3.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import Image from 'next/image';
import { Badge } from '../ui/badge';

export default function HeroSection() {
  const [user] = useAuthState(auth);

  const links = user
    ? [
        { href: '/rest-client', label: 'REST Client' },
        { href: '/variables', label: 'Variables' },
        { href: '/history', label: 'History' },
      ]
    : [
        { href: '/authentication', label: 'Sign In' },
        { href: '/registration', label: 'Sign Up' },
      ];

  return (
    <section className="flex items-center">
      <div className="container mx-auto px-6 pt-32 pb-16 lg:px-20">
        <div className="grid items-center justify-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-6 text-center lg:text-start">
              {user && (
                <Badge variant="secondary">
                  Welcome back, {user.displayName}!
                </Badge>
              )}
              <Heading size="h1">REST Client</Heading>
              <p className="text-muted-foreground max-w-xl text-lg">
                A modern, intuitive REST API testing tool built by 200 OK team,
                RS School students. Streamline your API development workflow
                with our powerful client.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              {links.map((link, index) => (
                <Button
                  key={link.label}
                  variant={index === 1 && !user ? 'default' : 'outline'}
                  className="gap-2"
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="bg-chart-2 h-2 w-2 rounded-full"></div>
                <span>Live & Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Secure Testing</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>

          <div>
            <div className="relative z-10 mx-auto max-w-md">
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="bg-primary h-72 w-72 rounded-full opacity-50 blur-3xl sm:h-96 sm:w-96"></div>
              </div>
              <Carousel className="w-full overflow-hidden rounded-2xl">
                <CarouselContent>
                  {[catFirstSrc, catSecondSrc, catThirdSrc].map(
                    (item, index) => (
                      <CarouselItem key={index}>
                        <div className="bg-muted relative aspect-[4/3]">
                          <Image
                            priority
                            className="h-full w-full"
                            src={item}
                            alt="REST CLient Interface"
                          />
                        </div>
                      </CarouselItem>
                    ),
                  )}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
            <div className="mx-auto mt-4 flex max-w-md justify-end">
              <div className="text-end">
                <p className="font-bold">Coding Companions</p>
                <p className="text-muted-foreground text-sm">Good vibes only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
