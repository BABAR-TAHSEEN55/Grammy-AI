"use client";
import * as z from "zod";

import { useChat } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { ScrollArea } from "./ui/scroll-area";
import CustomDropDown from "./CustomDropDown";

const FormSchema = z.object({
  message: z.string().min(1, {
    message: "This cannot be empty",
  }),
});

const MainContent = () => {
  // const { data } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const HandleSubmit = async (data: z.infer<typeof FormSchema>) => {
    await sendMessage({ text: data.message });
    form.reset();
  };

  const [isFocused, setIsFocused] = useState(false);
  const { messages, sendMessage } = useChat();

  // TODO : MAke this a toast Component
  // if (!data) {
  //   return <div className="bg-red-200 p-2 border">Unauthroized</div>;
  // }

  const latestMessage = [...messages]
    .reverse()
    .find((msg) => msg.role == "assistant");
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
          {/*<p className="text-black/80 dark:text-white/80">Hola</p>*/}

          <CustomDropDown />

          <Button
            type="submit"
            className="bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/10 dark:border-white/20 text-white dark:text-white"
          >
            <ChevronRight />
          </Button>
        </div>
      </form>

      {latestMessage && (
        <div className="whitespace-pre-wrap bg-pink-80 max-w-[900px] mx-auto flex flex-col">
          <div className="mr-auto p-2 mb-2 w-full rounded-xl">
            {latestMessage.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <ScrollArea
                      className="h-[200px] w-full rounded-md border p-4 bg--500"
                      key={`${latestMessage.id}-${i}`}
                    >
                      {part.text}
                    </ScrollArea>
                  );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
