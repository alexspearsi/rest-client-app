import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva('tracking-tight', {
  variants: {
    size: {
      h1: 'text-4xl md:text-5xl font-bold',
      h2: 'text-2xl md:text-3xl font-bold',
      h3: 'text-xl md:text-2xl font-bold',
      h4: 'text-lg md:text-xl font-semibold',
    },
  },
  defaultVariants: {
    size: 'h1',
  },
});

const paragraphVariants = cva('text-base', {
  variants: {
    variant: {
      default: 'text-foreground leading-7',
      muted: 'text-muted-foreground leading-7',
      large: 'text-lg leading-8',
      small: 'text-sm leading-6',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

export function Heading({ className, size, ...props }: HeadingProps) {
  const Tag = size || 'h1';
  return (
    <Tag className={cn(headingVariants({ size, className }))} {...props} />
  );
}

export function Paragraph({ className, variant, ...props }: ParagraphProps) {
  return (
    <p className={cn(paragraphVariants({ variant }), className)} {...props} />
  );
}
