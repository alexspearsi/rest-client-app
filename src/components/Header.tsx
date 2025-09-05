'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu';

export default function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();

  const segments = pathname.split('/');
  const currentLang = segments[1] || 'en';

  return (
    <header className="sticky top-0 flex items-center justify-between border-b-2 p-4">
      <div>
        <Link href={`/${currentLang}`}>{t('logo')}</Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={`/${currentLang}/authentication`}>{t('signin')}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={`/${currentLang}/registration`}>{t('signup')}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
