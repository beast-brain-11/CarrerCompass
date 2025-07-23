'use client';

import { useState, useRef, useEffect } from 'react';
import { aiMockInterviewer } from '@/ai/flows/ai-mock-interviewer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Lightbulb, CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MockInterviewerProps {
  jobDescription: string;
  userResume: string;
}

interface Message {
  role: 'interviewer' | 'user' | 'feedback';
  content: string;
}

export default function MockInterviewer({ jobDescription, userResume }: MockInterviewerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [stage] = useState<'Phone Screen' | 'Technical Round' | 'Final'>('Phone Screen');

  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const startInterview = async () => {
    setIsLoading(true);
    setInterviewStarted(true);
    setMessages([]);
    try {
      const response = await aiMockInterviewer({
        stage,
        jobDescription,
        userResume,
      });
      setMessages([{ role: 'interviewer', content: response.question }]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error starting interview',
        description: 'Could not connect to the AI interviewer. Please try again.',
      });
      setInterviewStarted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const lastQuestion = messages.find(m => m.role === 'interviewer')?.content || '';

    try {
        const response = await aiMockInterviewer({
            stage,
            jobDescription,
            userResume,
            lastQuestion,
            lastAnswer: userInput,
        });

        const updatedMessages: Message[] = [...newMessages];
        if (response.feedback) {
            updatedMessages.push({ role: 'feedback', content: response.feedback });
        }
        updatedMessages.push({ role: 'interviewer', content: response.question });
        setMessages(updatedMessages);

    } catch (error) {
         toast({
            variant: 'destructive',
            title: 'Error',
            description: 'There was an issue getting a response from the AI. Please try again.',
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  if (!interviewStarted) {
    return (
        <div className="text-center p-8 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Ready to practice?</h3>
            <p className="text-muted-foreground mb-4">Start a mock interview tailored to this job and your resume.</p>
            <Button onClick={startInterview} disabled={isLoading}>
                {isLoading ? 'Starting...' : 'Start Mock Interview'}
            </Button>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-[60vh]">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
            )}>
              {message.role !== 'user' && (
                <div className={cn(
                    "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                    message.role === 'interviewer' && 'bg-primary text-primary-foreground',
                    message.role === 'feedback' && 'bg-amber-500 text-white'
                )}>
                  {message.role === 'interviewer' ? <Bot size={18}/> : <Lightbulb size={18}/>}
                </div>
              )}
              
              {message.role === 'feedback' ? (
                <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
                    <AlertDescription className="text-amber-800 dark:text-amber-200">{message.content}</AlertDescription>
                </Alert>
              ) : (
                <div className={cn(
                    'max-w-md p-3 rounded-lg',
                    message.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-muted'
                )}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              )}

              {message.role === 'user' && (
                 <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <User size={18}/>
                </div>
              )}
            </div>
          ))}
           {isLoading && <Skeleton className="h-20 w-1/2" />}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer here..."
            className="pr-20"
            rows={2}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                }
            }}
          />
          <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-2">
            <p className="text-xs text-muted-foreground hidden md:block"><CornerDownLeft size={12} className="inline"/> to send</p>
            <Button type="submit" size="icon" disabled={isLoading || !userInput.trim()}>
                <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
