'use server';

/**
 * @fileOverview An AI agent for analyzing skill gaps between a user's skills and a job description.
 *
 * - skillGapAnalyzer - A function that handles the skill gap analysis process.
 * - SkillGapAnalyzerInput - The input type for the skillGapAnalyzer function.
 * - SkillGapAnalyzerOutput - The return type for the skillGapAnalyzer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillGapAnalyzerInputSchema = z.object({
  userSkills: z.array(z.string()).describe('A list of the user\u2019s skills.'),
  jobSkills: z.array(z.string()).describe('A list of the required skills for the job.'),
});
export type SkillGapAnalyzerInput = z.infer<typeof SkillGapAnalyzerInputSchema>;

const SkillGapAnalyzerOutputSchema = z.object({
  matchingSkills: z.array(z.string()).describe('A list of skills that match between the user and the job requirements.'),
  skillGaps: z.array(z.string()).describe('A list of skills required by the job that are missing from the user\u2019s skills.'),
  learningSuggestions: z
    .array(
      z.object({
        skill: z.string().describe('The skill gap that needs to be addressed.'),
        suggestion: z.string().describe('A suggested category of learning resource for the skill gap.'),
      })
    )
    .describe('Suggestions for learning resources to address the skill gaps.'),
});
export type SkillGapAnalyzerOutput = z.infer<typeof SkillGapAnalyzerOutputSchema>;

export async function skillGapAnalyzer(input: SkillGapAnalyzerInput): Promise<SkillGapAnalyzerOutput> {
  return skillGapAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillGapAnalyzerPrompt',
  input: {schema: SkillGapAnalyzerInputSchema},
  output: {schema: SkillGapAnalyzerOutputSchema},
  prompt: `SYSTEM: You are a strategic career advisor. Your goal is to identify the skill gaps between a user's current skillset and the requirements of a target job.

USER's SKILLS:
{{{userSkills}}}

TARGET JOB's REQUIRED SKILLS (extracted):
{{{jobSkills}}}

INSTRUCTIONS:
1.  Compare the two lists of skills.
2.  Identify which of the user's skills are a direct match for the job's requirements.
3.  Identify the critical skills required by the job that are MISSING from the user's skill list. These are the skill gaps.
4.  For each identified skill gap, suggest a category of learning resource (e.g., "Online Courses on Data Visualization", "Books on Agile Methodologies", "Certifications for Cloud Platforms").
5.  Return a JSON object with three keys: "matchingSkills" (array of strings), "skillGaps" (array of strings), and "learningSuggestions" (an array of objects with "skill" and "suggestion" keys).`,
});

const skillGapAnalyzerFlow = ai.defineFlow(
  {
    name: 'skillGapAnalyzerFlow',
    inputSchema: SkillGapAnalyzerInputSchema,
    outputSchema: SkillGapAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

