"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CustomProps } from "@/types";

const frameworks = [
  {
    value: "friendly",
    label: "Friendly",
  },
  {
    value: "professional",
    label: "Professional",
  },
  {
    value: "persuasive",
    label: "Persuasive",
  },
  {
    value: "empathetic",
    label: "Empathetic",
  },
  {
    value: "humorous",
    label: "Humorous",
  },
];
const CustomDropDown = ({ tone, setTone }: CustomProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="custom"
            role="combobox"
            aria-expanded={open}
            className="justify-between "
          >
            {tone
              ? frameworks.find((framework) => framework.value === tone)?.label
              : "Tone"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command className="in-dark:bg-black">
            <CommandList>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    className="in-dark:bg-black text-xs md:text-base"
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setTone(currentValue === tone ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        tone === framework.value ? "opacity-100 " : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomDropDown;
