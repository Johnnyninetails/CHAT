import { OpenAI } from 'openai'
import { streamText } from 'ai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function POST(req: Request) {
  const { messages, systemPromptKey } = await req.json()

  const prompts: Record<string, string> = {
    nichescore: "You are NicheScoreGPT, an expert in digital niche evaluation.",
    startupcritic: "You are StartupCriticGPT, a brutally honest startup idea evaluator.",
    default: "You are a helpful assistant."
  }

  const system = prompts[systemPromptKey] || prompts.default

  const result = await streamText({
    model: "gpt-4o",
    messages,
    system
  })

  return result.toDataStreamResponse()
}
