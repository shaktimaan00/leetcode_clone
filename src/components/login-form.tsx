// "use client"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Link from "next/link"
// import { useState } from "react"

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     console.log(email, password)
//     const response = await fetch("/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })
//     if (response.ok) {
//       const data = await response.json()
//       console.log(data)
//       window.location.href = "/problems"
//     }
//   }

//   return (
//     <div className={cn("flex flex-col gap-6 caret-white", className)} {...props}>
//       <Card className="bg-black border-neutral-800">
//         <CardHeader>
//           <CardTitle className="text-2xl text-gray-100">Login</CardTitle>
//           <CardDescription className="text-gray-300">
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="email" className="text-gray-100">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="border-neutral-700 text-gray-100"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center">
//                   <Label htmlFor="password" className="text-gray-100">Password</Label>
//                   <a
//                     href="#"
//                     className="text-gray-300 ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <Input 
//                   id="password" 
//                   placeholder="password" 
//                   type="password" 
//                   className="border-neutral-700 text-gray-100" 
//                   required
//                   onChange={(e) => setPassword(e.target.value)} 
//                 />
//               </div>
//               <Button type="submit" className="w-full">
//                 Login
//               </Button>
//               <Button variant="outline" className="w-full">
//                 Login with Google
//               </Button>
//             </div>
//             <div className="text-slate-300 mt-4 text-center text-sm">
//               Don&apos;t have an account?{" "}
//               <Link href="/auth/signup" className="underline underline-offset-4">
//                 Sign up
//               </Link>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


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
import Link from "next/link"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        window.location.href = "/problems"
      } else {
        const errorData = await response.json()
        setError(errorData.error || "An error occurred")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 caret-white", className)} {...props}>
      <Card className="bg-black border-neutral-800">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-100">Login</CardTitle>
          <CardDescription className="text-gray-300">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && <div className="text-red-500">{error}</div>}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-100">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-neutral-700 text-gray-100"
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-100">Password</Label>
                  <a
                    href="#"
                    className="text-gray-300 ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  placeholder="password" 
                  type="password" 
                  className="border-neutral-700 text-gray-100" 
                  required
                  onChange={(e) => setPassword(e.target.value)} 
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button variant="outline" className="w-full" disabled={loading}>
                Login with Google
              </Button>
            </div>
            <div className="text-slate-300 mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}