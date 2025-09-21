import React from 'react';
import { Loader2 } from 'lucide-react';

export function Loader() {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-6">
      <Loader2 className="text-foreground h-10 w-10 animate-spin" />
    </div>
  );
}
