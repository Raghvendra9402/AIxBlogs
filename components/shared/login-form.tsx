"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAuthModalStore } from "@/lib/authModalState";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { onLoginSubmit } from "@/actions/login";
import { useRouter } from "next/navigation";
export function LoginForm() {
  const openModal = useAuthModalStore((state) => state.openModal);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const toastId = toast.loading("Logging in...");
    const res = await onLoginSubmit(values);
    if (res.success) {
      toast.success(res.message, { id: toastId });
      router.replace("/dashboard");
    } else if (res.error) {
      toast.error(res.message, { id: toastId });
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute size-4 top-2.5 left-2 text-gray-400" />
                    <Input
                      placeholder="johndoe@example.com"
                      {...field}
                      className="pl-8"
                      disabled={isSubmitting}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute size-4 top-2.5 left-2 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      className="pl-8"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-2.5 right-3 text-gray-400 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4 " />
                      ) : (
                        <Eye className="size-4 " />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isSubmitting || !isValid}
          >
            Login
          </Button>
          <div className="text-xs flex items-center justify-center gap-1">
            <span>Don't have an account?</span>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-xs cursor-pointer"
              onClick={() => openModal("register")}
            >
              Create Account
            </Button>
          </div>
        </div>
        {/* <div className="w-full px-5 flex items-center gap-x-1 my-4">
          <div className="h-0.5 flex-grow bg-slate-400" />
          <div className="text-slate-700">OR</div>
          <div className="h-0.5 flex-grow bg-slate-400" />
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <div className="bg-black/20 p-2 rounded-full">
            <FcGoogle className="size-6" />
          </div>
          <div className="bg-black/20 p-2 rounded-full">
            <FaGithub className="size-6" />
          </div>
        </div> */}
      </form>
    </Form>
  );
}
