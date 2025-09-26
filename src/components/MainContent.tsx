"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";
const MainContent = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={`border dark:border-white/20 border-black/10 bg-white/10 dark:bg-black/20 backdrop-blur-xl p-4 rounded-xl lg:w-[800px] shadow-xl transition-all duration-200
        ${isFocused ? "ring-2 ring-black/20 dark:ring-white/20 0 border-white/20" : ""}
      `}
    >
      <Textarea
        className="text-black dark:text-white border-none shadow-none dark:placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-black/40 resize-none"
        placeholder="Enter your Query ......"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="flex items-center justify-between mt-4">
        <p className="text-black/80 dark:text-white/80">Hola</p>
        <Button className="bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/10 dark:border-white/20 text-white dark:text-white">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default MainContent;
