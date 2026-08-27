# HireMe AI Frontend

A responsive React interface for the HireMe AI career assistant. It calls the existing FastAPI and Groq-backed service, so recruiters receive real answers grounded in the candidate résumé.

## Features

- Real `POST /chat` integration, persistent local chat, dark mode, responsive navigation, loading and safe error states.
- Enter sends a message; Shift + Enter creates a line break.

## Tech stack

React, TypeScript, Vite, Tailwind CSS, Lucide React.

## Setup

Copy `.env.example` to `.env`, set `VITE_API_URL=http://localhost:8000`, then run:

```bash
npm install
npm run dev
```

The backend contract is `{ "question": "..." }` to `POST /chat`, returning `{ "answer": "..." }`. Keep API credentials exclusively on the backend.

## Deploy

For Vercel or Netlify, deploy this directory with build command `npm run build` and publish directory `dist`. Set `VITE_API_URL` to the production FastAPI URL. Add the deployed frontend domain to the backend CORS configuration.
