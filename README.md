# HireMe AI

HireMe AI is an AI-powered portfolio and career assistant for **Vivek Chaudhary**. It lets recruiters and interviewers ask natural-language questions about the candidate's skills, projects, experience, and education. Every answer is grounded in the candidate's résumé.

## What is implemented

- AI chat interface for résumé-based questions
- PDF résumé download from the sidebar
- Groq-powered résumé parsing and answer generation
- Conversation history stored in browser local storage
- New, switch, delete, and retry chat conversations
- Dark/light theme support and responsive sidebar
- AI portfolio hero with role highlights: AI Engineer, Generative AI, RAG, and Python
- Professional GitHub and LinkedIn links
- Premium Sparkles + arrow send button
- Safe UI error state when the backend or AI provider is unavailable

## Tech stack and tools

| Area | Tool / technology | Purpose |
| --- | --- | --- |
| Frontend | React 19 + TypeScript | User interface and typed application code |
| Build tool | Vite | Local development server and production build |
| Styling | Tailwind CSS + custom CSS | Responsive design, theme, and component styling |
| Icons | Lucide React | Chat, Sparkles, GitHub, LinkedIn, and UI icons |
| Backend | FastAPI | REST API for chat and résumé download |
| AI provider | Groq | Parses the résumé and generates grounded answers |
| AI model | `openai/gpt-oss-120b` | Used through the Groq API |
| PDF processing | pypdf | Extracts text from the résumé PDF |
| Validation | Pydantic | Validates chat and résumé data models |
| Configuration | python-dotenv | Loads backend environment variables locally |
| Python packages | uv | Dependency and lock-file management |

## How it works

```text
Recruiter question
       |
       v
React + Vite frontend
       |
       | POST /chat { "question": "..." }
       v
FastAPI backend
       |
       +--> Extracts text from backend/my_resume.pdf
       +--> Groq parses the résumé into structured data
       +--> Groq answers only from that structured data
       |
       v
{ "answer": "..." }
       |
       v
Chat response shown in the UI
```

The backend prompt explicitly tells the model not to invent information. If the résumé does not contain an answer, it should say that it does not have enough information.

## Project structure

```text
hiremeai/
├── backend/
│   ├── main.py              # FastAPI routes and Groq integration
│   ├── my_resume.pdf        # Candidate résumé used as source data
│   └── pyproject.toml       # Backend dependencies
├── frontend/
│   ├── src/components/      # Chat, sidebar, welcome, and UI components
│   ├── src/hooks/useChat.ts # Chat state and local-storage history
│   ├── src/services/api.ts  # Frontend API client
│   ├── .env.example         # Frontend API URL example
│   └── package.json         # Frontend scripts and dependencies
├── pyproject.toml           # Root uv workspace configuration
└── uv.lock                  # Locked Python dependencies for the workspace
```

## Run locally

### 1. Configure the backend

Create `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key
```

Never commit this file or paste the key in frontend code.

Start the FastAPI backend from the project root:

```powershell
cd backend
..\.venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000
```

The API will be available at `http://127.0.0.1:8000`.

### 2. Configure and start the frontend

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Then run:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://127.0.0.1:5173` in the browser.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | Basic backend health response |
| `GET` | `/resume` | Downloads Vivek's résumé PDF |
| `POST` | `/chat` | Sends a recruiter question to the AI assistant |

### Chat request example

```json
{ "question": "What are Vivek's strongest technical skills?" }
```

### Chat response example

```json
{ "answer": "..." }
```

## Verify the frontend

```powershell
cd frontend
npm run lint
npm run build
```

`npm run build` produces the deployable frontend in `frontend/dist`.

## Deployment checklist

Deploy the frontend and backend separately.

1. Deploy `frontend` to Vercel, Netlify, or another static hosting provider.
2. Deploy `backend` to a Python hosting provider such as Render or Railway.
3. Set `GROQ_API_KEY` in the **backend** host's environment variables.
4. Set `VITE_API_URL` in the **frontend** host's environment variables to the deployed backend URL.
5. Add the deployed frontend URL to FastAPI CORS `allow_origins` in `backend/main.py`.
6. Use this backend start command, with `backend` as the working directory:

   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

> Important: Do not deploy with `localhost` or `127.0.0.1` as `VITE_API_URL`; those addresses work only on your computer.

## Profiles

- GitHub: https://github.com/vivek-it07-hbtu/HireMe-AI
- LinkedIn: https://www.linkedin.com/in/vivek-chaudhary
