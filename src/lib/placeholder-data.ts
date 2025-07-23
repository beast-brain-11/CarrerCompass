import type { UserProfile, Job, Application } from './types';

// In a real application, this data would be fetched from a database.
// This file provides placeholder data for UI development.

export const userProfileData: UserProfile = {
  fullName: 'Strategic Sarah',
  headline: 'Senior Product Manager',
  phoneNumber: '555-123-4567',
  website: 'sarah.dev',
  linkedIn: 'linkedin.com/in/strategicsarah',
  masterResume: {
    url: '',
    text: `Strategic Sarah
Senior Product Manager | sarah.pm@email.com | 555-123-4567 | linkedin.com/in/strategicsarah

Professional Summary
Results-driven Senior Product Manager with 8+ years of experience leading cross-functional teams to deliver innovative software solutions. Proven ability to translate complex user needs into actionable product roadmaps, driving user engagement and revenue growth. Expertise in Agile methodologies, data analysis, and market research.

Work Experience
Senior Product Manager | TechSolutions Inc. | Jan 2018 - Present
- Led the development and launch of three major products, resulting in a 40% increase in monthly active users.
- Managed the entire product lifecycle from conception to launch, including user research, requirements gathering, and go-to-market strategy.
- Collaborated with engineering, design, and marketing teams to ensure timely delivery of high-quality features.

Product Manager | Innovate Co. | Jun 2015 - Dec 2017
- Drove the roadmap for a key B2B SaaS product, increasing customer retention by 15%.
- Conducted A/B testing and user feedback sessions to iterate on product features.

Education
Master of Business Administration (MBA) | University of Business | 2015
Bachelor of Science in Computer Science | State University | 2013

Skills
Product Management, Agile Methodologies, JIRA, Roadmapping, User Research, Data Analysis, A/B Testing, Go-to-Market Strategy, SQL, Market Research`,
    parsedOn: new Date(),
  },
  workExperience: [
    {
      title: 'Senior Product Manager',
      company: 'TechSolutions Inc.',
      startDate: 'Jan 2018',
      endDate: 'Present',
      description: 'Led the development and launch of three major products, resulting in a 40% increase in monthly active users. Managed the entire product lifecycle from conception to launch.',
      skillsUsed: ['Agile', 'JIRA', 'Roadmapping'],
    },
    {
      title: 'Product Manager',
      company: 'Innovate Co.',
      startDate: 'Jun 2015',
      endDate: 'Dec 2017',
      description: 'Drove the roadmap for a key B2B SaaS product, increasing customer retention by 15%.',
      skillsUsed: ['A/B Testing', 'User Research'],
    },
  ],
  education: [
    {
      institution: 'University of Business',
      degree: 'Master of Business Administration (MBA)',
      gradDate: '2015',
      details: 'Focus on technology management.',
    },
  ],
  skills: ['Product Management', 'Agile', 'JIRA', 'Roadmapping', 'User Research', 'Data Analysis', 'SQL'],
  jobPreferences: {
    titles: ['Senior Product Manager', 'Director of Product'],
    locations: ['San Francisco, CA', 'Remote'],
    workplace: ['remote', 'hybrid'],
    minSalary: 150000,
    experienceLevels: ['Senior', 'Lead'],
  },
};

