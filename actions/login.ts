"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/lib/form-schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function onLoginSubmit(values: {
  email: string;
  password: string;
}) {
  const { email, password } = loginSchema.parse(values);
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: true, message: "Invalid credentials" };
        default:
          return { error: true, message: "Something went wrong" };
      }
    }
    throw error;
  }
}
