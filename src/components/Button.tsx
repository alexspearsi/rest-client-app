import React, { JSX } from 'react';
import clsx from 'clsx';

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
  const classes = clsx(
    'px-4 py-2 rounded transition cursor-pointer font-medium',
    {
      'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
      'bg-gray-300 text-black hover:bg-gray-400': variant === 'secondary',
    },
  );

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
