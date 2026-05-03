/**
 * Optional LLM bridge for the campus assistant.
 *
 * **Recommended APIs (call from your own backend only — never expose provider keys in the client):**
 * - [OpenAI Chat Completions](https://platform.openai.com/docs/api-reference/chat) or Responses API
 * - [Anthropic Messages](https://docs.anthropic.com/en/api/messages)
 * - [Google Gemini generateContent](https://ai.google.dev/gemini-api/docs)
 *
 * Default in dev: `POST /api/chat` (Vite plugin + `OPENAI_API_KEY` — see repo root `vite-plugin-assistant-api.ts`).
 * Production: implement the same contract behind `VITE_ASSISTANT_API_URL` (full URL or base + `/chat`).
 * Return JSON `{ "reply": "..." }`. Never expose provider API keys to the client (`VITE_*`).
 *
 * When the assistant HTTP call fails, the client may show a server `error` string; otherwise it falls back to the keyword helper.
 */
export type AssistantMessage = { role: "user" | "assistant"; content: string };

export async function fetchAssistantReply(messages: AssistantMessage[]): Promise<string | null> {
  const raw = import.meta.env.VITE_ASSISTANT_API_URL?.trim();
  /** Dev server plugin `assistantApiPlugin` serves same-origin `/api/chat` when `OPENAI_API_KEY` is set. */
  const url = raw
    ? raw.includes("/chat")
      ? raw
      : `${raw.replace(/\/$/, "")}/chat`
    : "/api/chat";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.slice(-12) }),
    });
    const data: unknown = await res.json().catch(() => null);
    if (typeof data !== "object" || data === null) return null;

    const reply = (data as { reply?: unknown }).reply;
    if (typeof reply === "string" && reply.trim()) return reply;

    const err = (data as { error?: unknown }).error;
    if (!res.ok && typeof err === "string" && err.trim()) return err.trim();

    return null;
  } catch {
    return null;
  }
}
