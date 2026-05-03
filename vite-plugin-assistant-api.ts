import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { loadEnv } from "vite";

const SYSTEM_PROMPT = `You are "Campus assistant" for SubletSync, a student housing / sublease product aimed at UT Dallas (UTD) and nearby areas (e.g. Northside, University Village, Waterview).

Rules:
- Be concise, friendly, and practical. Short paragraphs or bullets when helpful.
- Only give general guidance — never claim a specific listing exists, exact pricing, or legal advice. If unsure, say so.
- Mention .edu verification, smart matching, marketplace filters, and safety (tour before paying, in-platform messaging) when relevant.
- Do not invent URLs or guarantees.`;

function readRawBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function parseMessages(body: unknown): { role: string; content: string }[] | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw)) return null;
  const out: { role: string; content: string }[] = [];
  for (const m of raw) {
    if (typeof m !== "object" || m === null) return null;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || !content.trim()) return null;
    out.push({ role, content: content.slice(0, 8000) });
  }
  if (out.length === 0) return null;
  return out;
}

export function assistantApiPlugin(): Plugin {
  return {
    name: "subletsync-assistant-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url !== "/api/chat") {
          next();
          return;
        }
        if (req.method !== "POST") {
          sendJson(res, 405, { error: "Method not allowed" });
          return;
        }

        const mode =
          (typeof process.env.MODE === "string" && process.env.MODE) || "development";
        const env = loadEnv(mode, process.cwd(), "");
        const apiKey = env.OPENAI_API_KEY?.trim() ?? "";
        const model =
          env.OPENAI_CHAT_MODEL?.trim() || "gpt-4o-mini";

        if (!apiKey) {
          sendJson(res, 503, { reply: null, error: "OPENAI_API_KEY is not set" });
          return;
        }

        let parsed: unknown;
        try {
          parsed = JSON.parse(await readRawBody(req));
        } catch {
          sendJson(res, 400, { error: "Invalid JSON" });
          return;
        }

        const messages = parseMessages(parsed);
        if (!messages) {
          sendJson(res, 400, { error: "Expected { messages: [{ role, content }] }" });
          return;
        }

        try {
          const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages,
              ],
              max_tokens: 600,
            }),
          });

          if (!openaiRes.ok) {
            const errText = await openaiRes.text().catch(() => "");
            console.warn("[assistant-api] OpenAI error:", openaiRes.status, errText.slice(0, 500));

            let userError = "OpenAI request failed — check the terminal for details.";
            try {
              const errJson = JSON.parse(errText) as {
                error?: { message?: string; code?: string; type?: string };
              };
              const code = errJson.error?.code ?? errJson.error?.type;
              const msg = errJson.error?.message;
              if (code === "insufficient_quota" || errJson.error?.type === "insufficient_quota") {
                userError =
                  "OpenAI quota or billing limit reached. Add a payment method or credits at https://platform.openai.com/account/billing — until then, only quick answers below work.";
              } else if (msg) {
                userError = `OpenAI: ${msg}`;
              }
            } catch {
              /* keep userError */
            }

            sendJson(res, 502, { reply: null, error: userError });
            return;
          }

          const data = (await openaiRes.json()) as {
            choices?: Array<{ message?: { content?: string | null } }>;
          };
          const reply = data.choices?.[0]?.message?.content?.trim();
          if (!reply) {
            sendJson(res, 502, { reply: null, error: "Empty model response" });
            return;
          }

          sendJson(res, 200, { reply });
        } catch (e) {
          console.warn("[assistant-api]", e);
          sendJson(res, 502, { reply: null, error: "Request failed" });
        }
      });
    },
  };
}
