import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const values = await req.json();
    if (!values.title) {
      return new NextResponse("Missing fields", { status: 422 });
    }
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
        idPublished: false,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { blogId } = await params;

    const deletedBlog = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });

    return NextResponse.json(deletedBlog);
  } catch (error) {
    console.log("[DELETE_ROUTE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
