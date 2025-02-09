"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function ProfileDropdownMenu(params: { username: string }) {
    const router = useRouter()
    const handleLogout = async () => {  
        try {
            const response = await fetch("/api/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                router.push("/") // Navigate to a different page
                setTimeout(() => {
                    router.push("/problems") // Navigate back to the home page to refresh the navbar
                }, 100)
            } else {
                const errorData = await response.json()
                console.log(errorData.error)
            }
        } catch (error) {
            console.error("Failed to logout")
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-gray-300 hover:text-orange-500 focus:outline-none">
                    <UserCircle className="w-6 h-6" />
                    <span>{params.username}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem disabled>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem disabled>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger >Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem disabled>Email</DropdownMenuItem>
                                <DropdownMenuItem disabled>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem disabled>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem disabled>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>GitHub</DropdownMenuItem>
                <DropdownMenuItem disabled>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
