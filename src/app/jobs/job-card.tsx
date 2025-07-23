import Link from 'next/link';
import { MapPin, Building, Bookmark } from 'lucide-react';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const timeSincePosted = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    }

  return (
    <Card className="transition-all hover:shadow-md hover:-translate-y-1">
        <Link href={`/jobs/${job.id}`} className="block">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-xl">{job.jobTitle}</CardTitle>
                        <CardDescription className="flex items-center gap-4 pt-2">
                        <span className="flex items-center gap-2"><Building className="h-4 w-4" />{job.companyName}</span>
                        <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{job.location}</span>
                        </CardDescription>
                    </div>
                    <Badge variant="outline">{timeSincePosted(job.postedAt)}</Badge>
                </div>
            </CardHeader>
        </Link>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
            {job.descriptionText.substring(0, 200)}...
        </p>
      </CardContent>
      <Separator className="my-0"/>
      <CardFooter className="py-4">
        <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 flex-wrap">
                {job.requiredSkills.slice(0,3).map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
            </div>
            <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">Save Job</span>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
