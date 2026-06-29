# AI Testing Automation

AI Testing Automation is a full-stack web application that helps teams connect GitHub repositories, generate AI-powered test cases, and execute browser-based automation tests through Browserbase and Playwright.

It combines a React frontend, an Express backend, MongoDB persistence, Clerk authentication, GitHub OAuth, and Gemini-based test generation into one workflow for QA automation.

## Overview

This project enables users to:

- sign in securely with Clerk
- connect a GitHub account and repository
- analyze repository context
- generate meaningful test cases with AI
- save and review test cases
- run browser automation tests through Browserbase
- view execution logs and results

## Key Features

- Authentication and protected workspace access with Clerk
- GitHub OAuth integration for repository access
- AI-generated test case suggestions using Gemini
- Browser automation execution with Playwright and Browserbase
- Persistent storage of projects, test cases, and execution metadata in MongoDB
- Modern React UI built with Vite and Tailwind-based components

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Clerk Auth
- Tailwind CSS
- shadcn-style UI components

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- GitHub OAuth flow
- Browserbase SDK
- Playwright Core
- Google Gemini AI

## Project Structure

```text
client/           # React frontend
server/           # Express backend
readme/           # Additional project documentation
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- a MongoDB instance available
- a Clerk account and application configured
- a GitHub OAuth app configured
- a Gemini API key
- a Browserbase API key and project ID

## Environment Variables

Create environment files for the server and client as needed.

### Server (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=http://localhost:5000/api/github/callback
BROWSERBASE_API_KEY=your_browserbase_api_key
BROWSERBASE_PROJECT_ID=your_browserbase_project_id
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Client

The frontend should receive the Clerk publishable key through the app configuration used by your environment setup.

## Installation

### 1. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Start the backend

```bash
cd server
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Start the frontend

```bash
cd client
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## How the App Works

1. A user signs in through Clerk.
2. The user connects a GitHub repository.
3. The backend builds repository context from the selected project.
4. Gemini generates test case suggestions based on that context.
5. The user can review and save the generated test cases.
6. The backend creates a Browserbase session and runs Playwright automation against the target application.
7. Results, logs, and session URLs are stored and displayed to the user.

## Main API Areas

- User management
- GitHub OAuth and repository integration
- AI test case generation
- Browserbase execution and automation
- Test case persistence and update flow

## Development Notes

- The frontend is intentionally modular and component-driven.
- Backend logic is organized around controllers, services, routes, and models.
- The automation layer uses generated Playwright scripts and Browserbase to execute them in a browser environment.

## License

This project is currently distributed under the existing repository license configuration.

## Contributing

Contributions are welcome. If you plan to make changes, please keep the existing architecture consistent and validate the frontend build and backend behavior before submitting updates.
