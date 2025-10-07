import { GetChatById } from "@/prisma";

type ResponseType = {
  id: string;
  Chats: string;
  userId: string;
  createdAt: Date;
};
const ChatsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const Response: ResponseType | null = await GetChatById({ id });

  return <div className="bg-pink-400">{Response?.Chats} </div>;
};

export default ChatsPage;
