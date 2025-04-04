import { auth } from "@/auth";
import { BlogForm } from "@/components/shared/blog-form";
import { CardWrapper } from "@/components/shared/CardWrapper";
import { prisma } from "@/lib/db";
import { getUserByEmail } from "@/lib/getUserByEmail";
import { userId } from "@/lib/session";
import { redirect } from "next/navigation";

const Write = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="h-full flex items-center justify-center">
      <CardWrapper title="Create Blog">
        <BlogForm
          categoryData={categories}
          categoryOptions={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </CardWrapper>
    </div>
  );
};

export default Write;
