"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { blogFormSchema } from "@/lib/form-schema";
import slugify from "slugify";

export async function onBlogSubmit(values: { title: string }) {
  try {
    const { title, categoryId } = blogFormSchema.parse(values);
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingBlog = await prisma.blog.findUnique({
      where: {
        slug,
      },
    });

    const uniqueSlug = existingBlog ? `${slug}-${Date.now()}` : slug;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug: uniqueSlug,
        categoryId,
        userId,
      },
    });
    return blog;
  } catch (error) {
    console.log("[BLOG_SERVER_ACTION]", error);
    return { error: true, message: "Internal Error" };
  }
}
