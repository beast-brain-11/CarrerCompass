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
  userSkills: z.array(z.string()).describe("A list of the user’s skills from their profile."),
  jobDescriptionText: z.string().describe('The full text of the target job description.'),
});
export type SkillGapAnalyzerInput = z.infer<typeof SkillGapAnalyzerInputSchema>;

const SkillGapAnalyzerOutputSchema = z.object({
  requiredSkills: z.array(z.string()).describe('A list of skills explicitly mentioned or inferred from the job description.'),
  matchingSkills: z.array(z.string()).describe('A list of skills that match between the user and the job requirements.'),
  skillGaps: z.array(z.string()).describe('A list of skills required by the job that are missing from the user’s skills.'),
  learningSuggestions: z
    .array(
      z.object({
        skill: z.string().describe('The skill gap that needs to be addressed.'),
        suggestion: z.string().describe('A specific, actionable suggestion for a learning resource or project to address the skill gap.'),
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
{{#each userSkills}}
- {{{this}}}
{{/each}}

TARGET JOB DESCRIPTION:
{{{jobDescriptionText}}}

INSTRUCTIONS:
1.  Read the entire job description and extract a list of all required skills. Infer skills from tools, technologies, and responsibilities mentioned.
2.  Compare the user's skill list with the extracted list of required job skills.
3.  Identify which of the user's skills are a direct match for the job's requirements.
4.  Identify the critical skills required by the job that are MISSING from the user's skill list. These are the skill gaps.
5.  For each identified skill gap, provide a concrete and actionable learning suggestion. For example, instead of "Online Courses", suggest "Build a small project using React and a public API to demonstrate state management" or "Take the 'Google Data Analytics Professional Certificate' on Coursera".
6.  Return a JSON object with four keys: "requiredSkills" (array of strings), "matchingSkills" (array of strings), "skillGaps" (array of strings), and "learningSuggestions" (an array of objects with "skill" and "suggestion" keys).`,
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
