'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, getRedirectResult, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from './use-toast';
import api from '@/lib/api';

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
    });

    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          const user = result.user;
          toast({
            title: "Success!",
            description: "You've been logged in successfully.",
          });

          const additionalUserInfo = getAdditionalUserInfo(result);
          if (additionalUserInfo?.isNewUser) {
            try {
              // We need to get the token to authenticate with our backend
              const token = await user.getIdToken();
              // Create user in our DB
              await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  firstName: user.displayName?.split(' ')[0] || '',
                  lastName: user.displayName?.split(' ')[1] || '',
                  email: user.email,
                }),
              });
              router.push('/survey');
            } catch (error) {
              console.error("Failed to create user profile", error);
              toast({
                variant: "destructive",
                title: "Setup failed",
                description: "Could not create your user profile.",
              });
            }
          } else {
            router.push('/dashboard');
          }
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
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
