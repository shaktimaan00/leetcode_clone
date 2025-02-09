"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {toast} from "react-hot-toast"
import { set } from "mongoose"

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })
  // const [username, setUsername] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(username, email, password)
    try {
      setLoading(true)
      // const response = await fetch("/api/signup", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ username, email, password }),
      // })
      const response:any = await axios.post("/api/signup", user)
      if (response) {
        console.log("response : " + response)
        // window.location.href = "/auth/login"
        toast.success("User created successfully, Please login to continue")
        router.push("/auth/login")
      } else {
        console.log("response : " + response)
        const errorData = await response.json()
        toast.error(errorData.error || "An error occurred")
      }
    } catch (err) {
      console.log("error : " + err)
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.username.length > 0 && 
      user.email.length > 0 && 
      user.password.length > 0) {
      setButtonDisabled(false)
    }
    else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className={cn("flex flex-col gap-6 caret-neutral-300", className)} {...props}>
      <Card className="bg-black border-neutral-800">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-100">Sign Up</CardTitle>
          <CardDescription className="text-gray-300">
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-gray-100">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => {setUser({...user, username: e.target.value})}}
                  required
                  disabled={loading}
                  className="border-neutral-700 text-gray-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-100">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={loading}
                  onChange={(e) => {setUser({...user, email: e.target.value})}}
                  className="border-neutral-700 text-gray-100"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-100">Password</Label>
                  {/* <a
                    href="#"
                    className="text-gray-300 ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input 
                  id="password" 
                  placeholder="password" 
                  onChange={(e) => setUser({...user, password: e.target.value})} 
                  type="password" 
                  disabled={loading}
                  className="border-neutral-700 text-gray-100" 
                  required 
                />
              </div>
              <Button 
                type="submit" 
                className={`w-full hover:bg-gray-900`}
                disabled={buttonDisabled}
                
              >
                {loading ? "Signing up..." : "SignUp"}
              </Button>
              <Button variant="outline" className="w-full">
                SignUp with Google
              </Button>
            </div>
            <div className="text-slate-300 mt-4 text-center text-sm">
              have an account?{" "}
              <a href="/auth/login" className="underline underline-offset-4">
                login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
