'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Application } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Building, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const columnsConfig: { id: Application['status']; title: string }[] = [
  { id: 'interested', title: 'Interested' },
  { id: 'applied', title: 'Applied' },
  { id: 'interviewing', title: 'Interviewing' },
  { id: 'offer', title: 'Offer' },
  { id: 'rejected', title: 'Rejected' },
];

const ApplicationCard = ({ application, onDragStart }: { application: Application, onDragStart: (e: React.DragEvent<HTMLDivElement>, appId: string, sourceStatus: Application['status']) => void }) => (
  <Card 
    className="mb-4 cursor-grab active:cursor-grabbing"
    draggable
    onDragStart={(e) => onDragStart(e, application.id, application.status)}
  >
    <CardHeader className="p-4">
      <CardTitle className="text-base font-semibold">{application.title}</CardTitle>
      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
        <Building className="h-4 w-4" />
        <span>{application.company_name}</span>
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
        {application.status === 'interviewing' && <Badge>Technical Round</Badge>}
        {application.notes && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{application.notes}</p>}
    </CardContent>
  </Card>
);

export default function TrackerPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true);
            try {
                const data = await api.get('/applications');
                setApplications(data);
            } catch (error) {
                console.error("Failed to fetch applications", error);
                toast({
                    title: "Error",
                    description: "Failed to load applications.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchApplications();
    }, [toast]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, appId: string, sourceStatus: Application['status']) => {
        e.dataTransfer.setData("applicationId", appId);
        e.dataTransfer.setData("sourceStatus", sourceStatus);
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetStatus: Application['status']) => {
        e.preventDefault();
        const applicationId = e.dataTransfer.getData("applicationId");
        
        const originalApplications = applications;
        const updatedApplications = applications.map(app => 
            app.id === applicationId ? { ...app, status: targetStatus } : app
        );
        setApplications(updatedApplications);

        try {
            await api.put(`/applications/${applicationId}`, { status: targetStatus });
        } catch (error) {
            setApplications(originalApplications);
            console.error("Failed to update application status", error);
            toast({
                title: "Error",
                description: "Failed to update application status.",
                variant: "destructive",
            });
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };


  const applicationsByColumn = columnsConfig.reduce((acc, col) => {
    acc[col.id] = applications.filter((app) => app.status === col.id);
    return acc;
  }, {} as Record<Application['status'], Application[]>);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline font-bold">Application Tracker</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Application
          </Button>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columnsConfig.map((col) => (
            <div 
                key={col.id} 
                className="w-72 flex-shrink-0"
                onDrop={(e) => handleDrop(e, col.id)}
                onDragOver={handleDragOver}
            >
              <Card className="bg-muted/50 h-full">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-headline flex justify-between items-center">
                    {col.title}
                    <Badge variant="secondary">{applicationsByColumn[col.id]?.length || 0}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 min-h-[200px]">
                  {applicationsByColumn[col.id]?.length > 0 ? (
                    applicationsByColumn[col.id].map((app) => (
                      <ApplicationCard key={app.id} application={app} onDragStart={handleDragStart}/>
                    ))
                  ) : (
                    <div className="text-center text-sm text-muted-foreground py-8">
                      Drop applications here.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
