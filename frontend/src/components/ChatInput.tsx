import { ArrowUp, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './ChatInput.css'

export default function ChatInput({ onSend, disabled }: { onSend: (question: string) => void; disabled: boolean }) {
  const [text, setText] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { ref.current?.focus() }, [])

  const submit = () => {
    if (!disabled && text.trim()) {
      onSend(text)
      setText('')
    }
  }

  return <form className="chat-input" onSubmit={event => { event.preventDefault(); submit() }}>
    <textarea
      ref={ref}
      value={text}
      onChange={event => setText(event.target.value)}
      onKeyDown={event => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault()
          submit()
        }
      }}
      placeholder="Ask Vivek..."
      aria-label="Ask Vivek"
      aria-busy={disabled}
      rows={1}
    />
    <button className="premium-send" type="submit" disabled={disabled || !text.trim()} aria-label="Send message"><Sparkles size={16}/><ArrowUp className="send-arrow" size={11}/></button>
    <small>Enter to send · Shift + Enter for a new line</small>
  </form>
}
