"use client"
import { SignUpForm } from "@/components/signup-form";

export default function SignUp(){
    return (
        <div className="bg-black flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignUpForm />
            </div>
        </div>
    );
}

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
// import { useState } from "react"
// import { useRouter } from "next/router"

// export default function SignUpForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     console.log(username, email, password)
//     const response = await fetch("/api/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, email, password }),
//     })
//     if (response.ok) {
//       const data = await response.json()
//       console.log(data)
//       router.push("/login")
//     }
//   }

//   return (
//     <div className={cn("flex flex-col gap-6 caret-neutral-300", className)} {...props}>
//       <Card className="bg-black border-neutral-800">
//         <CardHeader>
//           <CardTitle className="text-2xl text-gray-100">Sign Up</CardTitle>
//           <CardDescription className="text-gray-300">
//             Enter your details below to create an account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="username" className="text-gray-100">Username</Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="John Doe"
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                   className="border-neutral-700 text-gray-100"
//                 />
//               </div>
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
//                   {/* <a
//                     href="#"
//                     className="text-gray-300 ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a> */}
//                 </div>
//                 <Input 
//                   id="password" 
//                   placeholder="password" 
//                   onChange={(e) => setPassword(e.target.value)} 
//                   type="password" 
//                   className="border-neutral-700 text-gray-100" 
//                   required 
//                 />
//               </div>
//               <Button type="submit" className="w-full hover:bg-gray-900">
//                 SignUp
//               </Button>
//               <Button variant="outline" className="w-full">
//                 SignUp with Google
//               </Button>
//             </div>
//             <div className="text-slate-300 mt-4 text-center text-sm">
//               have an account?{" "}
//               <a href="/auth/login" className="underline underline-offset-4">
//                 login
//               </a>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
