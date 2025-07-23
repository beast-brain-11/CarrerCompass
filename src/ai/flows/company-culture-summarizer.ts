'use server';

/**
 * @fileOverview Summarizes the culture of a company based on publicly available information.
 *
 * - summarizeCompanyCulture - A function that takes a company name and generates a culture summary.
 * - CompanyCultureInput - The input type for the summarizeCompanyCulture function.
 * - CompanyCultureOutput - The return type for the summarizeCompanyCulture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompanyCultureInputSchema = z.object({
  companyName: z.string().describe('The name of the company to summarize the culture for.'),
});
export type CompanyCultureInput = z.infer<typeof CompanyCultureInputSchema>;

const CompanyCultureOutputSchema = z.object({
  cultureSummary: z.string().describe('A summary of the company culture.'),
});
export type CompanyCultureOutput = z.infer<typeof CompanyCultureOutputSchema>;

export async function summarizeCompanyCulture(input: CompanyCultureInput): Promise<CompanyCultureOutput> {
  return summarizeCompanyCultureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'companyCulturePrompt',
  input: {schema: CompanyCultureInputSchema},
  output: {schema: CompanyCultureOutputSchema},
  prompt: `You are an expert in analyzing company culture. Based on the company name provided, you will research and summarize the company's culture.

  Company Name: {{{companyName}}}
  
  Instructions:
  1. Research the company culture using publicly available information (e.g., company website, Glassdoor, LinkedIn, news articles).
  2. Identify key aspects of the company culture, such as values, work environment, employee relationships, and leadership style.
  3. Summarize the company culture in a concise and informative paragraph.
  4. Ensure the summary is objective and unbiased.
  5. If no information is found return 'No information found'.

  Culture Summary:`,
});

const summarizeCompanyCultureFlow = ai.defineFlow(
  {
    name: 'summarizeCompanyCultureFlow',
    inputSchema: CompanyCultureInputSchema,
    outputSchema: CompanyCultureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
