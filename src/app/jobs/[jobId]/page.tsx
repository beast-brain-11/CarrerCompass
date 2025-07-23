'use client'

import { notFound } from 'next/navigation';
import { Building, MapPin, Clock, ExternalLink } from 'lucide-react';
import AppLayout from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { jobPostingsData, userProfileData } from '@/lib/placeholder-data';
import AiAssistantPanel from './ai-assistant-panel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Job, UserProfile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function JobDetailsPage({ params }: { params: { jobId: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const foundJob = jobPostingsData.find((p) => p.id === params.jobId);
    if (foundJob) {
      setJob(foundJob);
      setUserProfile(userProfileData); // Also from placeholder
    }
    setIsLoading(false);
  }, [params.jobId]);

  if (isLoading) {
    return (
        <AppLayout>
             <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-3/4" />
                        <div className="flex gap-4 pt-2">
                            <Skeleton className="h-5 w-1/4" />
                            <Skeleton className="h-5 w-1/4" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Skeleton className="h-6 w-1/3 mb-4" />
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </div>
                         <div>
                            <Skeleton className="h-6 w-1/3 mb-4" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="sticky top-20">
                    <Skeleton className="h-[400px] w-full" />
                </div>
            </div>
        </AppLayout>
    )
  }

  if (!job) {
    notFound();
  }

  return (
    <AppLayout>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-headline">{job.jobTitle}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-base">
                  <span className="flex items-center gap-2"><Building className="h-4 w-4" />{job.companyName}</span>
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{job.location}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" />Posted {job.postedAt.toLocaleDateString()}</span>
                </CardDescription>
              </div>
              <Button asChild variant="secondary">
                <Link href={job.sourceURL} target="_blank">
                    View Original <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="font-headline">Required Skills</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {job.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="default">{skill}</Badge>
                ))}
              </div>

              <h3 className="font-headline">Job Description</h3>
              <div dangerouslySetInnerHTML={{ __html: job.descriptionHTML || `<p>${job.descriptionText}</p>` }} />
            </div>
          </CardContent>
        </Card>
        
        <div className="sticky top-20">
          {userProfile && <AiAssistantPanel job={job} userProfile={userProfile} />}
        </div>
      </div>
    </AppLayout>
  );
}
