'use server';

/**
 * @fileOverview An AI Mock Interviewer agent.
 *
 * - aiMockInterviewer - A function that drives the mock interview process.
 * - AiMockInterviewerInput - The input type for the aiMockInterviewer function.
 * - AiMockInterviewerOutput - The return type for the aiMockInterviewer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiMockInterviewerInputSchema = z.object({
  stage: z.string().describe('The stage of the interview (e.g., Phone Screen, Technical Round, Final).'),
  jobDescription: z.string().describe('The job description for the role the user is interviewing for.'),
  userResume: z.string().describe('The user resume text.'),
  lastQuestion: z.string().optional().describe('The last question asked by the interviewer.'),
  lastAnswer: z.string().optional().describe('The last answer given by the user.'),
});
export type AiMockInterviewerInput = z.infer<typeof AiMockInterviewerInputSchema>;

const AiMockInterviewerOutputSchema = z.object({
  question: z.string().describe('The next question to ask the candidate.'),
  feedback: z.string().optional().describe('Feedback on the candidate\'s previous answer.'),
});
export type AiMockInterviewerOutput = z.infer<typeof AiMockInterviewerOutputSchema>;

export async function aiMockInterviewer(input: AiMockInterviewerInput): Promise<AiMockInterviewerOutput> {
  return aiMockInterviewerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMockInterviewerPrompt',
  input: {schema: AiMockInterviewerInputSchema},
  output: {schema: AiMockInterviewerOutputSchema},
  prompt: `You are an AI mock interviewer. Your goal is to simulate a realistic interview experience for the candidate, Strategic Sarah.

You will ask one question at a time, wait for the candidate's answer, and provide constructive feedback.

Consider the stage of the interview, the job description, and the candidate's resume when formulating your questions and feedback. The stage of the interview is {{{stage}}}.

Job Description: {{{jobDescription}}}

Candidate Resume: {{{userResume}}}

{% if lastQuestion %}
Candidate was asked: {{{lastQuestion}}}
Candidate answered: {{{lastAnswer}}}
Now, provide feedback on the candidate's answer. Be specific and constructive. What did they do well? What could they improve?
{% endif %}

Now formulate the next interview question. Focus on assessing the candidate's skills, experience, and fit for the role. Make sure the question is open-ended and encourages the candidate to elaborate.

Return a JSON object with the keys \"question\" and \"feedback\". If this is the first question, leave feedback blank.
`,
});

const aiMockInterviewerFlow = ai.defineFlow(
  {
    name: 'aiMockInterviewerFlow',
    inputSchema: AiMockInterviewerInputSchema,
    outputSchema: AiMockInterviewerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
