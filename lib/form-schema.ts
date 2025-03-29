import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "password required",
  }),
});

export const signupSchema = z
  .object({
    username: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach error to confirmPassword field
  });

export type SignupSchema = z.infer<typeof signupSchema>;

export const signupBackendSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const editorSchema = z.object({
  title: z.string().min(1, { message: "Cannot be empty" }),
  content: z.string().min(1, { message: "Cannot be empty" }),
});

export type EditorSchema = z.infer<typeof editorSchema>;

export const blogFormSchema = z.object({
  title: z.string().min(2, {
    message: "Minimum 2 characters",
  }),
});

export type BlogFormSchema = z.infer<typeof blogFormSchema>;

export const blogSchema = z.object({
  title: z.string().min(2, {
    message: "Minimum 2 characters",
  }),
  content: z.string().min(50, {
    message: "Minimum 50 charcters",
  }),
});
