import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { blogSchema } from "@/lib/form-schema";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const values = await req.json();

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const { blogId } = await params;
    if (!blogId) {
      return new NextResponse("Blog not found", { status: 401 });
    }

    const updatedBlog = await prisma.blog.update({
      where: {
        id: blogId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
