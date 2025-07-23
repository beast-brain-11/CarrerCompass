import Link from 'next/link';
import { Compass, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Compass className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline">CareerCompass</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h2 className="text-4xl md:text-6xl font-extrabold font-headline text-gray-900 dark:text-gray-50">
            Navigate Your Career with AI Precision
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            CareerCompass is your personal AI co-pilot, helping you find the perfect job, tailor your resume, and ace your interviews.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg">Find Your Next Job</Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
        </section>

        <section id="features" className="bg-muted py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-headline">Why CareerCompass?</h3>
              <p className="text-muted-foreground mt-2">Features designed to give you a competitive edge.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold font-headline">AI-Powered Job Matching</h4>
                <p className="text-muted-foreground mt-2">Our smart algorithms match your unique profile with the best job opportunities, saving you hours of searching.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold font-headline">Resume & Interview Prep</h4>
                <p className="text-muted-foreground mt-2">Get AI-driven feedback to tailor your resume and practice for interviews, so you can land your dream role.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                 <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold font-headline">Application Tracking</h4>
                <p className="text-muted-foreground mt-2">Manage all your job applications in one place with our intuitive Kanban-style tracker. Stay organized and focused.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} CareerCompass. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
