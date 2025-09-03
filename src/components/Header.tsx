import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from './Button';

export default function Header() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="sticky top-0 flex justify-between items-center p-4 bg-gray-200 text-black">
      <div>
        <Link href="/">[Logo]</Link>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary">EN</Button>
        <Button onClick={() => handleNavigate('/authentication')}>
          Sign In
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleNavigate('/registration')}
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
}
