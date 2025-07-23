'use client';

import { useState } from 'react';
import { tailorResume, TailorResumeOutput } from '@/ai/flows/tailor-resume';
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
import { Download, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ResumeTailorDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  jobDescriptionText: string;
  masterResumeText: string;
}

export default function ResumeTailorDialog({
  isOpen,
  setIsOpen,
  jobDescriptionText,
  masterResumeText,
}: ResumeTailorDialogProps) {
  const [tailoredData, setTailoredData] = useState<TailorResumeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTailorResume = async () => {
    setIsLoading(true);
    setTailoredData(null);
    try {
      const result = await tailorResume({ jobDescriptionText, masterResumeText });
      setTailoredData(result);
    } catch (error) {
      console.error('Error tailoring resume:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to tailor resume. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTailoredData(null);
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!tailoredData) return;

    let textContent = ``;
    textContent += `${tailoredData.headline}\n\n`;
    textContent += `SUMMARY\n${tailoredData.summary}\n\n`;
    textContent += `WORK EXPERIENCE\n`;
    tailoredData.workExperience.forEach(exp => {
        textContent += `\n${exp.title} at ${exp.company}\n`;
        textContent += `${exp.rewrittenDescription}\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailored-resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline">AI Resume Tailor</DialogTitle>
          <DialogDescription>
            Let AI rewrite your resume to perfectly match this job description. Review and download the result.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-grow overflow-hidden">
          {!tailoredData && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-muted rounded-lg">
                <Sparkles className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 font-headline">Ready to Optimize?</h3>
                <p className="text-muted-foreground mb-4 max-w-md">Click the button below to let our AI analyze your resume against the job description and suggest powerful, keyword-optimized improvements.</p>
                <Button onClick={handleTailorResume}>Tailor My Resume</Button>
            </div>
          )}

          {isLoading && <LoadingSkeleton />}

          {tailoredData && (
            <ScrollArea className="h-full pr-6">
                <div className="space-y-6">
                    <div>
                        <h3 className="font-headline text-lg font-semibold mb-2">New Headline & Summary</h3>
                        <Alert>
                            <AlertDescription className="font-bold">{tailoredData.headline}</AlertDescription>
                            <AlertDescription className="mt-2">{tailoredData.summary}</AlertDescription>
                        </Alert>
                    </div>

                    <div>
                        <h3 className="font-headline text-lg font-semibold mb-2">Rewritten Work Experience</h3>
                         <div className="space-y-4">
                            {tailoredData.workExperience.map((exp, index) => (
                               <div key={index} className="p-4 border rounded-lg">
                                    <p className="font-bold">{exp.title}</p>
                                    <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                                    <p className="text-sm whitespace-pre-wrap">{exp.rewrittenDescription}</p>
                               </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>
          )}
        </div>
        
        <DialogFooter className="pt-4">
            {tailoredData && 
                <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download as .txt
                </Button>
            }
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const LoadingSkeleton = () => (
    <div className="space-y-6">
        <div>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-16 w-full" />
        </div>
        <div>
            <Skeleton className="h-6 w-1/3 mb-4" />
             <div className="space-y-4">
                <div className="p-4 border rounded-lg space-y-2">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                 <div className="p-4 border rounded-lg space-y-2">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        </div>
    </div>
)
