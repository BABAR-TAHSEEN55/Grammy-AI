"use client";
import { History, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Loader from "./Loader.tsx";

const UserProfile = () => {
    const { data, status } = useSession();
    if (status === "loading") {
        return <Loader />;
    }

    return (
        <div className="flex items-center gap-4">
            {data ? (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size={"icon"} variant={"outline"}>
                                {/*<SquareMenu />*/}

                                <Avatar>
                                    <AvatarImage
                                        src={
                                            data.user?.image ||
                                            "https://github.com/shadcn.png"
                                        }
                                    />
                                    <AvatarFallback>
                                        {data.user?.name
                                            ?.slice(0, 2)
                                            .toUpperCase() || "CN"}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                {data.user?.name}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <History />
                                History
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() => signOut()}
                            >
                                <LogOut />
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                <Button onClick={() => signIn("google")}>Login</Button>
            )}
        </div>
    );
};
export default UserProfile;
