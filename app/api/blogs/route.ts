import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { BlogsPage } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    if (!user) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const categoryId = req.nextUrl.searchParams.get("categoryId") || undefined;
    const title = req.nextUrl.searchParams.get("title") || undefined;
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const PAGE_SIZE = 10;

    const blogs = await prisma.blog.findMany({
      where: {
        idPublished: true,
        ...(categoryId && { categoryId }),
        ...(title && {
          title: {
            contains: title,
            mode: "insensitive",
          },
        }),
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: PAGE_SIZE + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = blogs.length > PAGE_SIZE ? blogs[PAGE_SIZE].id : null;

    const data: BlogsPage = {
      blogs: blogs.slice(0, PAGE_SIZE),
      nextCursor,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.log("[GET_BLOGS_ROUTE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
