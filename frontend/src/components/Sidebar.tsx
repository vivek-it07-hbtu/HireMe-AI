import { Download, Github, Linkedin, MessageSquarePlus, Settings, X, MessageSquare, Trash2 } from 'lucide-react'
import './Sidebar.css'
import { resumeDownloadUrl } from '../services/api'
import type { ChatSession } from '../types/chat'

export default function Sidebar({ 
  open, 
  onClose, 
  onNewChat, 
  hasMessages,
  sessions,
  currentId,
  switchSession,
  deleteSession
}: { 
  open: boolean; 
  onClose: () => void; 
  onNewChat: () => void; 
  hasMessages: boolean;
  sessions: ChatSession[];
  currentId: string | null;
  switchSession: (id: string) => void;
  deleteSession: (id: string) => void;
}) {
 const start = () => { onNewChat(); onClose() }

 return (
  <>
    <div className={open ? 'backdrop visible' : 'backdrop'} onClick={onClose}/>
    <aside className={open ? 'sidebar open' : 'sidebar'}>
      <div className="side-head">
        <button className="side-logo" onClick={start} aria-label="Start a new chat with Vivek Chaudhary">
          <span>V</span>
          <div className="side-identity"><strong>Vivek Chaudhary</strong><small>AI Engineer</small></div>
        </button>
        <button className="icon-button close-side" onClick={onClose} aria-label="Close menu"><X size={19}/></button>
      </div>
      <button className="new-chat" onClick={start}><MessageSquarePlus size={18}/>New Chat</button>
      
      <div className="history-label">Your conversations</div>
      <div className="session-list">
        {sessions.length === 0 ? (
          <div className="history-note">No saved chats.</div>
        ) : (
          sessions.map(session => (
            <div key={session.id} className={`session-item ${session.id === currentId ? 'active' : ''}`}>
              <button 
                className="session-btn" 
                onClick={() => { switchSession(session.id); onClose(); }}
                title={session.title}
              >
                <MessageSquare size={16}/>
                <span>{session.title}</span>
              </button>
              <button 
                className="delete-session-btn" 
                onClick={() => {
                  if (confirm('Delete this conversation?')) {
                    deleteSession(session.id);
                  }
                }}
                aria-label="Delete chat"
              >
                <Trash2 size={15}/>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="side-bottom">
        <a href={resumeDownloadUrl}><Download size={18}/>Download resume</a>
        <a href="https://github.com/vivek-it07-hbtu/HireMe-AI" target="_blank" rel="noreferrer"><Github size={18}/>GitHub</a>
        <a href="https://www.linkedin.com/in/vivek-chaudhary" target="_blank" rel="noreferrer"><Linkedin size={18}/>LinkedIn</a>
        <button onClick={() => alert('Settings are coming soon.')}><Settings size={18}/>Settings</button>
      </div>
    </aside>
  </>
 )
}
