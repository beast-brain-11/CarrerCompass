'use client'

import { notFound } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { applicationsData, userProfileData } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MockInterviewer from './mock-interviewer';
import { Building, Briefcase } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import type { Application } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function InterviewPrepPage({ params }: { params: { applicationId: string } }) {
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching application data
    const foundApplication = applicationsData.find((app) => app.id === params.applicationId);
    if (foundApplication) {
      setApplication(foundApplication);
    }
    setIsLoading(false);
  }, [params.applicationId]);

  if (isLoading) {
    return (
        <AppLayout>
            <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
                <div>
                     <Skeleton className="h-10 w-3/4 mb-2" />
                     <Skeleton className="h-6 w-1/2 mb-6" />
                     <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[50vh] w-full" />
                        </CardContent>
                     </Card>
                </div>
                 <div className="sticky top-20 space-y-6">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </AppLayout>
    )
  }

  if (!application || !application.jobSnapshot) {
    notFound();
  }

  return (
    <AppLayout>
      <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
        <div>
            <h1 className="text-3xl font-headline font-bold mb-2">Interview Prep Hub</h1>
            <p className="text-lg text-muted-foreground mb-6">Get ready to ace your interview for the <span className="text-primary font-semibold">{application.jobSnapshot.jobTitle}</span> role.</p>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">AI Mock Interviewer</CardTitle>
                    <CardDescription>Practice answering common interview questions and get instant feedback.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MockInterviewer 
                        jobDescription={application.jobSnapshot.descriptionText || ''}
                        userResume={userProfileData.masterResume.text}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="sticky top-20 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{application.jobSnapshot.jobTitle}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{application.jobSnapshot.companyName}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Interview Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-medium">Stage</p>
                        <p className="text-sm text-muted-foreground">{application.status === 'interviewing' ? 'Technical Round' : 'Phone Screen'}</p>
                    </div>
                     <Separator />
                     <div>
                        <p className="text-sm font-medium">Your Notes</p>
                        <p className="text-sm text-muted-foreground italic">{application.notes || "No notes yet."}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </AppLayout>
  );
}
