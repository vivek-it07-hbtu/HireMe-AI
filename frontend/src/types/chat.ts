export type Message = { id: string; role: 'user' | 'assistant'; content: string; timestamp: string }
export type ChatSession = { id: string; title: string; messages: Message[]; updatedAt: string }
export type ChatResponse = { answer: string }
