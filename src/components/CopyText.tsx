"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { CheckCheck, Copy } from "lucide-react";

type ExtractProps = {
  ExtractedText: string;
};
const CopyText = ({ ExtractedText }: ExtractProps) => {
  const [copy, setCopied] = useState<"Copy" | "Copied">("Copy");

  const HandleButton = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied("Copied");
    setTimeout(() => setCopied("Copy"), 3000);
  };
  return (
    <Button
      className="h-4 w-6 p-0 border-neutral-700"
      variant={"custom"}
      size="sm"
      onClick={() => {
        HandleButton(ExtractedText);
        setCopied("Copied");
      }}
    >
      {copy === "Copy" ? <Copy size={3} /> : <CheckCheck size={3} />}
    </Button>
  );
};

export default CopyText;
