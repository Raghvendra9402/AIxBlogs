"use server";

import { prisma } from "@/lib/db";
import { signupBackendSchema, signupSchema } from "@/lib/form-schema";
import { getUserByEmail } from "@/lib/getUserByEmail";
import bcrypt from "bcryptjs";

export async function signupOnSubmit(remainingValues: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const { username, email, password } =
      signupBackendSchema.parse(remainingValues);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });
    return { success: true, message: "Account created successfully" };
  } catch (error) {
    console.log("[SIGNUP_ACTION]", error);
  }
}
