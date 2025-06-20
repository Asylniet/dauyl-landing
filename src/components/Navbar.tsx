import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button, buttonVariants } from './ui/button';
import { Menu } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { LogoIcon } from './Icons';
import { env } from '@/lib/env.ts';

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: '#features',
    label: 'Преимущества',
  },
  {
    href: '#testimonials',
    label: 'Отзывы',
  },
  {
    href: '#pricing',
    label: 'Тарифы',
  },
  {
    href: '#faq',
    label: 'FAQ',
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center gap-2"
            >
              <LogoIcon />
              Dauyl
            </a>
          </NavigationMenuItem>
          
          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />
            <Button asChild>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`${env().VITE_APP_URL}/register`}
              >
                Попробовать
              </a>
            </Button>
            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={'left'}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Dauyl
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      {label}
                    </a>
                  ))}
                  <Button variant="outline" asChild>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={`${env().VITE_APP_URL}/login`}
                    >
                      Войти
                    </a>
                  </Button>
                  <Button asChild>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={`${env().VITE_APP_URL}/register`}
                    >
                      Получить 3 дня бесплатно
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </span>
          
          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: 'ghost',
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex gap-2">
            <ModeToggle />
            <Button className="hidden md:flex" variant="outline" asChild>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`${env().VITE_APP_URL}/login`}
              >
                Войти
              </a>
            </Button>
            <Button asChild>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`${env().VITE_APP_URL}/register`}
              >
                Попробовать
              </a>
            </Button>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
