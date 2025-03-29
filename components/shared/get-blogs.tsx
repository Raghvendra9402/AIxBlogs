"use client";

import kyInstance from "@/lib/kyInstance";
import { Blog } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { BlogsPage } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { InfiniteScrollContainer } from "./infinite-scroll-container";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NoContent from "@/public/no-content.jpg";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default function GetBlogs() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["blog"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/blogs",
          pageParam
            ? {
                searchParams: {
                  cursor: pageParam,
                },
              }
            : {}
        )
        .json<BlogsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const blogs = data?.pages.flatMap((page) => page.blogs) || [];
  if (status === "pending") {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader className="size-6 animate-spin" />
      </div>
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
      <div className="h-full flex flex-col gap-y-2 items-center justify-center">
        <Image src={NoContent} alt="no-blogs" width={400} height={400} />
        <Link href={"/write"}>
          <Button variant={"outline"} size={"lg"}>
            No blogs found. press to create one?
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {blogs.map((blog) => (
        <Card key={blog.id} className="my-2">
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-sm text-slate-400">
                {formatDistanceToNow(blog.createdAt, { addSuffix: true })}
              </span>
              {blog.updatedAt > blog.createdAt && (
                <Badge variant={"outline"}>Edited</Badge>
              )}
              <Link href={`/explore/blogs/${blog.slug}`}>
                <Button>Read</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader className="size-6 animate-spin" />
        </div>
      )}
    </InfiniteScrollContainer>
  );
}
