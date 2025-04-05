"use client";

import kyInstance from "@/lib/kyInstance";
import { BlogsPage } from "@/lib/types";
import NoContent from "@/public/no-content.jpg";
import { useInfiniteQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Heart, Loader, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { InfiniteScrollContainer } from "./infinite-scroll-container";
import { LoadingBlogsSkeleton } from "./Loading-blogs-skeleton";
import { useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface GetBlogsProps {
  categoriesData: Category[];
}
export default function GetBlogs({ categoriesData }: GetBlogsProps) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const title = searchParams.get("title");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["blogs", categoryId, title],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/blogs",
          pageParam || categoryId || title
            ? {
                searchParams: {
                  ...(pageParam && { cursor: pageParam }),
                  ...(categoryId && { categoryId }),
                  ...(title && { title }),
                },
              }
            : undefined
        )
        .json<BlogsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const blogs = data?.pages.flatMap((page) => page.blogs) || [];
  if (status === "pending") {
    return (
      // <div className="h-full flex justify-center items-center">
      //   <Loader className="size-6 animate-spin" />
      // </div>
      <>
        <SearchInput />
        <LoadingBlogsSkeleton />
        <LoadingBlogsSkeleton />
        <LoadingBlogsSkeleton />
      </>
    );
  }

  if (status === "error") {
    return (
      <div className="h-full flex justify-center items-center">
        <Button variant="destructive">Error : Can't fetch blogs</Button>
      </div>
    );
  }

  if (status === "success" && !blogs.length && !hasNextPage) {
    return (
      <>
        <SearchInput />
        <Categories items={categoriesData} />
        <div className="h-full flex flex-col gap-y-2 items-center justify-center">
          <Image src={NoContent} alt="no-blogs" width={400} height={400} />
          <Link href={"/write"}>
            <Button variant={"outline"} size={"lg"}>
              No blogs found. press to create one?
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <SearchInput />
      <Categories items={categoriesData} />
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link href={`/explore/blogs/${blog.slug}`} className="cursor-pointer">
            <div className="p-2 flex flex-col gap-y-2">
              <div className="flex items-center gap-x-6">
                <div className="flex items-center gap-x-1">
                  <Image
                    src={blog.user.image ?? "/unknown-user.png"}
                    alt="user image"
                    width={20}
                    height={20}
                  />
                  <span>{blog.user.name}</span>
                </div>

                <Button variant={"outline"}>Follow</Button>
              </div>
              <h2 className="text-2xl font-bold">{blog.title}</h2>
              <div className="flex items-center gap-x-6">
                <div className="flex items-center">
                  <Calendar className="size-4 mr-2" />
                  <span className="text-sm text-slate-600">
                    {formatDistanceToNow(blog.createdAt, { addSuffix: true })}
                  </span>
                </div>
                <Button className="flex items-center" variant={"ghost"}>
                  <Heart className="size-4 mr-2" />
                  <span className="text-sm text-slate-600">1.4K</span>
                </Button>
                <Button className="flex items-center" variant={"ghost"}>
                  <MessageCircle className="size-4 mr-2" />
                  <span className="text-sm text-slate-600">60</span>
                </Button>
              </div>
            </div>
          </Link>
          <Separator className="my-2 " />
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader className="size-6 animate-spin" />
        </div>
      )}
    </InfiniteScrollContainer>
  );
}
