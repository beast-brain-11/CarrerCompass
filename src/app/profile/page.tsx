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
import { userProfileData } from '@/lib/data';
import { Save, FileUp } from 'lucide-react';

export default function ProfilePage() {
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
              <Input id="fullName" defaultValue={userProfileData.fullName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" defaultValue={userProfileData.headline} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue={userProfileData.phoneNumber} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue={userProfileData.website} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" defaultValue={userProfileData.linkedIn} />
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
              <Textarea id="resume-text" rows={15} defaultValue={userProfileData.masterResume.text} />
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
              <Textarea id="skills" rows={3} defaultValue={userProfileData.skills.join(', ')} />
            </div>
          </CardContent>
        </Card>

         <div className="flex justify-end pt-4">
            <Button>
                <Save className="mr-2 h-4 w-4" /> Save Profile
            </Button>
        </div>
      </div>
    </AppLayout>
  );
}
