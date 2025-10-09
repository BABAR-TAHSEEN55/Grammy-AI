import { db } from "./lib/db";

type GetChatType = {
  id: string;
};
export const GetChatById = async ({ id }: GetChatType) => {
  return await db.chatHistory.findUnique({
    where: {
      id,
    },
  });
};
