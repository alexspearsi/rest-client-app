import React from 'react';
import { Loader2 } from 'lucide-react';

export function Loader() {
  return (
    <Loader2 className="h-10 w-10 animate-spin text-gray-700 dark:text-gray-300" />
  );
}
