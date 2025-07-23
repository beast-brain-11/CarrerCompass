import { Search, MapPin, Briefcase, Filter } from 'lucide-react';
import AppLayout from '@/components/app-layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { jobPostingsData } from '@/lib/data';
import JobCard from './job-card';

export default function JobsPage() {
  return (
    <AppLayout>
      <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
        <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-headline font-semibold">Filters</h2>
                <Filter className="h-5 w-5 text-muted-foreground"/>
            </div>
            
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="search" placeholder="Job title, company..." className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="location" placeholder="City or remote" className="pl-10" />
            </div>
          </div>
          <div className="space-y-4">
            <Label>Workplace</Label>
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id="remote" />
                    <Label htmlFor="remote">Remote</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="hybrid" />
                    <Label htmlFor="hybrid">Hybrid</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="onsite" />
                    <Label htmlFor="onsite">On-site</Label>
                </div>
            </div>
          </div>
          <Button className="w-full">Apply Filters</Button>
        </Card>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-headline font-bold">Job Feed</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-5 w-5" />
                <span>{jobPostingsData.length} opportunities</span>
            </div>
          </div>
          <div className="space-y-4">
            {jobPostingsData.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
