import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { GetPrompt } from "@/lib/prompt";
import { MessageMetadata, MessagePart, SessionReturn } from "@/types";
import { perplexity } from "@ai-sdk/perplexity";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { cookies } from "next/headers";

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

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const CookieStore = await cookies();

  // Get the User Session
  const session = await auth();

  if (!session?.user?.id) {
    const AnonCredits = CookieStore.get("AnonCredits")?.value;
    if (AnonCredits === "0") {
      return NextResponse.json(
        {
          error: "No credits remaining. Please sign in for unlimited access.",
          creditsRemaining: 0,
        },
        { status: 403 },
      );
    }
    CookieStore.set("AnonCredits", "0", {
      path: "/",
      httpOnly: true,
      secure: true,
    });
  }

  const userId = session?.user?.id ? (session.user as SessionReturn).id : null;
  const LastUserMsg = messages.reverse().find((msg) => msg.role === "user");

  const metadata = LastUserMsg!.metadata as MessageMetadata;
  console.log(metadata);
  const GetTone = metadata.tone || "casual";
  const GetStyle = metadata.style || "normal";
  const getContext = metadata.context;
  console.log(getContext);
  console.log(GetTone);
  console.log(GetStyle);
  const Prompt = GetPrompt(GetStyle, GetTone, getContext);
  const UserMessage = (messages[messages.length - 1].parts[0] as MessagePart)
    .text;

  if (userId) {
    await db.chatHistory.create({
      data: {
        Chats: UserMessage,
        userId,
      },
    });
  }

  const SystemPrompt: UIMessage = {
    id: "1",
    role: "system",
    parts: [
      {
        type: "text",
        text: Prompt,
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

//TODO :

// 2) Write a message AI Might sometimes Fumble try again to get the response Hallucination is real
// 4) LOGO Change
// 5) Message looks kinda shi~
// 6) Custom & Social Size Decrese
// 7) System default theme looks kinda ahhhhhhh
