"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AxiosPublic from "@/lib/AxiosPublic";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z
  .object({
    password: z
      .string({ message: "Password is required" })
      .min(6)
      .regex(/[A-Z]/, "At least one uppercase")
      .regex(/[a-z]/, "At least one lowercase")
      .regex(/[0-9]/, "At least one number")
      .regex(/[!"#$%&'()*+,-/:;<=>?@[\]^_`{|}~]/, "At least one special character"),
    confirmPassword: z.string({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true); // Token যাচাই চলাকালীন
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const response = await AxiosPublic.post(
          "auth/verify-forgot-password-token",
          { token }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          setUserId(response.data.userId);
        }
      } catch (error) {
        toast.error(
          axios.isAxiosError(error)
            ? error.response?.data?.error || "Something went wrong"
            : "Unknown error"
        );
        router.push("/forgot-password");
      } finally {
        setVerifying(false); // Token যাচাই শেষ
      }
    };
    verifyToken();
  }, [token, router]);

  const form = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await AxiosPublic.post("auth/reset-password", {
        userId,
        password: values.password,
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        form.reset();
        router.push("/login");
      }
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.error || "Something went wrong"
          : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <p className="text-center text-lg font-medium">
        Verifying token, please wait...
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    disabled={loading}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    {...field}
                  />
                  <p className="-mx-6 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    disabled={loading}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...field}
                  />
                  <p
                    className="-mx-6 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Loading..." : "Update Password"}
        </Button>
      </form>
    </Form>
  );
}
