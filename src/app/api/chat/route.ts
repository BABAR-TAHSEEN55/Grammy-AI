// import { StreamingTextResponse } from "ai";
// export const POST = async (req: Request) => {
//   const perplexity = new OpenAI({
//     apiKey: process.env.PERPLEXITY_API_KEY!,
//     baseURL: "https://api.perplexity.ai",
//   });

//   const { data } = await req.json();

//   const response = await perplexity.chat.completions.create({
//     model: "sonar-pro",
//     messages: [
//       // { role: "system", content: "You are a Genius Replier" },
//       { role: "user", content: data.message },
//     ],
//     stream: true,
//   });

//   console.log(response);
//   // return new StreamingTextResponse(response.toAIStream());
//   return new StreamingTextResponse(response);
//   // console.log(response.choices[0].meaissage.content);
//   // return new Response(data.message);
// };

// import { streamText, UIMessage, convertToModelMessages } from "ai";
// import { perplexity } from "@ai-sdk/perplexity";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: perplexity("sonar-pro"),
//     messages: convertToModelMessages(messages),
//   });

//   return result.toUIMessageStreamResponse();
// }

import { perplexity } from "@ai-sdk/perplexity";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

function normalizeMessages(messages: UIMessage[]) {
  const normalized: UIMessage[] = [];
  for (const msg of messages) {
    const last = normalized[normalized.length - 1];
    if (last && last.role === msg.role) {
      // merge content instead of pushing duplicate roles
      last.parts.push(...msg.parts);
    } else {
      normalized.push(msg);
    }
  }
  return normalized;
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const SystemPrompt: UIMessage = {
    id: "1",
    role: "system",
    parts: [
      {
        type: "text",
        text: `You are an expert message refiner.
  Only reply with a refined version of the user's message, making it clearer, more concise, and professional.
  If the user's message is not a request for refinement, respond with: "Sorry, I only refine messages."
  Do not provide explanations, formatting, or additional comments.
  Your response must always be a single line.`,
      },
    ],
  };
  const allMessages = [SystemPrompt, ...normalizeMessages(messages)];

  const result = streamText({
    model: perplexity("sonar-pro"),
    messages: convertToModelMessages(allMessages),
  });

  return result.toUIMessageStreamResponse();
}

//TODO : 1) Refine the Core SystemPrompt
// 2) Chat Interface
// 3) Storing responses
