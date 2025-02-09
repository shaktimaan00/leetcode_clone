"use client"
import Link from "next/link"
import { UserCircle } from "lucide-react"
import { useEffect, useState } from "react"
// import { ProfileDropdownMenu } from "./profileDropdown"
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
import { useRouter } from "next/navigation"


export default function Navigation() {
  interface User {
    username: string;
  }

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/me", { cache: "no-store" })
        if (response.ok) {
          const data = await response.json()
          setUser(data.userData)
        }
      } catch (error) {
        throw new Error("Failed to fetch user")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        setUser(null)
        router.refresh()
      } else {
        const errorData = await response.json()
        console.log(errorData.error)
      }
    } catch (error) {
      console.log("Failed to logout")
    }
  }

  return (
    <nav className="bg-black text-gray-300 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            LeetCode
          </Link>
          <div className="space-x-4 flex items-center">
            <Link href="/problems" className="text-gray-300 hover:text-orange-500">
              Problems
            </Link>
            <Link href="#" className="text-gray-300 hover:text-orange-500">
              Explore
            </Link>
            <Link href="#" className="text-gray-300 hover:text-orange-500">
              Discuss
            </Link>
            {loading ? (
              <div>Loading...</div>
            ) : user ? (
              <div className="relative group">
                {/* <button className="flex items-center space-x-1 text-gray-300 hover:text-orange-500">
                  <UserCircle className="w-6 h-6" />
                  <span>{user.username}</span>
                </button> */}
                {/* <ProfileDropdownMenu username={user.username} /> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <button className="flex items-center space-x-1 text-gray-300 hover:text-orange-500 focus:outline-none">
                          <UserCircle className="w-6 h-6" />
                          <span>{user.username}</span>
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
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="hover:text-gray-300 text-orange-400">
                  Login
                </Link>
                <p>or</p>
                <Link href="/auth/signup" className="hover:text-gray-300 text-orange-400">
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

