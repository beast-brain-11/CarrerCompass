'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Briefcase, Filter, X } from 'lucide-react';
import AppLayout from '@/components/app-layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import JobCard from './job-card';
import type { Job } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [page, setPage] = useState(1);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        search: searchQuery,
        location: locationQuery,
        page: String(page),
        limit: '10',
      });
      const data = await api.get(`/jobs?${params.toString()}`);
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
      toast({
        title: "Error",
        description: "Failed to load jobs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, locationQuery, page, toast]);

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchJobs();
    }, 500); // Debounce requests
    return () => clearTimeout(timer);
  }, [fetchJobs]);

  const resetFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setPage(1);
  }
  
  const hasActiveFilters = searchQuery || locationQuery;

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
                <span>{isLoading ? '...' : jobs.length} opportunities</span>
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
                 jobs.length > 0 ? (
                    jobs.map((job) => (
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
