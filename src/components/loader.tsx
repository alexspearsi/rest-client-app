import React from 'react';
import { Loader2 } from 'lucide-react';

export function Loader() {
  return (
    <div className="flex h-[75vh] flex-col items-center justify-center gap-6">
      <Loader2
        data-testid="loader-icon"
        className="h-10 w-10 animate-spin text-gray-700 dark:text-gray-300"
      />
    </div>
  );
}
