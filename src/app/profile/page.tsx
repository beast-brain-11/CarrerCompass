'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { UserProfile } from '@/lib/types';
import { Save, FileUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import api from '@/lib/api';


export default function ProfilePage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                try {
                    const data = await api.get(`/users/${user.uid}`);
                    setProfile(data);
                } catch (error) {
                    console.error("Failed to fetch profile", error);
                    toast({
                        title: "Error",
                        description: "Failed to load your profile.",
                        variant: "destructive",
                    });
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProfile();
        }
    }, [user, toast]);

    const handleSave = async () => {
        if (!profile || !user) return;
        try {
            await api.put(`/users/${user.uid}`, {
                firstName: profile.first_name,
                lastName: profile.last_name,
                phoneNumber: profile.phone_number,
                location: profile.location,
                headline: profile.headline,
                summary: profile.summary,
                masterResume: profile.master_resume,
            });
            toast({
                title: "Profile Saved",
                description: "Your changes have been saved successfully.",
            });
        } catch (error) {
            console.error("Failed to save profile", error);
            toast({
                title: "Error",
                description: "Failed to save your profile.",
                variant: "destructive",
            });
        }
    };

    const handleChange = (field: keyof UserProfile, value: any) => {
        if (!profile) return;
        setProfile({ ...profile, [field]: value });
    };

    const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('/api/parse-resume', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to parse resume.');
            }

            const data = await response.json();
            handleChange('master_resume', data.text);
            toast({
                title: "Resume Parsed",
                description: "Your resume has been successfully parsed.",
            });
        } catch (error) {
            console.error("Failed to parse resume", error);
            toast({
                title: "Error",
                description: "Failed to parse your resume.",
                variant: "destructive",
            });
        }
    };

  if (isLoading || !profile) {
    return (
        <AppLayout>
            <div className="space-y-6">
                 <div>
                    <Skeleton className="h-10 w-1/4 mb-2" />
                    <Skeleton className="h-5 w-1/2" />
                </div>
                <Card>
                    <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-32 w-full" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/4" />
                         <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-20 w-full" />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-headline font-bold">Your Profile</h1>
          <p className="text-muted-foreground">This information helps our AI tailor its assistance to you.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" value={profile.first_name} onChange={e => handleChange('first_name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" value={profile.last_name} onChange={e => handleChange('last_name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" value={profile.headline} onChange={e => handleChange('headline', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={profile.phone_number} onChange={e => handleChange('phone_number', e.target.value)}/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={profile.location} onChange={e => handleChange('location', e.target.value)} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" value={profile.summary} onChange={e => handleChange('summary', e.target.value)} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Master Resume</CardTitle>
            <CardDescription>Your base resume for AI tailoring. Upload your most recent version.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="resume-text">Resume Text</Label>
              <Textarea id="resume-text" rows={15} value={profile.master_resume} onChange={e => handleChange('master_resume', e.target.value)} />
            </div>
            <div className="relative">
                <Label htmlFor="resume-upload">
                    <Button variant="outline" asChild>
                        <span>
                            <FileUp className="mr-2 h-4 w-4" /> Upload New Resume
                        </span>
                    </Button>
                </Label>
                <Input id="resume-upload" type="file" className="sr-only" onChange={handleResumeUpload} accept=".pdf" />
            </div>
          </CardContent>
        </Card>

         <div className="flex justify-end pt-4">
            <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save Profile
            </Button>
        </div>
      </div>
    </AppLayout>
  );
}
