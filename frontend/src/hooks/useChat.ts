import { useCallback, useEffect, useState } from 'react'
import { sendMessage } from '../services/api'
import type { Message, ChatSession } from '../types/chat'

const STORAGE_KEY = 'hireme_chat_sessions'
const CURRENT_ID_KEY = 'hireme_current_session'

const newMessage = (role: Message['role'], content: string): Message => ({ id: crypto.randomUUID(), role, content, timestamp: new Date().toISOString() })
const loadSessions = (): ChatSession[] => { try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) : [] } catch { return [] } }

export function useChat() {
  const [sessions, setSessions] = useState<ChatSession[]>(loadSessions)
  const [currentId, setCurrentId] = useState<string | null>(() => localStorage.getItem(CURRENT_ID_KEY))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Migration from old history
  useEffect(() => {
    const oldHistory = localStorage.getItem('hireme_chat_history');
    if (oldHistory && sessions.length === 0) {
       try {
          const parsed = JSON.parse(oldHistory);
          if (parsed.length > 0) {
             const newSession: ChatSession = { 
               id: crypto.randomUUID(), 
               title: parsed[0].content.slice(0, 30), 
               messages: parsed, 
               updatedAt: new Date().toISOString() 
             };
             setSessions([newSession]);
             setCurrentId(newSession.id);
          }
       } catch(e) {}
       localStorage.removeItem('hireme_chat_history');
    }
  }, [sessions.length]);

  useEffect(() => { 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    if (currentId) localStorage.setItem(CURRENT_ID_KEY, currentId);
    else localStorage.removeItem(CURRENT_ID_KEY);
  }, [sessions, currentId])

  const currentSession = sessions.find(s => s.id === currentId)
  const messages = currentSession?.messages || []

  const send = useCallback(async (question: string) => {
    const trimmed = question.trim(); if (!trimmed || isLoading) return
    setError(null); setIsLoading(true)
    
    let activeId = currentId;
    let activeSessions = [...sessions];
    
    if (!activeId) {
      activeId = crypto.randomUUID();
      const newSession: ChatSession = { 
        id: activeId, 
        title: trimmed.slice(0, 30) + (trimmed.length > 30 ? '...' : ''), 
        messages: [], 
        updatedAt: new Date().toISOString() 
      };
      activeSessions = [newSession, ...activeSessions];
      setCurrentId(activeId);
    }

    const userMsg = newMessage('user', trimmed);
    activeSessions = activeSessions.map(s => 
      s.id === activeId ? { ...s, messages: [...s.messages, userMsg], updatedAt: new Date().toISOString() } : s
    );
    setSessions(activeSessions);

    try { 
      const { answer } = await sendMessage(trimmed); 
      const botMsg = newMessage('assistant', answer);
      setSessions(prev => prev.map(s => 
        s.id === activeId ? { ...s, messages: [...s.messages, botMsg], updatedAt: new Date().toISOString() } : s
      ));
    }
    catch (technicalError) { console.error('HireMe AI chat error:', technicalError); setError(trimmed) }
    finally { setIsLoading(false) }
  }, [isLoading, currentId, sessions])

  const clear = useCallback(() => { setCurrentId(null); setError(null) }, [])
  const switchSession = useCallback((id: string) => { setCurrentId(id); setError(null) }, [])
  const deleteSession = useCallback((id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentId === id) setCurrentId(null);
  }, [currentId])

  return { messages, sessions, currentId, isLoading, error, send, clear, switchSession, deleteSession }
}
