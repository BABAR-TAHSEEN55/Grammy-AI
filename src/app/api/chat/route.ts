import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { GetPrompt } from "@/lib/prompt";
import { perplexity } from "@ai-sdk/perplexity";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { nextImageLoaderRegex } from "next/dist/build/webpack-config";
import { NextResponse } from "next/server";

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

type MessageMetadata = {
  tone: string;
  style: string;
};
type MessagePart = {
  type: string;
  text: string;
};
type SessionReturn = {
  id: string;
};
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  // Get the User Session
  const session = await auth();
  const userId = (session?.user as SessionReturn).id;

  const LastUserMsg = messages.find((msg) => msg.role === "user");

  const metadata = LastUserMsg!.metadata as MessageMetadata;
  console.log(metadata);
  const GetTone = metadata.tone || "casual";
  const GetStyle = metadata.style;
  console.log(GetTone);
  console.log(GetStyle);

  // const GetTone = LastUserMsg?.metadata || "casual";
  // console.log(GetTone);
  const Prompt = GetPrompt(GetStyle, GetTone);
  console.log(Prompt);
  const UserMessage = (messages[messages.length - 1].parts[0] as MessagePart)
    .text;

  await db.chatHistory.create({
    data: {
      Chats: UserMessage,
      userId,
    },
  });

  const SystemPrompt: UIMessage = {
    id: "1",
    role: "system",
    parts: [
      {
        type: "text",
        text: `You are an expert message refiner.
        Only reply with a refined version of the user's message, making it clearer, more concise, and use a ${GetTone} tone.
        Format your response specifically for the ${GetStyle} platform.
        If the user's message is not a request for refinement, respond with: "Sorry, I only refine messages."

        Do not provide explanations, formatting, or additional comments.
        Don't use Markdown , asterisks
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

export const GET = async () => {
  const session = await auth();
  const UserSessionId = session?.user?.id;
  if (!UserSessionId) return NextResponse.json({ Chats: [] });
  const chats = await db.chatHistory.findMany({
    where: { userId: UserSessionId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ chats });
};
