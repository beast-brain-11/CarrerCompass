'use client';

import { useState, useEffect } from 'react';
import { skillGapAnalyzer, SkillGapAnalyzerOutput } from '@/ai/flows/skill-gap-analyzer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Lightbulb, ListChecks } from 'lucide-react';

interface SkillGapDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userSkills: string[];
  jobDescriptionText: string;
}

export default function SkillGapDialog({
  isOpen,
  setIsOpen,
  userSkills,
  jobDescriptionText,
}: SkillGapDialogProps) {
  const [analysis, setAnalysis] = useState<SkillGapAnalyzerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && !analysis && !isLoading) {
      handleAnalyze();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await skillGapAnalyzer({ userSkills, jobDescriptionText });
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing skill gap:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to analyze skill gap. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Don't reset data so it's cached for the session
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline">AI Skill Gap Analysis</DialogTitle>
          <DialogDescription>
            See how your skills stack up against this job's requirements.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-grow overflow-hidden">
            {isLoading && <LoadingSkeleton />}
            {analysis && (
                 <ScrollArea className="h-full pr-6">
                    <div className="space-y-6">
                        <SkillSection icon={ListChecks} title="All Required Skills" skills={analysis.requiredSkills} variant="secondary" />
                        <SkillSection icon={CheckCircle2} title="Your Matching Skills" skills={analysis.matchingSkills} variant="default" className="text-green-600"/>
                        <SkillSection icon={AlertCircle} title="Your Skill Gaps" skills={analysis.skillGaps} variant="destructive" className="text-red-600"/>
                        <div>
                            <h3 className="font-headline text-lg font-semibold mb-2 flex items-center gap-2"><Lightbulb className="text-amber-500" /> Learning Suggestions</h3>
                            <div className="space-y-2">
                                {analysis.learningSuggestions.map((item, index) => (
                                    <div key={index} className="text-sm p-3 bg-muted/50 rounded-md">
                                        <p className="font-semibold">{item.skill}</p>
                                        <p className="text-muted-foreground">{item.suggestion}</p>
                                    </div>
                                ))}
                                {analysis.learningSuggestions.length === 0 && (
                                    <p className="text-sm text-muted-foreground">No specific learning suggestions needed. Your skills are a great match!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            )}
        </div>
        
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const SkillSection = ({ icon: Icon, title, skills, variant, className }: { icon: React.ElementType, title: string, skills: string[], variant: "default" | "destructive" | "secondary", className?: string }) => (
    <div>
        <h3 className={`font-headline text-lg font-semibold mb-3 flex items-center gap-2 ${className}`}>
            <Icon/> {title}
        </h3>
        <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? skills.map(skill => (
                <Badge key={skill} variant={variant}>{skill}</Badge>
            )) : <p className="text-sm text-muted-foreground">None identified.</p>}
        </div>
    </div>
);

const LoadingSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <div className="space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-7 w-32 rounded-full" />
                <Skeleton className="h-7 w-20 rounded-full" />
            </div>
        </div>
        <div className="space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-7 w-28 rounded-full" />
                <Skeleton className="h-7 w-24 rounded-full" />
            </div>
        </div>
        <div className="space-y-3">
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    </div>
);
