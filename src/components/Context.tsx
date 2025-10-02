"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DotSquare } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useContextContext } from "./UserContextProvider";

const Context = () => {
  const { setContext } = useContextContext();
  const [open, setOpen] = useState(false);

  const ContextSchema = z.object({
    context: z.string().optional(),
  });

  const form = useForm<z.infer<typeof ContextSchema>>({
    resolver: zodResolver(ContextSchema),
  });

  const HandleSubmit = async (data: z.infer<typeof ContextSchema>) => {
    setContext(data.context || "");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <DotSquare />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(HandleSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Context</DialogTitle>
            <DialogDescription>
              Add more context suitable for the situation
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="context">Context</Label>
              <Input
                id="context"
                {...form.register("context")}
                defaultValue="Use Bullet points"
              />
              <DialogDescription>Ex : Use Bullet Points</DialogDescription>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Context;
