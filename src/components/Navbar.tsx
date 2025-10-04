"use client";

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "./ui/sidebar";
import UserProfile from "./UserProfile";
import { Moon, Sun } from "lucide-react";

import Context from "./Context";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const HandleToggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 z-50">
      <div className="flex gap-2 justify-center items-center ">
        <SidebarTrigger />
        <p className="font-mono">Grammy Ai</p>
      </div>
      <div className="flex items-center justify-center  gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" onClick={HandleToggleTheme}>
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <Context />

        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
