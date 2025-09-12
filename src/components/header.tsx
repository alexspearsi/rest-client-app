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

export default function Header() {
  const t = useTranslations('Header');
  const tt = useTranslations('Notification');

  const [user, loading] = useAuthState(auth);

  async function handleLogout() {
    try {
      await logout();
      toast.success(tt('logoutSuccess'));
    } catch {
      toast.error(tt('logoutFailed'));
    }
  }

  return (
    <header className="sticky top-0 flex items-center justify-between border-b-2 p-4">
      <div>
        <Link href="/">{t('logo')}</Link>
      </div>
      <div className="flex items-center justify-center gap-1">
        {loading ? (
          <div className="opacity-0"></div>
        ) : (
          <NavigationMenu>
            <NavigationMenuList>
              {user ? (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <button className="cursor-pointer" onClick={handleLogout}>
                        {t('logout')}
                      </button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/">{t('mainPage')}</Link>
                  </NavigationMenuLink>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/authentication">{t('signin')}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/registration">{t('signup')}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <LanguageToggler />
        <ThemeToggler />
      </div>
    </header>
  );
}
