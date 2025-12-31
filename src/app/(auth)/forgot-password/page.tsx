"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import { toast } from "sonner"
import AxiosPublic from "@/lib/AxiosPublic"


const formSchema = z.object({
  email: z.string({message:"Email Is Required."}).email("Invalid email address"),
})

const ForgotPassword = () => {
  const [loading,setLoading]=useState<boolean>(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
     
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
      try{
        setLoading(true)
        const payload={
          email:values.email
        }
        const response= await AxiosPublic.post('auth/forgot-password',payload);
         if(response.status===201){
                toast.success(response?.data?.message);
                form.reset();
              }
      }catch(error){
        toast.error("Something went wrong")

      }finally{
        setLoading(false);
      }
     
     
      
    }


  return (
    <div className="p-10 space-y-5">
      <h1 className="text-xl font-semibold text-center">Forgot Password</h1>
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
        <Button disabled={loading} className="w-full " type="submit">
          {loading ? "Waiting..." : "Reset Password"}
        </Button>
      </form>
    </Form>
    </div>
  )
}

export default ForgotPassword;
