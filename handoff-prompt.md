
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

## 3. What Needs to Be Done: The Backend & Live Data Integration

The critical next step is to replace the placeholder data with a live, persistent backend and real-time data scraping. This is the work required to make the application fully autonomous and ready for public launch.

### 3.1. Task 1: Database & Backend Setup

*   **Objective:** Create a robust backend and database to store all user and application data.
*   **Requirements:**
    1.  **Choose a Backend Framework:** Python (FastAPI, Django) or Node.js (Express) are recommended.
    2.  **Set up a Database:** PostgreSQL is recommended for its relational integrity.
    3.  **Create Database Schema:** Design and implement tables for:
        *   `users`: To store user profile information, preferences, and a link to their Firebase Auth UID.
        *   `jobs`: To store aggregated job postings.
        *   `applications`: To store the relationship between a user and a job, including status, notes, etc.
        *   `work_experience`, `education`, `skills`, etc.
    4.  **Develop API Endpoints:** Create a full suite of RESTful or GraphQL APIs for all CRUD (Create, Read, Update, Delete) operations. Examples:
        *   `POST /api/users` - Create a user profile after initial registration.
        *   `GET /api/users/{userId}/profile` - Fetch a user's full profile.
        *   `PUT /api/users/{userId}/profile` - Update a user's profile.
        *   `GET /api/jobs` - Fetch jobs with filtering and pagination.
        *   `POST /api/applications` - Create a new job application.
        *   `PUT /api/applications/{appId}` - Update an application's status (e.g., for the Kanban board).
    5.  **Secure the API:** Ensure that API endpoints are protected and that users can only access and modify their own data. Use the Firebase Auth UID from the user's session to authorize requests.

### 3.2. Task 2: Real-Time Job Scraping Service

*   **Objective:** Replace the static `jobPostingsData` with a service that continuously scrapes job boards and populates the `jobs` table in the database.
*   **Requirements:**
    1.  **Develop Scrapers:** Build robust web scrapers for key job boards (e.g., LinkedIn, Indeed, Glassdoor). Use libraries like Python's BeautifulSoup/Scrapy or Node.js's Puppeteer/Playwright.
    2.  **Handle Anti-Scraping:** Implement strategies to handle dynamic content (JavaScript-rendered pages) and avoid getting blocked (e.g., rotating user agents, using proxy services like ScrapeNinja).
    3.  **Create a Scheduler:** Set up a scheduled task (e.g., a cron job or a cloud-based scheduler like Google Cloud Scheduler) to run the scrapers periodically (e.g., daily) to find new jobs and update existing ones.
    4.  **Data Normalization:** Process the scraped data to fit the `jobs` table schema, ensuring consistency across different sources.

### 3.3. Task 3: Frontend Integration

*   **Objective:** Connect the existing Next.js frontend to the new backend API, removing all placeholder data.
*   **Requirements:**
    1.  **Replace Placeholder Fetches:** Go through every page and component (especially `/jobs`, `/jobs/[jobId]`, `/tracker`, `/profile`) and replace calls to the placeholder data with `fetch` calls to your new API endpoints.
    2.  **Implement Data Mutations:** Wire up all forms and actions (e.g., saving the profile, adding an application, dragging a card on the tracker) to send `POST`, `PUT`, or `DELETE` requests to the API.
    3.  **Handle Loading & Error States:** Ensure the UI gracefully handles API loading times and potential errors (e.g., show skeletons/spinners, display error messages from the API).
    4.  **Resume Parsing:** Integrate a library (like `pdf-parse`) or an external service to parse uploaded resumes (PDF/DOCX) and pre-fill the user's profile and master resume text area.

---

## 4. Path to Launch

1.  **Build & Integrate Backend:** Complete all tasks in section 3.
2.  **Testing:** Conduct thorough end-to-end testing to ensure the frontend, backend, AI flows, and scrapers all work together flawlessly.
3.  **Deployment:** Deploy the Next.js frontend (e.g., on Vercel or Firebase App Hosting) and the backend server/database (e.g., on a cloud provider like Google Cloud, AWS, or Heroku).
4.  **Launch!**
