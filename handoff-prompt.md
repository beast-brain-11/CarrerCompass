
# Project Handoff: CareerCompass - AI Career Co-Pilot

## 1. Project Vision

The goal is to build and launch **CareerCompass**, a fully autonomous, real-time, AI-powered platform for job seekers. It will aggregate job listings, provide intelligent assistance for resume tailoring and interview preparation, and help users manage their application process seamlessly. The core tenant is to move beyond static, hardcoded data and create a live, dynamic, and intelligent experience for the user.

---

## 2. What Has Been Done: The Frontend & AI Core

We have successfully built a robust frontend application and integrated the core AI intelligence using Next.js and Google's Genkit. The application is feature-rich from a UI and AI logic perspective, but currently uses placeholder data for the job feed and user data persistence.

### 2.1. Technology Stack
*   **Framework:** Next.js 15+ (with App Router)
*   **Language:** TypeScript
*   **UI:** ShadCN UI & TailwindCSS
*   **AI Toolkit:** Genkit (for connecting to Google's Gemini models)
*   **Authentication:** Firebase Authentication

### 2.2. Core Features Implemented (UI & AI Logic)

*   **User Authentication:**
    *   Fully functional user sign-up and login system using Firebase Auth (Email/Password & Google Sign-In).
    *   Protected routes and session management are handled via a custom `useAuth` hook.
    *   A basic "admin" bypass is implemented for the email `priaanshgupta@gmail.com` to skip the initial user survey.

*   **Pages & Components:**
    *   A complete set of pages: Landing, Register/Login, Onboarding Survey, Dashboard, Job Feed, Job Details, Application Tracker, Profile, and Interview Prep.
    *   The UI is responsive and built with modern, reusable React components.

*   **AI-Powered "Career Co-Pilot" (Powered by Genkit):**
    *   **AI Resume Tailor:** A Genkit flow analyzes a job description and the user's master resume to provide tailored suggestions. This is fully functional on the Job Details page.
    *   **AI Skill Gap Analyzer:** A Genkit flow compares a user's skills to a job's requirements, identifies gaps, and suggests learning resources. This is fully functional.
    *   **AI Company Culture Summarizer:** A Genkit flow uses real-time information to generate a summary of a company's culture. This is fully functional.
    *   **AI Mock Interviewer:** A conversational AI agent that simulates a job interview based on the specific role and the user's resume, providing feedback on their answers. This is fully functional on the Interview Prep page.

---

## 3. What Has Been Done: The Backend & Live Data Integration

The placeholder data has been replaced with a live, persistent backend.

### 3.1. Task 1: Database & Backend Setup (Completed)

*   **Objective:** Create a robust backend and database to store all user and application data.
*   **Status: Completed**
    *   **Backend Framework:** Node.js with Express and TypeScript.
    *   **Database:** PostgreSQL schema has been created (`server/schema.sql`).
    *   **API Endpoints:** A full suite of RESTful APIs for all CRUD operations has been developed.
    *   **Security:** The API is secured using Firebase Admin to verify user tokens.

### 3.2. Task 2: Frontend Integration (Completed)

*   **Objective:** Connect the existing Next.js frontend to the new backend API, removing all placeholder data.
*   **Status: Completed**
    *   **Placeholder Fetches Replaced:** All pages and components now fetch data from the live backend.
    *   **Data Mutations Implemented:** All forms and actions are wired up to the backend.
    *   **Loading & Error States Handled:** The UI gracefully handles loading and error states.
    *   **Resume Parsing:** A `pdf-parse` integration allows users to upload and parse their resumes.

---

## 4. What Needs to Be Done: Real-Time Job Scraping

The final step to make the application fully autonomous is to build the real-time job scraping service.

### 4.1. Task: Real-Time Job Scraping Service

*   **Objective:** Replace the need for manual job entry with a service that continuously scrapes job boards and populates the `jobs` table in the database.
*   **Requirements:**
    1.  **Develop Scrapers:** Build robust web scrapers for key job boards (e.g., LinkedIn, Indeed, Glassdoor). Use libraries like Python's BeautifulSoup/Scrapy or Node.js's Puppeteer/Playwright.
    2.  **Handle Anti-Scraping:** Implement strategies to handle dynamic content (JavaScript-rendered pages) and avoid getting blocked (e.g., rotating user agents, using proxy services like ScrapeNinja).
    3.  **Create a Scheduler:** Set up a scheduled task (e.g., a cron job or a cloud-based scheduler like Google Cloud Scheduler) to run the scrapers periodically (e.g., daily) to find new jobs and update existing ones.
    4.  **Data Normalization:** Process the scraped data to fit the `jobs` table schema, ensuring consistency across different sources.

---

## 5. Path to Launch

1.  **Build Job Scraping Service:** Complete the final task.
2.  **Testing:** Conduct thorough end-to-end testing to ensure the frontend, backend, AI flows, and scrapers all work together flawlessly.
3.  **Deployment:** Deploy the Next.js frontend (e.g., on Vercel or Firebase App Hosting) and the backend server/database (e.g., on a cloud provider like Google Cloud, AWS, or Heroku).
4.  **Launch!**
