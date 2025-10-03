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
import { CustomProps2 } from "@/types";

const frameworks = [
  {
    value: "X/twitter",
    label: "X / Twitter",
  },

  {
    value: "X/twitter (UnRestraint)",
    label: "X/twitter (UnRestraint)",
  },
  {
    value: "Grammer Check",
    label: "Grammer Check",
  },
  {
    value: "LinkedIn",
    label: "LinkedIn",
  },
];
const SocialStyle = ({ style, setStyle }: CustomProps2) => {
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
            {style
              ? frameworks.find((framework) => framework.value === style)?.label
              : "Style"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    // className="dark:bg-black not-dark:bg-white"
                    className="in-dark:bg-black "
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setStyle(currentValue === style ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        style === framework.value
                          ? "opacity-100 "
                          : "opacity-0",
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

export default SocialStyle;
