import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchAssistantReply } from "@/lib/assistant-client";
import { FB_MESSENGER_CHAT_URL } from "@/lib/app-config";

type Msg = { role: "user" | "assistant"; text: string };

const QUICK = [
  "How does .edu verification work?",
  "Top matches vs browsing?",
  "Messenger safety tips",
  "Report a suspicious listing",
] as const;

function replyFor(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("verify") || q.includes("edu") || q.includes("email") || q.includes("otp"))
    return "Sign in with your @utdallas.edu email — we email a one-time link and a 6-digit campus code. Only verified students can post or message, which cuts scams compared to open marketplaces.";
  if (q.includes("match") || q.includes("top 5") || q.includes("smart"))
    return "Add budget, dates, and distance from campus. We rank your top 5 verified subleases so you spend minutes deciding, not hours scrolling.";
  if (q.includes("messenger") || q.includes("facebook") || q.includes("message"))
    return "After you match, you can continue the thread in Facebook Messenger using your connected profile — while SubletSync still tracks the shared checklist (tour, lease, move-in) so nothing falls through.";
  if (q.includes("scam") || q.includes("fraud") || q.includes("safe") || q.includes("report"))
    return "Keep payments in-platform, tour before you send money, and use one-tap reporting. Listings require lease docs + AI scan; our Trust team reviews flags within hours.";
  if (q.includes("northside") || q.includes("utd") || q.includes("campus"))
    return "Northside is steps from Synergy Park and popular for summer subleases. Filter by “Northside” on the marketplace or bump up distance in Smart Matching to see Waterview and UV.";
  if (q.includes("post") || q.includes("list"))
    return "From Verified Listings: confirm .edu, upload student ID and lease, add photos and rent — your badges (Verified student, Lease on file) show automatically on the card.";
  return "I’m here for sublease questions — try a quick prompt below, or ask about verification, Messenger, safety, or Northside. You can also open the full marketplace any time.";
}

function ChatMessage({ role, text }: Msg) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[90%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted/90 text-foreground rounded-bl-md border border-border/60",
        )}
      >
        {!isUser && (
          <span className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3" />
            SubletSync
          </span>
        )}
        {text}
      </div>
    </div>
  );
}

export function SyncChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi — I’m your SubletSync guide. Ask anything about UTD verification, smart matches, Messenger handoff, or staying safe while subleasing.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const assistantEndpointRemote = Boolean(import.meta.env.VITE_ASSISTANT_API_URL?.trim());

  const send = useCallback(
    async (raw: string) => {
      const t = raw.trim();
      if (!t || loading) return;

      const historyBefore = msgs;
      const userMsg: Msg = { role: "user", text: t };
      setMsgs((m) => [...m, userMsg]);
      setInput("");
      setLoading(true);

      const apiMessages = [...historyBefore, userMsg].map((m) => ({
        role: m.role,
        content: m.text,
      }));

      const fromApi = await fetchAssistantReply(apiMessages);
      const replyText = fromApi ?? replyFor(t);

      setMsgs((m) => [...m, { role: "assistant", text: replyText }]);
      setLoading(false);
    },
    [loading, msgs],
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  return (
    <div className="fixed bottom-6 right-6 z-[45] flex flex-col items-end gap-3 pointer-events-none">
      {open && (
        <div className="pointer-events-auto w-[min(100vw-2rem,400px)] overflow-hidden rounded-3xl border border-border/80 bg-card/95 shadow-[var(--shadow-lift)] backdrop-blur-xl animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-primary-soft/80 to-cream/50 px-4 py-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-semibold text-foreground">Campus assistant</p>
              <p className="text-[11px] text-muted-foreground">
                {assistantEndpointRemote
                  ? "Using your VITE_ASSISTANT_API_URL · errors show in chat if the API fails"
                  : "Dev: AI via /api/chat + OPENAI_API_KEY. If you only see generic replies, check quota/billing at platform.openai.com."}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-full"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="h-[min(52vh,380px)] px-3 py-3">
            <div className="flex flex-col gap-3 pr-2">
              {msgs.map((m, i) => (
                <ChatMessage key={i} {...m} />
              ))}
              <div ref={endRef} />
            </div>
          </ScrollArea>

          <div className="flex flex-wrap gap-1.5 border-t border-border/60 bg-cream/30 px-3 py-2">
              {QUICK.map((q) => (
              <button
                key={q}
                type="button"
                disabled={loading}
                onClick={() => void send(q)}
                className="rounded-full border border-border bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask about verification, matches…"
              className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none ring-primary/30 focus:ring-2"
              aria-label="Message"
            />
            <Button
              type="submit"
              size="icon"
              className="h-11 w-11 shrink-0 rounded-full"
              disabled={loading}
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex items-center justify-between gap-2 border-t border-border/60 px-3 py-2 text-[11px] text-muted-foreground">
            <Link to="/marketplace" className="font-medium text-primary hover:underline">
              Marketplace
            </Link>
            <a
              href={FB_MESSENGER_CHAT_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Messenger
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-[var(--shadow-lift)] transition-transform hover:scale-105 active:scale-95",
          open && "ring-4 ring-primary/25",
        )}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
