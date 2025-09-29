"use client";
import * as z from "zod";

import { useChat } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { CheckCheck, ChevronRight, Copy, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ScrollArea } from "./ui/scroll-area";
import CustomDropDown from "./CustomDropDown";

const FormSchema = z.object({
  message: z.string().min(1, {
    message: "This cannot be empty",
  }),
});

const MainContent = () => {
  const [copy, setCopied] = useState<"Copy" | "Copied">("Copy");
  const [tone, setTone] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const HandleButton = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setTimeout(() => setCopied("Copy"), 3000);
  };

  const [isFocused, setIsFocused] = useState(false);
  const { messages, sendMessage } = useChat();

  const HandleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    await sendMessage({ text: data.message, metadata: tone });
    setLoading(false);

    form.reset();
  };

  const latestMessage = [...messages]
    .reverse()
    .find((msg) => msg.role == "assistant");
  const ExtractedText =
    latestMessage?.parts
      .filter((part) => part.type == "text")
      .map((part) => part.text)
      .join(" ") ?? "";

  return (
    <div className="mx-auto stretch">
      <form
        onSubmit={form.handleSubmit(HandleSubmit)}
        className={` space-y-6 border dark:border-white/20 border-black/10 bg-white/10 dark:bg-black/20 backdrop-blur-xl p-4 rounded-xl lg:w-[900px] md:w-[480px] min-w-[340px] w-full shadow-xl transition-all duration-200
      ${isFocused ? "ring-2 ring-black/20 dark:ring-white/20 0 border-white/20" : ""}
    `}
      >
        <Textarea
          {...form.register("message")}
          className=" text-black dark:text-white border-none shadow-none dark:placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-black/40 resize-none max-h-[400px] "
          placeholder="Enter your Query ......"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="flex items-center justify-between mt-4 ">
          {/*How to lift state up ? */}
          <CustomDropDown tone={tone} setTone={setTone} />

          <Button
            type="submit"
            className="bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/10 dark:border-white/20 text-white dark:text-white"
            // onClick={async () => {
            //   setComplete(true);
            //   setTimeout(() => setComplete(false), 3000);
            // }}
            // disabled={loading}
          >
            {/*{complete == true ? (
              <div className="size-1.5 bg-white animate-pulse"></div>
            ) : (
              <ChevronRight />
            )}*/}
            {loading ? (
              // <div className="size-1.5 bg-white animate-pulse" />
              <Loader2 className="animate-spin" />
            ) : (
              <ChevronRight />
            )}
          </Button>
        </div>
      </form>

      {latestMessage && (
        <div>
          <div className="py-2">
            <Button
              className="flex ml-auto "
              variant={"custom"}
              onClick={() => {
                HandleButton(ExtractedText);
                setCopied("Copied");
              }}
            >
              {copy == "Copy" ? <Copy size={20} /> : <CheckCheck size={20} />}
            </Button>
          </div>
          <div className="whitespace-pre-wrap  max-w-[900px] mx-auto flex flex-col">
            <div className="mr-auto p-2 mb-2 w-full rounded-xl ">
              {latestMessage.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <ScrollArea
                        className=" w-full rounded-md border p-4 "
                        key={`${latestMessage.id}-${i}`}
                      >
                        {/*// This works*/}
                        <div className="max-h-[13rem]">{part.text}</div>
                      </ScrollArea>
                    );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
