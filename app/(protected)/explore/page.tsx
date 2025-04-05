import GetBlogs from "@/components/shared/get-blogs";
import { prisma } from "@/lib/db";

const Explore = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-3xl font-mono font-semibold">Explore Blogs</h2>
      <div className="h-full mt-8 pb-10">
        <GetBlogs categoriesData={categories} />
      </div>
    </div>
  );
};

export default Explore;
