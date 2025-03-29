import { auth } from "@/auth";
import { BlogCard } from "@/components/shared/blog-card";
import { NoBlogFound } from "@/components/shared/no-content-found";
import { prisma } from "@/lib/db";
import { userId } from "@/lib/session";
import car from "@/public/jinwoo.jpg";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Blogs = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    throw new Error("Unauthorized");
    redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  if (!user) {
    redirect("/");
  }
  const blogs = await prisma.blog.findMany({
    where: {
      userId: user.id,
    },
  });

  if (blogs.length === 0) return <NoBlogFound />;
  return (
    <div className="p-6">
      <h2 className="text-4xl font-mono font-semibold">Your blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 pb-10">
        {blogs.map((eachBlog) => (
          <BlogCard data={eachBlog} userData={user} key={eachBlog.id} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
