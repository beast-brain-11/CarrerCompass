'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, getRedirectResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from './use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const adminEmail = 'priaanshgupta@gmail.com';

  useEffect(() => {
    const handleRedirectResult = async () => {
        try {
            const result = await getRedirectResult(auth);
            if (result) {
                const user = result.user;
                toast({
                    title: "Success!",
                    description: "You've been logged in successfully.",
                });

                if (user.email === adminEmail) {
                    router.push('/dashboard');
                } else {
                    const isNewUser = result.additionalUserInfo?.isNewUser;
                    if (isNewUser) {
                        router.push('/survey');
                    } else {
                        router.push('/dashboard');
                    }
                }
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Login failed",
                description: error.message,
            });
        } finally {
            // We set loading to false here only if there was no redirect result.
            // If there was a redirect, the onAuthStateChanged will handle setting the user
            // and the other useEffect will handle navigation, so we avoid a flash of content.
            const result = await getRedirectResult(auth); // Check again, might be cached
            if (!result) {
                setLoading(false);
            }
        }
    }
    
    // Call this immediately
    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // This is the main loading state controller.
      // It ensures we don't stop loading until we know the auth state.
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, toast]);
  
  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/';
    const isSurveyPage = pathname === '/survey';
    
    // If user is admin, they can bypass the survey page
    if (user?.email === adminEmail && isSurveyPage) {
        router.push('/dashboard');
        return;
    }

    if (!user && !isAuthPage && !isSurveyPage) {
      router.push('/login');
    }
    
    if (user && isAuthPage && pathname !== '/') {
        router.push('/dashboard');
    }

  }, [user, loading, pathname, router]);


  if (loading) {
     return (
       <div className="flex flex-col min-h-screen w-full items-center justify-center bg-background p-8">
            <div className="w-full max-w-md space-y-4">
                <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
                <div className="space-y-4 pt-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
     )
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
