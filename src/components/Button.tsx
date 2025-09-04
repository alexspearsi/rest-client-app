import React, { JSX } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
}: ButtonProps): JSX.Element {
  const baseClasses = 'px-4 py-2 rounded transition cursor-pointer font-medium';
  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-300 text-black hover:bg-gray-400';

  const classes = twMerge(baseClasses, variantClasses);

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
