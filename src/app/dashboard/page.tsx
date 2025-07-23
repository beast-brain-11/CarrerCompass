'use client';

import Link from 'next/link';
import { Briefcase, KanbanSquare, Mic, ArrowRight } from 'lucide-react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userProfileData } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardPage() {
  const { user } = useAuth();
  const userName = user?.displayName || userProfileData.fullName.split(' ')[0] || 'there';
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-gray-900 dark:text-gray-50">
            Welcome back, {userName}!
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Here&apos;s your career launchpad. Let&apos;s find your next big opportunity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline">Find Jobs</CardTitle>
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <CardDescription>
                Explore opportunities tailored to your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/jobs">
                <Button className="w-full">
                  Go to Job Feed <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline">Track Applications</CardTitle>
                <KanbanSquare className="h-8 w-8 text-primary" />
              </div>
              <CardDescription>
                Manage your job applications from start to finish.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tracker">
                <Button className="w-full">
                  Open Tracker <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline">Interview Prep</CardTitle>
                <Mic className="h-8 w-8 text-primary" />
              </div>
              <CardDescription>
                Ace your next interview with our AI Mock Interviewer.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Link href="/tracker">
                <Button className="w-full">
                  Start Prepping <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Your Profile at a Glance</CardTitle>
                <CardDescription>A summary of your professional identity. Keep it updated!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Headline</span>
                    <span className="font-medium">{userProfileData.headline}</span>
                </div>
                 <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Skills</span>
                    <span className="font-medium">{userProfileData.skills.slice(0, 5).join(', ')}...</span>
                </div>
                 <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Target Titles</span>
                    <span className="font-medium">{userProfileData.jobPreferences.titles.join(', ')}</span>
                </div>
                <Link href="/profile" className="pt-4">
                    <Button variant="outline">Edit Profile</Button>
                </Link>
            </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
