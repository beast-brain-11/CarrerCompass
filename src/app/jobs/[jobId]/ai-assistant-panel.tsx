'use client';

import { useState } from 'react';
import { Sparkles, FileText, Bot, Briefcase, Lightbulb } from 'lucide-react';
import type { Job, UserProfile } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { summarizeCompanyCulture, CompanyCultureOutput } from '@/ai/flows/company-culture-summarizer';
import ResumeTailorDialog from './resume-tailor-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AiAssistantPanelProps {
  job: Job;
  userProfile: UserProfile;
}

export default function AiAssistantPanel({ job, userProfile }: AiAssistantPanelProps) {
  const [isTailorDialogOpen, setTailorDialogOpen] = useState(false);
  const [isSkillGapDialogOpen, setSkillGapDialogOpen] = useState(false);
  const [cultureSummary, setCultureSummary] = useState<CompanyCultureOutput | null>(null);
  const [isCultureLoading, setIsCultureLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarizeCulture = async () => {
    setIsCultureLoading(true);
    setCultureSummary(null);
    try {
      const result = await summarizeCompanyCulture({ companyName: job.company_name });
      if (result && result.cultureSummary && result.cultureSummary !== 'No information found') {
        setCultureSummary(result);
      } else {
         toast({
            variant: "default",
            title: "Culture Summary",
            description: "Could not find enough information to summarize the company culture.",
        });
      }
    } catch (error) {
      console.error("Error summarizing company culture:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate company culture summary.",
      });
    } finally {
      setIsCultureLoading(false);
    }
  };


  return (
    <>
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center gap-3">
          <Sparkles className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline">AI Co-Pilot</CardTitle>
            <CardDescription>Your personal career assistant</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start" onClick={() => setTailorDialogOpen(true)}>
            <FileText className="mr-2 h-4 w-4" /> Tailor My Resume
          </Button>
          <Button className="w-full justify-start" variant="secondary" disabled>
            <Bot className="mr-2 h-4 w-4" /> Generate Cover Letter (soon)
          </Button>
          <Button className="w-full justify-start" variant="outline" onClick={handleSummarizeCulture} disabled={isCultureLoading}>
            <Briefcase className="mr-2 h-4 w-4" /> 
            {isCultureLoading ? 'Analyzing Culture...' : 'Summarize Company Culture'}
          </Button>

          {cultureSummary && (
             <Alert className="mt-4">
                <Briefcase className="h-4 w-4" />
                <AlertTitle className="font-headline">Culture at {job.company_name}</AlertTitle>
                <AlertDescription>
                    {cultureSummary.cultureSummary}
                </AlertDescription>
            </Alert>
          )}

        </CardContent>
      </Card>
      <ResumeTailorDialog
        isOpen={isTailorDialogOpen}
        setIsOpen={setTailorDialogOpen}
        jobDescriptionText={job.description}
        masterResumeText={userProfile.master_resume}
      />
    </>
  );
}
