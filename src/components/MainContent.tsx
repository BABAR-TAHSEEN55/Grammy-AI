"use client";
import * as z from "zod";

import { useChat } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  message: z.string().min(1, {
    message: "This cannot be empty",
  }),
});

const MainContent = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  // const HandleSubmit = async (data: z.infer<typeof FormSchema>) => {
  //   const response = await axios.post("/api/messages", {
  //     data,
  //   });
  //   form.reset();

  //   if (response.status == 200) {
  //     const reader = response.data.getReader();
  //   }
  // };

  const HandleSubmit = async (data: z.infer<typeof FormSchema>) => {
    await sendMessage({ text: data.message });
    form.reset();
  };

  // const HandleSubmit = async (data: z.infer<typeof FormSchema>) => {
  //   const response = await fetch("/api/messages", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ data }),
  //   });
  //   form.reset();

  //   if (!response.ok && !response.body) {
  //     alert("There is an error");
  //     return;
  //   }
  //   const reader = response.body?.getReader();
  //   if (!reader) {
  //     return;
  //   }
  //   let finalResult = "";
  //   const decoder = new TextDecoder();
  //   while (true) {
  //     const { value, done } = await reader?.read();
  //     const text = decoder.decode(value);
  //     finalResult += text;
  //     console.log(finalResult);
  //     if (done) {
  //       break;
  //     }
  //   }
  // };
  const [isFocused, setIsFocused] = useState(false);
  const { messages, sendMessage } = useChat();
  return (
    <div className="mx-auto stretch">
      {messages.map((message) => (
        <div
          key={message.id}
          className="whitespace-pre-wrap bg-pink-80 max-w-[800px] mx-auto flex flex-col"
        >
          {message.role === "user" ? (
            <div className="ml-auto border border-white/20 p-2">
              User
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                }
              })}
            </div>
          ) : (
            <div className="mr-auto border border-white/20 p-2">
              AI
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                }
              })}
            </div>
          )}

          {/*{message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}*/}
        </div>
      ))}
      <form
        onSubmit={form.handleSubmit(HandleSubmit)}
        className={` space-y-6 border dark:border-white/20 border-black/10 bg-white/10 dark:bg-black/20 backdrop-blur-xl p-4 rounded-xl lg:w-[800px] md:w-[480px] min-w-[340px] w-full shadow-xl transition-all duration-200 rela
      ${isFocused ? "ring-2 ring-black/20 dark:ring-white/20 0 border-white/20" : ""}
    `}
      >
        <Textarea
          {...form.register("message")}
          className=" text-black dark:text-white border-none shadow-none dark:placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-black/40 resize-none"
          placeholder="Enter your Query ......"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="flex items-center justify-between mt-4 ">
          <p className="text-black/80 dark:text-white/80">Hola</p>
          <Button
            type="submit"
            className="bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/10 dark:border-white/20 text-white dark:text-white"
          >
            <ChevronRight />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MainContent;
