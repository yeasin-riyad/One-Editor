"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import AxiosPublic from "@/lib/AxiosPublic";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const formSchema = z
  .object({
    password: z
      .string({ message: "Password Is Required." })
      .min(6, "Password Must be Atleast 6 Character")
      .regex(/[A-Z]/, "Password Atleast One UpperCase")
      .regex(/[a-z]/, "Passord Atleast One LowerCase")
      .regex(/[0-9]/, "Password Atleast One Number")
      .regex(
        /[!"#$%&'( )*+, -/:;<=>?@[\]^_`{|}~]/,
        "Password Atleast One Special Character"
      ),
    confirmPassword: z.string({ message: "Confirm Password Is Required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password did not match",
    path: ["confirmPassword"],
  });

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verifyForgotPasswordToken = async () => {
    try {
      if (!token) {
        router.push("/login");
      }

      const response = await AxiosPublic.post(
        "auth/verify-forgot-password-token",
        { token }
      );
      if (response.status === 201) {
        toast.success(response?.data?.message);
        setUserId(response?.data?.userId);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Something went wrong");
      } else {
        toast.error("Unknown error occurred");
      }
      router.push("/forgot-password");
    }
  };

  useEffect(() => {
    verifyForgotPasswordToken();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      console.log(values);
      const payload = {
        userId,
        password: values.password,
      };
      const response = await AxiosPublic.post("auth/reset-password", payload);
      if (response.status === 201) {
        toast.success(response?.data?.message);
        form.reset();
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Something went wrong");
      } else {
        toast.error("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="p-10 space-y-5">
      <h1 className="text-xl font-semibold text-center">Update Password</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md mx-auto"
        >
          {/* Form Field for User Password */}
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
                      placeholder="Enter Your Password"
                      {...field}
                      value={field.value ?? ""}
                    />
                    <p
                      className="-mx-6"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Field for Confirm Password */}
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
                      placeholder="Confirm Your Password"
                      {...field}
                      value={field.value ?? ""}
                    />
                    <p
                      className="-mx-6"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            type="submit"
            className="w-full cursor-pointer"
          >
            {loading ? "Loading..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
