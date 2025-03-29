import { MainBlogComponent } from "@/components/shared/main-blog-component";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import NoContentFound from "@/public/no-content.jpg";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  if (!blog) return <NoBlogFound />;

  const sanitizedBlog = {
    ...blog,
    createdAt: blog.createdAt.toDateString(),
    content: blog.content ?? "",
    user: {
      image: blog.user.image ?? "/unknown-user.png",
      name: blog.user.name ?? "Unknown Author",
    },
  };
  return (
    <div className="mx-0 mt-8 md:mt-16 md:mx-6 xl:mx-auto xl:max-w-3xl">
      <MainBlogComponent data={sanitizedBlog} />
    </div>
  );
}

const NoBlogFound = () => {
  return (
    <div className="h-full flex flex-col gap-y-2 items-center justify-center">
      <Image
        src={NoContentFound}
        alt="no-content-found"
        width={400}
        height={400}
      />
      <Link href={"/write"}>
        <Button variant={"secondary"}>Create Blog</Button>
      </Link>
    </div>
  );
};
