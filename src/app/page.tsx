'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function Page() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 text-black p-8">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <div className="flex gap-4">
        <Button
          variant="primary"
          onClick={() => handleNavigate('/authentication')}
        >
          Sign In
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleNavigate('/registration')}
        >
          Sign Up
        </Button>
      </div>
      <div className="flex gap-4 mt-30">
        <Button
          variant="secondary"
          onClick={() => handleNavigate('/rest-client')}
        >
          Rest client
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleNavigate('/variables')}
        >
          Variables
        </Button>
        <Button variant="secondary" onClick={() => handleNavigate('/history')}>
          History
        </Button>
      </div>
    </div>
  );
}
