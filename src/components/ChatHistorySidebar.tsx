"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Skeleton } from "./ui/skeleton";
type Chats = {
  Chats: string;
  id: string;
};
const ChatHistorySIdebar = () => {
  const { state } = useSidebar();
  const { data: session } = useSession();
  const FetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const res = await axios.get(`/api/chat`);
    return res.data.chats;
  };

  const { data, isLoading } = useQuery<Chats[]>({
    queryKey: ["chats", session?.user?.id],
    queryFn: FetchData,
    enabled: !!session?.user,
  });

  if (isLoading) {
    return (
      <SidebarGroup>
        <Skeleton className="h-[20px] w-[100px] rounded-full" />
      </SidebarGroup>
    );
  }

  return (
    <SidebarMenu>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Chats
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              {/*<SidebarMenuItem>asdfasd</SidebarMenuItem>*/}

              {data?.map((data) => (
                <SidebarMenuItem key={data.id} className="line-clamp-2">
                  <SidebarMenuButton>
                    <Link href={`/chats/${data.id}`}>
                      {state == "collapsed" ? (
                        // <p></p>
                        <></>
                      ) : (
                        <span className="flex flex-col ">
                          {data.Chats.length > 10
                            ? data.Chats.slice(0, 20) + "...."
                            : data.Chats}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </SidebarMenu>
  );
};

export default ChatHistorySIdebar;
