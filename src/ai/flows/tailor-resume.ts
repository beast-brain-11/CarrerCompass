'use server';

/**
 * @fileOverview A resume tailoring AI agent.
 *
 * - tailorResume - A function that handles the resume tailoring process.
 * - TailorResumeInput - The input type for the tailorResume function.
 * - TailorResumeOutput - The return type for the tailorResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorResumeInputSchema = z.object({
  masterResumeText: z
    .string()
    .describe("The user's master resume text content."),
  jobDescriptionText: z.string().describe('The target job description text content.'),
});
export type TailorResumeInput = z.infer<typeof TailorResumeInputSchema>;

const TailorResumeOutputSchema = z.object({
  headline: z.string().describe('The tailored headline for the resume.'),
  summary: z.string().describe('The rewritten professional summary to align with the job description.'),
  workExperience: z.array(
    z.object({
      company: z.string().describe('The company name.'),
      title: z.string().describe('The job title.'),
      rewrittenDescription: z.string().describe('The rewritten description for the work experience, optimized with keywords from the job description and quantified achievements.'),
    })
  ).describe('The tailored work experience entries.'),
});
export type TailorResumeOutput = z.infer<typeof TailorResumeOutputSchema>;

export async function tailorResume(input: TailorResumeInput): Promise<TailorResumeOutput> {
  return tailorResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailorResumePrompt',
  input: {schema: TailorResumeInputSchema},
  output: {schema: TailorResumeOutputSchema},
  prompt: `You are an expert career coach and professional resume writer. Your task is to analyze the user's master resume and a specific job description, and then rewrite the resume to be a perfect, keyword-optimized match for the job, while remaining 100% truthful.

USER's MASTER RESUME:
{{{masterResumeText}}}

TARGET JOB DESCRIPTION:
{{{jobDescriptionText}}}

INSTRUCTIONS:
1.  Carefully analyze the job description to identify the top 5-7 most critical skills, experiences, and qualifications.
2.  Rewrite the professional summary/headline of the resume to directly reflect the target role and incorporate key terms from the job description.
3.  For each work experience entry in the resume, rephrase the bullet points to use powerful action verbs and metrics that align with the requirements in the job description. Do NOT invent new experiences. Only rephrase existing ones to highlight their relevance. Quantify achievements where possible based on the provided resume text.
4.  Ensure the most relevant skills are prominently featured in the rewritten content.
5.  Return the output as a single JSON object with three keys: "headline" (string for the very top of the resume), "summary" (a 2-3 sentence professional summary), and "workExperience" (an array of objects, each with "company", "title", and "rewrittenDescription" keys).`,
});

const tailorResumeFlow = ai.defineFlow(
  {
    name: 'tailorResumeFlow',
    inputSchema: TailorResumeInputSchema,
    outputSchema: TailorResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
