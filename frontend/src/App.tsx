import { useEffect, useState } from 'react'
import { useChat } from './hooks/useChat'
import Chat from './pages/Chat'

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('hireme_theme') === 'dark' || (!localStorage.getItem('hireme_theme') && matchMedia('(prefers-color-scheme: dark)').matches))
  const [sidebar, setSidebar] = useState(false)
  const [toast, setToast] = useState('')

  const chat = useChat()
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('hireme_theme', dark ? 'dark' : 'light') }, [dark])
  const notify = (message: string) => { setToast(message); setTimeout(() => setToast(''), 2200) }

  return <div className={dark ? 'app-shell dark-chat' : 'app-shell'}><Chat messages={chat.messages} sessions={chat.sessions} currentId={chat.currentId} switchSession={chat.switchSession} deleteSession={chat.deleteSession} loading={chat.isLoading} error={chat.error} send={chat.send} clear={chat.clear} sidebar={sidebar} closeSidebar={() => setSidebar(false)} openSidebar={() => setSidebar(true)} dark={dark} toggleDark={() => setDark(value => !value)} notify={notify} />{toast && <div className="toast" role="status">{toast}</div>}</div>
}
