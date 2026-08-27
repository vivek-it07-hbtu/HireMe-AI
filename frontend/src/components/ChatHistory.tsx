import React from 'react';
import type { Message } from '../types/chat';

const STORAGE_KEY = 'hireme_chat_history';

export default function ChatHistory({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load chat history', e);
    }
  }, []);

  return (
    <div className="chat-history-modal">
      <div className="modal-header">
        <h2>Chat History</h2>
        <button onClick={onClose} aria-label="Close history">✕</button>
      </div>
      <div className="modal-body">
        {messages.length === 0 ? (
          <p>No messages saved.</p>
        ) : (
          <ul className="history-list">
            {messages.map((msg) => (
              <li key={msg.id} className={msg.role === 'assistant' ? 'assistant' : 'user'}>
                <strong>{msg.role}:</strong> {msg.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
