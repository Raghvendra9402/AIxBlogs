"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, SignupSchema } from "@/lib/form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAuthModalStore } from "@/lib/authModalState";
import toast from "react-hot-toast";
import { signupOnSubmit } from "@/actions/user";

export function SignupForm() {
  const openModal = useAuthModalStore((state) => state.openModal);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const { isSubmitting, isValid } = form.formState;
  async function onSubmit(values: SignupSchema) {
    const { confirmPassword, ...remainingValues } = values;
    const toastId = toast.loading("Creating account...");
    try {
      const res = await signupOnSubmit(remainingValues);
      if (res?.success) {
        toast.success(res.message, { id: toastId });
        openModal("login");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute size-4 top-2.5 left-2 text-gray-400" />
                  <Input
                    placeholder="John Doe"
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
              <p className="text-xs text-gray-500 mt-2">
                Password must contain at least 8 characters including uppercase,
                lowercase, number, and special character.
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute size-4 top-2.5 left-2 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="********"
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
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full cursor-pointer"
        >
          Register
        </Button>
        <div className="text-xs flex items-center justify-center gap-1">
          <span>Already have an account?</span>
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto text-xs cursor-pointer"
            onClick={() => openModal("login")}
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
