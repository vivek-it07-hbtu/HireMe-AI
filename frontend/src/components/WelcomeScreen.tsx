import { ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, Lightbulb, Sparkles } from 'lucide-react'
import './WelcomeScreen.css'

const prompts = [
  { title: 'About Vivek', text: 'Tell me about Vivek.' },
  { title: 'Technical skills', text: 'What are his strongest technical skills?' },
  { title: 'AI projects', text: 'Explain his AI projects.' },
  { title: 'RAG experience', text: 'What is his experience with RAG?' },
  { title: 'Education', text: 'Tell me about his education.' },
  { title: 'Career fit', text: 'Why would he be a good fit for an AI Engineer role?' },
]

export function ProfileCard({ onChat }: { onChat: () => void }) {
  return <section className="profile-card"><div><p className="eyebrow">CANDIDATE PROFILE</p><h3>Vivek Chaudhary</h3><p>Information Technology student</p></div><div className="tags"><span>Python</span><span>React</span><span>FastAPI</span><span>AI / LLM</span><span>C++</span></div><button onClick={onChat}>Chat with AI <ArrowUpRight size={16}/></button></section>
}

export default function WelcomeScreen({ onPrompt }: { onPrompt: (question: string) => void }) {
  return <div className="welcome">
    <div className="welcome-mark"><Sparkles size={25}/></div>
    <p className="eyebrow">AI PORTFOLIO ASSISTANT</p>
    <h1>Hi, I&apos;m Vivek Chaudhary <span>👋</span></h1>
    <p className="welcome-role">AI Engineer | Generative AI | RAG | Python</p>
    <p className="welcome-subtitle">Explore my experience, projects, skills, and education — or ask my AI anything.</p>
    <ProfileCard onChat={() => onPrompt('Tell me about Vivek.')}/>
    <div className="prompt-grid">{prompts.map((prompt, index) => <button key={prompt.title} onClick={() => onPrompt(prompt.text)}><span>{[<BriefcaseBusiness/>, <Code2/>, <Lightbulb/>, <Sparkles/>, <GraduationCap/>, <BriefcaseBusiness/>][index]}</span><strong>{prompt.title}</strong><small>{prompt.text}</small></button>)}</div>
  </div>
}
