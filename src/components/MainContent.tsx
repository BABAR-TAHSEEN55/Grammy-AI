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
import SocialStyle from "./SocialStyle";
import { useContextContext } from "./UserContextProvider";
import { FormSchema } from "../../schema";

import { Alert, AlertDescription } from "./ui/alert";

import CustomRedirect from "./CustomRedirect";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const MainContent = () => {
  const [copy, setCopied] = useState<"Copy" | "Copied">("Copy");
  const [tone, setTone] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState<string>("");
  const { context } = useContextContext();
  const [isFocused, setIsFocused] = useState(false);

  // const { messages, sendMessage, error } = useChat();
  const { messages, sendMessage } = useChat({
    onError: (error) => {
      setLoading(false);

      if (error.message.includes("No credits")) {
        setError("No credits remaining. Please sign in for unlimited access.");
      } else {
        setError("An error occurred. Please try again.");
      }
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const HandleButton = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied("Copied");
    setTimeout(() => setCopied("Copy"), 3000);
  };

  // Debug
  // useEffect(() => {
  //   console.log("TOne Changed to :", tone);
  // }, [tone]);
  const HandleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setError("");
    setLoading(true);
    try {
      await sendMessage({
        text: data.message,
        metadata: { tone, style, context },
      });
    } catch (err) {
      console.log("Error occured while getting ...", err);
    } finally {
      setLoading(false);
      // form.reset();
    }
  };

  const latestMessage = [...messages]
    .reverse()
    .find((msg) => msg.role === "assistant");

  const ExtractedText =
    latestMessage?.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ") ?? "";

  return (
    <div className="mx-auto stretch">
      {Error && (
        <Alert variant="destructive" className="mb-4 max-w-[900px] mx-auto">
          <AlertDescription className="flex items-center justify-between">
            <span>{Error}</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Credits Display */}
      {/*{!session?.user && (
            <div className="mb-4 max-w-[900px] mx-auto text-sm text-muted-foreground">
              <span>Free trial: 1 message</span>
              <span className="ml-2">•</span>
              <span className="ml-2">Sign in for unlimited access</span>
            </div>*/}
      <form
        onSubmit={form.handleSubmit(HandleSubmit)}
        className={`space-y-6 border dark:border-white/20 border-black/10 bg-white/10 dark:bg-black/20 backdrop-blur-xl p-4 rounded-xl lg:w-[900px] md:w-[480px] min-w-[340px] w-full shadow-xl transition-all duration-200
          ${isFocused ? "ring-2 ring-black/20 dark:ring-white/20 border-white/20" : ""}

        `}
        // style={{ background: "green" }}

        // style={{
        //   background:
        //     "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        // }}
      >
        <Textarea
          {...form.register("message")}
          className="text-black dark:text-white border-none shadow-none dark:placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-black/40 resize-none max-h-[400px]"
          placeholder="Enter your Query ......"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1">
            <CustomDropDown tone={tone} setTone={setTone} />
            <SocialStyle setStyle={setStyle} style={style} />
          </div>
          <Button
            type="submit"
            className="bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/10 dark:border-white/20 text-white dark:text-white not-dark:bg-primary"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : <ChevronRight />}
          </Button>
        </div>
      </form>

      {latestMessage && (
        <div>
          <div className="whitespace-pre-wrap max-w-[900px] mx-auto flex flex-col">
            <div className="mr-auto p-2 mb-2 w-full rounded-xl">
              {/*Copy Button*/}
              <div className="py-2" />
              <ScrollArea className="max-h-[200px] w-full rounded-md border border-black/20 dark:border-white/20 p-4 overflow-y-auto">
                <div className="flex justify-end mb-2 gap-4 ">
                  <Button
                    className="h-8 w-8 p-0 border-neutral-700"
                    variant={"custom"}
                    size="sm"
                    onClick={() => {
                      HandleButton(ExtractedText);
                      setCopied("Copied");
                    }}
                  >
                    {copy === "Copy" ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Copy size={14} />
                        </TooltipTrigger>
                        <TooltipContent>Copy</TooltipContent>
                      </Tooltip>
                    ) : (
                      <CheckCheck size={14} />
                    )}
                  </Button>

                  <CustomRedirect
                    type="Twitter"
                    RedirectedText={ExtractedText}
                  />
                  <CustomRedirect
                    type="Linkedin"
                    RedirectedText={ExtractedText}
                  />
                  {/*<Button
                    className="h-8 w-8 p-0 border-neutral-700"
                    variant={"custom"}
                    size="sm"
                  >
                    <Link
                      href={`https://x.com/compose/post?text=${ExtractedText}`}
                    >
                      <X size={14} />
                    </Link>
                  </Button>*/}
                </div>
                <div>
                  {latestMessage.parts
                    .filter((part) => part.type === "text")
                    .map((part, i) => (
                      <div key={i}>{part.text}</div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
