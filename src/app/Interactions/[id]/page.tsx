// import Copy from "@/components/Copy";
import CopyText from "@/components/CopyText";

import { GetChatById } from "@/prisma";

type ResponseType = {
  AiResponse?: string;

  Chats: string;
  id: string;
  createdAt: Date;
};
const ChatsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const Response = (await GetChatById({ id })) as ResponseType | null;

  return (
    <div className="h-[650px] w-full p-4">
      <div className="max-w-4xl mx-auto h-full">
        <h1 className="text-2xl font-bold mb-4">Chat History</h1>
        <div className="h-full overflow-y-auto space-y-4">
          {Response ? (
            <>
              <div className="flex justify-end">
                <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg border  dark:text-white text-black  border-black/20 dark:border-white/20  ">
                  <p className="text-sm py-3">{Response.Chats}</p>
                  <span className="text-xs opacity-70 flex justify-between items-center ">
                    {new Date(Response.createdAt).toLocaleTimeString()}
                    {/*<Copy />*/}
                    <CopyText ExtractedText={Response.Chats} />
                  </span>
                </div>
              </div>

              {Response?.AiResponse && (
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg border  dark:text-white text-black  border-black/20 dark:border-white/20   shadow-2xl">
                    <p className="text-sm py-3">{Response?.AiResponse}</p>
                    <span className="text-xs opacity-70 flex justify-between items-center ">
                      {new Date(Response.createdAt).toLocaleTimeString()}
                      {/*<Copy />*/}
                      <CopyText ExtractedText={Response?.AiResponse} />
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500">
              No chat history found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
