'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Briefcase, Filter, X } from 'lucide-react';
import AppLayout from '@/components/app-layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { jobPostingsData } from '@/lib/placeholder-data';
import JobCard from './job-card';
import type { Job } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [workplace, setWorkplace] = useState({
    remote: false,
    hybrid: false,
    onsite: false,
  });

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setJobs(jobPostingsData);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredJobs = useMemo(() => {
    let result = jobs;

    if (searchQuery) {
      result = result.filter(job =>
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.descriptionText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationQuery) {
      result = result.filter(job =>
        job.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }
    
    const selectedWorkplaces = Object.entries(workplace)
      .filter(([, checked]) => checked)
      .map(([key]) => key);

    if (selectedWorkplaces.length > 0) {
        result = result.filter(job => {
            if (selectedWorkplaces.includes('remote') && job.location.toLowerCase().includes('remote')) return true;
            if (selectedWorkplaces.includes('hybrid') && job.location.toLowerCase().includes('hybrid')) return true;
            if (selectedWorkplaces.includes('onsite') && !job.location.toLowerCase().includes('remote') && !job.location.toLowerCase().includes('hybrid')) return true;
            return false;
        });
    }

    return result;
  }, [jobs, searchQuery, locationQuery, workplace]);
  
  const handleWorkplaceChange = (type: keyof typeof workplace) => {
    setWorkplace(prev => ({...prev, [type]: !prev[type]}));
  }

  const resetFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setWorkplace({ remote: false, hybrid: false, onsite: false });
  }
  
  const hasActiveFilters = searchQuery || locationQuery || Object.values(workplace).some(v => v);

  return (
    <AppLayout>
      <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
        <Card className="p-6 space-y-6 sticky top-20">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-headline font-semibold">Filters</h2>
                <Filter className="h-5 w-5 text-muted-foreground"/>
            </div>
            
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="search" placeholder="Job title, company..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="location" placeholder="City or remote" className="pl-10" value={locationQuery} onChange={e => setLocationQuery(e.target.value)} />
            </div>
          </div>
          <div className="space-y-4">
            <Label>Workplace</Label>
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id="remote" checked={workplace.remote} onCheckedChange={() => handleWorkplaceChange('remote')} />
                    <Label htmlFor="remote" className="font-normal">Remote</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="hybrid" checked={workplace.hybrid} onCheckedChange={() => handleWorkplaceChange('hybrid')} />
                    <Label htmlFor="hybrid" className="font-normal">Hybrid</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="onsite" checked={workplace.onsite} onCheckedChange={() => handleWorkplaceChange('onsite')} />
                    <Label htmlFor="onsite" className="font-normal">On-site</Label>
                </div>
            </div>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" className="w-full" onClick={resetFilters}>
                <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
          )}
        </Card>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-headline font-bold">Job Feed</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-5 w-5" />
                <span>{isLoading ? '...' : filteredJobs.length} opportunities</span>
            </div>
          </div>
          <div className="space-y-4">
            {isLoading ? (
                <>
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </>
            ) : (
                 filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))
                ) : (
                    <Card className="text-center py-16 px-6">
                        <h3 className="text-lg font-semibold">No Jobs Found</h3>
                        <p className="text-muted-foreground mt-2">Try adjusting your filters to find more opportunities.</p>
                    </Card>
                )
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
