import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { History } from "lucide-react";

import ChatHistorySIdebar from "./ChatHistorySidebar";

import Link from "next/link";
import { ItemProps } from "@/types";

const Items: ItemProps[] = [
  {
    title: "New Chat",
    url: "/",
    Icon: History,
  },
];
const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {/*//Change this*/}

        {/*<User2 className="mr-auto size-" />*/}
        {/*<SidebarTrigger className="ml-auto" />*/}
      </SidebarHeader>
      <SidebarContent>
        {/*Utils*/}
        <SidebarGroup>
          <SidebarGroupLabel>Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.Icon />
                      <span className="">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {/*ChatHistory */}
            <ChatHistorySIdebar />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/*<SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <CreditsSection />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>*/}
    </Sidebar>
  );
};

export default AppSidebar;
