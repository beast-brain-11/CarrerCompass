'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { userProfileData as initialUserProfileData } from '@/lib/placeholder-data';
import type { UserProfile } from '@/lib/types';
import { Save, FileUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        // Simulate fetching user profile data
        setTimeout(() => {
            setProfile(initialUserProfileData);
            setIsLoading(false);
        }, 500);
    }, []);

    const handleSave = () => {
        // Here you would typically send the data to your backend
        console.log("Saving profile:", profile);
        toast({
            title: "Profile Saved",
            description: "Your changes have been saved successfully.",
        });
    }

    const handleChange = (field: keyof UserProfile, value: any) => {
        if (!profile) return;
        setProfile({ ...profile, [field]: value });
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       if (!profile) return;
       const skillsArray = e.target.value.split(',').map(skill => skill.trim());
       setProfile({ ...profile, skills: skillsArray });
    }

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
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={profile.fullName} onChange={e => handleChange('fullName', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" value={profile.headline} onChange={e => handleChange('headline', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={profile.phoneNumber} onChange={e => handleChange('phoneNumber', e.target.value)}/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" value={profile.website} onChange={e => handleChange('website', e.target.value)} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" value={profile.linkedIn} onChange={e => handleChange('linkedIn', e.target.value)} />
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
              <Textarea id="resume-text" rows={15} value={profile.masterResume.text} onChange={e => handleChange('masterResume', { ...profile.masterResume, text: e.target.value })} />
            </div>
            <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" /> Upload New Resume
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Skills</CardTitle>
            <CardDescription>A comma-separated list of your top skills.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-2">
              <Label htmlFor="skills">Your Skills</Label>
              <Textarea id="skills" rows={3} value={profile.skills.join(', ')} onChange={handleSkillsChange}/>
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
