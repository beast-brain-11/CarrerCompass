import Link from 'next/link';
import { Compass, Briefcase, MapPin, DollarSign, Upload, Send } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

export default function SurveyPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 px-4 py-12">
       <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Compass className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold font-headline">Tell Us About Yourself</h1>
            <p className="text-muted-foreground">This will help us personalize your job search experience.</p>
        </div>

        <Progress value={33} className="w-full" />
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Your Career Goals</CardTitle>
            <CardDescription>What are you looking for in your next role?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="job-titles">Target Job Titles (comma-separated)</Label>
               <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="job-titles" placeholder="e.g., Senior Product Manager, Lead Engineer" className="pl-10" />
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="locations">Preferred Locations (comma-separated)</Label>
               <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="locations" placeholder="e.g., San Francisco, CA, Remote" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Preferred Workplace</Label>
              <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                      <Checkbox id="remote" />
                      <Label htmlFor="remote" className="font-normal">Remote</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <Checkbox id="hybrid" />
                      <Label htmlFor="hybrid" className="font-normal">Hybrid</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <Checkbox id="onsite" />
                      <Label htmlFor="onsite" className="font-normal">On-site</Label>
                  </div>
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="salary">Minimum Salary Expectation</Label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="salary" type="number" placeholder="150000" className="pl-10" />
                </div>
            </div>
          </CardContent>
        </Card>

         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Your Experience</CardTitle>
            <CardDescription>Upload your resume or paste the text below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="resume-text">Resume Text</Label>
              <Textarea id="resume-text" rows={10} placeholder="Paste your resume here..." />
            </div>
            <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Upload Resume
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
            <Link href="/dashboard">
                <Button size="lg">
                    Finish & Go to Dashboard <Send className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
