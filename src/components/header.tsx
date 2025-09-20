'use client';
import { useTranslations } from 'next-intl';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu';
import { auth, logout } from '@/firebase';
import { LanguageToggler } from './language-toggler';
import { ThemeToggler } from './theme-toggler';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from '@/i18n/navigation';
import { toast } from 'sonner';
import { EllipsisVertical, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import CustomTooltip from './ui/custom-tooltip';
import useScrolledState from '@/hooks/useScrolledState';
import CatIcon from './ui/icons/cat';

export default function Header() {
  const t = useTranslations('Header');
  const tt = useTranslations('Notification');

  const scrolled = useScrolledState();

  const [user] = useAuthState(auth);

  const navLinks = user
    ? [
        { href: '/', label: t('mainPage') },
        { href: '/rest-client', label: t('restClientPage') },
        { href: '/variables', label: t('variablesPage') },
        { href: '/history', label: t('historyPage') },
      ]
    : [
        { href: '/authentication', label: t('signin') },
        { href: '/registration', label: t('signup') },
      ];

  async function handleLogout() {
    try {
      await logout();
      toast.success(tt('logoutSuccess'));
    } catch {
      toast.error(tt('logoutFailed'));
    }
  }

  return (
    <header className="bg-background border-border sticky top-0 z-50 border-b-2">
      <div
        className={`container mx-auto px-6 lg:px-20 ${scrolled ? 'py-2' : 'py-4'} duration-200`}
      >
        <div className="flex items-center justify-between">
          <div>
            <Link className="flex items-center gap-3" href="/">
              <div
                className={`${scrolled ? 'h-8 w-8' : 'h-10 w-10'} bg-primary flex items-center justify-center rounded-lg duration-200`}
              >
                <CatIcon
                  className={`${scrolled ? 'w-4' : 'w-5'} fill-primary-foreground duration-200`}
                />
              </div>
              <span
                className={`font-bold ${scrolled ? 'text-sm' : 'text-lg'} hidden duration-200 sm:block`}
              >
                REST Client
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1">
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <LanguageToggler />
            <ThemeToggler />

            <DropdownMenu>
              <CustomTooltip content={t('openMenuTooltip')}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="md:hidden">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
              </CustomTooltip>
              <DropdownMenuContent align="end">
                {navLinks.map((link) => (
                  <DropdownMenuItem asChild key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user && (
              <CustomTooltip content={t('logoutTooltip')}>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut />
                </Button>
              </CustomTooltip>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
