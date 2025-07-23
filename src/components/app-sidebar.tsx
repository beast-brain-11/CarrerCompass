'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  KanbanSquare,
  User,
  Settings,
  Menu,
  Compass,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/jobs', icon: Briefcase, label: 'Jobs' },
  { href: '/tracker', icon: KanbanSquare, label: 'Tracker' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const NavLink = ({ item, isMobile = false }: { item: typeof navItems[0], isMobile?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);

  const linkContent = (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
        isActive && 'bg-muted text-primary',
        isMobile ? 'text-lg' : 'text-base'
      )}
    >
      <item.icon className="h-5 w-5" />
      {isMobile && <span>{item.label}</span>}
    </Link>
  );

  if (isMobile) {
    return linkContent;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
      <TooltipContent side="right">
        <p>{item.label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

function DesktopNav() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Signed out successfully.' });
      router.push('/login');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Failed to sign out.' });
    }
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/dashboard"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Compass className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">CareerCompass</span>
          </Link>
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary md:h-8 md:w-8"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sign Out</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Sign Out</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}

function MobileNav() {
    const router = useRouter();
    const { toast } = useToast();

    const handleSignOut = async () => {
        try {
        await signOut(auth);
        toast({ title: 'Signed out successfully.' });
        router.push('/login');
        } catch (error) {
        toast({ variant: 'destructive', title: 'Failed to sign out.' });
        }
    }
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:hidden">
       <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Compass className="h-6 w-6" />
                  <span>CareerCompass</span>
                </Link>
                {navItems.map((item) => <NavLink key={item.href} item={item} isMobile />)}
              </nav>
              <div className="mt-auto">
                 <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-lg"
                 >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
    </header>
  );
}


export default function AppSidebar() {
  return (
    <>
      <DesktopNav />
      <div className="block sm:hidden h-14" />
      <MobileNav />
    </>
  );
}
