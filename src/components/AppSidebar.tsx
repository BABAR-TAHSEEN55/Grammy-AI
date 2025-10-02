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
  SidebarTrigger,
} from "./ui/sidebar";
import { Search } from "lucide-react";

import ChatHistorySIdebar from "./ChatHistorySidebar";

import Link from "next/link";

interface ItemProps {
  title: string;
  url: string;
  Icon: React.ComponentType;
}
const Items: ItemProps[] = [
  // {
  //   title: "New Chat",
  //   url: "/",
  //   Icon: ChartArea,
  // },

  {
    title: "Search Chat",
    url: "/",
    Icon: Search,
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
                    {/*<CommanderSideBar />*/}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Chats History</SidebarGroupLabel>

          <SidebarGroupContent>
            {/*{Items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.Icon />
                      <span className="">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}*/}
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
                  <User /> User <ChevronUp className="ml-auto" />
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
