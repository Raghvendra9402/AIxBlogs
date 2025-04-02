import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { blogId } = await params;

    if (!blogId) {
      return new NextResponse("Blog not found", { status: 422 });
    }
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!blog) {
      return new NextResponse("Blog not found", { status: 404 });
    }

    const isContentEmpty =
      !blog.content ||
      blog.content.trim() === "" ||
      blog.content ===
        JSON.stringify({ type: "doc", content: [{ type: "paragraph" }] });

    if (!blog.title || isContentEmpty) {
      return new NextResponse("Missing fields", { status: 422 });
    }

    const publishedBlog = await prisma.blog.update({
      where: {
        id: blog.id,
        userId,
      },
      data: {
        idPublished: true,
      },
    });

    return NextResponse.json(publishedBlog);
  } catch (error) {
    console.log("[PUBLISH_API_ROUTE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
