"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const formSchema = z.object({
  email: z.string({message:"Email Is Required."}).email("Invalid email address"),
  password:z.string({message:"Password Is Required"}).min(6,"Password Will Atleast 6 Characters."),
})

const LoginPage = () => {
  const [loading,setLoading]=useState<boolean>(false);
    const [showPassword,setShowPassword]=useState<boolean>(false);
    const router=useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
     
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
     
      setLoading(true)
      const result =await signIn("credentials",{
        email:values.email,
        password:values.password,
        redirect:false,
      })
      setLoading(false)
      if(result?.error){
        toast.error(result?.error)
      }else{
        toast.success("Login Successfully..")
        router.push("/dashboard")
      }




      
      
    }


  return (
    <div className="p-10 space-y-5">
      <h1 className="text-xl font-semibold text-center">Login Account</h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Enter Your Email" {...field} value={field.value ?? ""}/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="flex items-center">
                <Input disabled={loading} type={showPassword?"text":"password"} placeholder="Enter Your Password" {...field} value={field.value ?? ""} />
                <p className="-mx-6" onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <FaEye/> :<FaEyeSlash/>}</p>

                </div>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forgot Password Link */}
        <div className="ml-auto w-fit -mt-2">
          <Link href={"/forgot-password"} className="hover:underline hover:text-primary">
          Forgot Password ?
          </Link>

        </div>

      
        <Button disabled={loading} className="w-full " type="submit">
          {loading ? "Waiting..." : "Login"}
        </Button>
      </form>
    </Form>
      
    <div className="max-w-md mx-auto">
      <p>Didn't Have Account ?{""} <Link className="text-primary drop-shadow-md" href={"/register"}>Register</Link>
      </p>

    </div>
    </div>
  )
}

export default LoginPage;
