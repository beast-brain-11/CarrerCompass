import AppLayout from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { applicationsData } from '@/lib/data';
import type { Application } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Building, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const columns: Application['status'][] = ['saved', 'applied', 'interviewing', 'offer', 'rejected'];

const columnTitles: Record<Application['status'], string> = {
  saved: 'Saved',
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Rejected',
  archived: 'Archived',
};

const ApplicationCard = ({ application }: { application: Application }) => (
  <Card className="mb-4 cursor-grab active:cursor-grabbing">
    <CardHeader className="p-4">
      <CardTitle className="text-base font-semibold">{application.jobSnapshot.jobTitle}</CardTitle>
      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
        <Building className="h-4 w-4" />
        <span>{application.jobSnapshot.companyName}</span>
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
        {application.status === 'interviewing' && <Badge>Technical Round</Badge>}
        {application.notes && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{application.notes}</p>}
    </CardContent>
  </Card>
);

export default function TrackerPage() {
  const applicationsByColumn = columns.reduce((acc, status) => {
    acc[status] = applicationsData.filter((app) => app.status === status);
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
          {columns.map((status) => (
            <div key={status} className="w-72 flex-shrink-0">
              <Card className="bg-muted/50 h-full">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-headline flex justify-between items-center">
                    {columnTitles[status]}
                    <Badge variant="secondary">{applicationsByColumn[status].length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {applicationsByColumn[status].length > 0 ? (
                    applicationsByColumn[status].map((app) => (
                      <ApplicationCard key={app.id} application={app} />
                    ))
                  ) : (
                    <div className="text-center text-sm text-muted-foreground py-8">
                      No applications in this stage.
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
