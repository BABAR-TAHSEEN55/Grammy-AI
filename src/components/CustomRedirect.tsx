import { Linkedin, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Redirect = {
  RedirectedText: string;
  type: "Twitter" | "Facebook" | "Linkedin";
};

const CustomRedirect = ({ RedirectedText, type }: Redirect) => {
  if (type === "Twitter") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="h-8 w-8 p-0 border-neutral-700"
            variant={"custom"}
            size="sm"
          >
            <Link
              href={`https://x.com/compose/post?text=${encodeURIComponent(RedirectedText)}`}
            >
              <X size={14} />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>X</TooltipContent>
      </Tooltip>
    );
  }

  if (type === "Linkedin") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="h-8 w-8 p-0 border-neutral-700"
            variant={"custom"}
            size="sm"
          >
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://grammyai.com")}&summary=${encodeURIComponent(RedirectedText)}`}
            >
              <Linkedin size={14} />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>LinkedIn</TooltipContent>
      </Tooltip>
    );
  }
};

export default CustomRedirect;
