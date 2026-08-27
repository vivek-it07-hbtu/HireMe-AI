import type { ChatResponse } from '../types/chat'
const apiUrl = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000').replace(/\/$/, '')
export const resumeDownloadUrl = `${apiUrl}/resume`
export async function sendMessage(question: string): Promise<ChatResponse> {
  const response = await fetch(`${apiUrl}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question }) })
  if (!response.ok) throw new Error(`Chat request failed (${response.status})`)
  const data: unknown = await response.json()
  if (!data || typeof data !== 'object' || !('answer' in data) || typeof data.answer !== 'string') throw new Error('Unexpected chat response')
  return data as ChatResponse
}
