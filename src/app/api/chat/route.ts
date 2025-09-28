// import { auth } from "@/lib/auth";
// import { db } from "@/lib/db";
// import { perplexity } from "@ai-sdk/perplexity";
// import { streamText, UIMessage, convertToModelMessages } from "ai";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// function normalizeMessages(messages: UIMessage[]) {
//   const normalized: UIMessage[] = [];
//   for (const msg of messages) {
//     const last = normalized[normalized.length - 1];
//     if (last && last.role === msg.role) {
//       // merge content instead of pushing duplicate roles
//       last.parts.push(...msg.parts);
//     } else {
//       normalized.push(msg);
//     }
//   }
//   return normalized;
// }

// export async function POST(req: Request) {
//   const session = await auth();
//   if (!session) {
//     console.log("Unauthorized");
//     return new Response("Unauthorized User");
//   }

//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const SystemPrompt: UIMessage = {
//     id: "1",
//     role: "system",
//     parts: [
//       {
//         type: "text",
//         text: `You are an expert message refiner.
//   Only reply with a refined version of the user's message, making it clearer, more concise, and professional.
//   If the user's message is not a request for refinement, respond with: "Sorry, I only refine messages."
//   Do not provide explanations, formatting, or additional comments.
//   Your response must always be a single line.`,
//       },
//     ],
//   };
//   const allMessages = [SystemPrompt, ...normalizeMessages(messages)];

//   const result = streamText({
//     model: perplexity("sonar-pro"),
//     messages: convertToModelMessages(allMessages),
//   });

//   // const AIResponse = await result.text;
//   // const ChatData = JSON.stringify({
//   //   userMessage: messages[messages.length - 1]?.parts[0]?.text,
//   //   AIResponse,
//   // });

//   // if (!session.user?.id) {
//   //   console.log("No user id found in session");
//   //   return new Response("User ID missing", { status: 400 });
//   // }
//   // if (!ChatData) {
//   //   console.log("No chat data to store");
//   //   return new Response("Chat data missing", { status: 400 });
//   // }
//   // await db.chatHistory.create({
//   //   data: {
//   //     Chats: ChatData,
//   //     userId: session.user?.id,
//   //   },
//   // });

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

  // const result = streamText({
  //   model: perplexity("sonar-pro"),
  //   messages: convertToModelMessages(normalizeMessages(messages)),
  // });

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