export const jobPostingsData: Job[] = [
  {
    id: 'job-1',
    jobTitle: 'Senior Product Manager, AI Platforms',
    companyName: 'FutureAI Corp',
    location: 'San Francisco, CA (Remote)',
    descriptionHTML: '<p>Join our team to lead the next generation of AI platforms...</p>',
    descriptionText: `Job Description:
FutureAI Corp is seeking an experienced Senior Product Manager to own the strategy and execution for our core AI platform. You will work with a world-class team of engineers and researchers to build products that redefine industries. The ideal candidate will have a strong technical background, a passion for artificial intelligence, and a proven track record of shipping successful products.

Responsibilities:
- Define and execute the product roadmap for the AI platform.
- Gather and prioritize product and customer requirements.
- Work closely with engineering, design, and marketing to deliver innovative solutions.
- Analyze market trends and competitive landscape.

Qualifications:
- 5+ years of product management experience.
- Experience with AI/ML products is a must.
- Strong understanding of cloud technologies (AWS, GCP, Azure).
- Excellent communication and leadership skills.`,
    sourceURL: 'https://linkedin.com/jobs/view/1',
    sourceSite: 'LinkedIn',
    postedAt: new Date('2024-05-20T10:00:00Z'),
    scrapedAt: new Date(),
    requiredSkills: ['Product Management', 'AI/ML', 'Cloud Technologies', 'Leadership'],
    companyCultureSummary: 'FutureAI Corp fosters a fast-paced, innovative culture where collaboration and data-driven decisions are highly valued. Employees enjoy autonomy and are encouraged to experiment and push the boundaries of AI.',
  },
  {
    id: 'job-2',
    jobTitle: 'Lead Product Manager, Growth',
    companyName: 'ConnectSphere',
    location: 'New York, NY (Hybrid)',
    descriptionHTML: '<p>We are looking for a data-driven Growth PM...</p>',
    descriptionText: `ConnectSphere is looking for a data-driven Lead Product Manager to spearhead our growth initiatives. You will be responsible for identifying and executing on opportunities to grow our user base and increase engagement. You will own the growth funnel, from acquisition to retention, and will use data to inform your decisions.
    
    Responsibilities:
    - Develop and execute a growth strategy.
    - Analyze data to identify growth opportunities.
    - Run A/B tests and other experiments.
    - Work with marketing and engineering to launch new features.
    
    Qualifications:
    - 7+ years of product management experience, with a focus on growth.
    - Strong analytical skills.
    - Experience with A/B testing platforms.`,
    sourceURL: 'https://indeed.com/jobs/view/2',
    sourceSite: 'Indeed',
    postedAt: new Date('2024-05-18T14:30:00Z'),
    scrapedAt: new Date(),
    requiredSkills: ['Product Management', 'Growth Hacking', 'A/B Testing', 'Data Analysis', 'SQL'],
  },
  {
    id: 'job-3',
    jobTitle: 'Product Manager, Mobile',
    companyName: 'MobileFirst Apps',
    location: 'Austin, TX',
    descriptionHTML: '<p>We are a mobile-first company looking for a PM...</p>',
    descriptionText: `This is a job description for a mobile product manager.`,
    sourceURL: 'https://example.com/jobs/3',
    sourceSite: 'Company Website',
    postedAt: new Date('2024-05-19T11:00:00Z'),
    scrapedAt: new Date(),
    requiredSkills: ['Mobile Products', 'iOS', 'Android', 'User Engagement'],
  },
    {
    id: 'job-4',
    jobTitle: 'Technical Program Manager',
    companyName: 'QuantumLeap',
    location: 'Boston, MA',
    descriptionHTML: '<p>Manage complex engineering projects...</p>',
    descriptionText: `We are seeking a Technical Program Manager to drive our most ambitious projects. You will coordinate between multiple engineering teams, define project schedules, and mitigate risks to ensure successful delivery of our next-generation quantum computing hardware.`,
    sourceURL: 'https://example.com/jobs/4',
    sourceSite: 'Company Website',
    postedAt: new Date('2024-05-23T09:00:00Z'),
    scrapedAt: new Date(),
    requiredSkills: ['Program Management', 'Agile', 'JIRA', 'Risk Management'],
  },
];

export const applicationsData: Application[] = [
    {
        id: 'app-1',
        userId: 'user-123',
        jobId: 'job-1',
        jobSnapshot: jobPostingsData[0],
        status: 'interviewing',
        appliedAt: new Date('2024-05-21T09:00:00Z'),
        notes: 'First round with hiring manager went well. Technical screen next week.',
        contacts: [{ name: 'Jane Doe', title: 'Recruiter', linkedIn: 'linkedin.com/in/janedoe' }],
    },
    {
        id: 'app-2',
        userId: 'user-123',
        jobId: 'job-2',
        jobSnapshot: jobPostingsData[1],
        status: 'applied',
        appliedAt: new Date('2024-05-22T15:00:00Z'),
        notes: 'Applied through the company portal.',
        contacts: [],
    },
    {
        id: 'app-3',
        userId: 'user-123',
        jobId: 'job-3',
        jobSnapshot: jobPostingsData[2],
        status: 'saved',
        notes: 'Looks interesting, need to tailor resume before applying.',
        contacts: [],
    },
    {
        id: 'app-4',
        userId: 'user-123',
        jobId: 'job-4',
        jobSnapshot: jobPostingsData[3],
        status: 'saved',
        notes: 'Need to research quantum computing basics before applying.',
        contacts: [],
    }
];
