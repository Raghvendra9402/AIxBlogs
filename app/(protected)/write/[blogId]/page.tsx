import { auth } from "@/auth";
import { EditorForm } from "@/components/shared/editor-form";
import { prisma } from "@/lib/db";
import { getUserByEmail } from "@/lib/getUserByEmail";
import { redirect } from "next/navigation";

export default async function WriteBlog({
  params,
}: {
  params: { blogId: string };
}) {
  const { blogId } = await params;
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    throw new Error("Unauthorized");
  }
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new Error("Unauthorized");
  }

  const blog = await prisma.blog.findFirst({
    where: {
      id: blogId,
    },
  });

  if (!blog || blog.userId !== user.id) {
    redirect("/write");
  }
  return (
    <div className="p-3">
      <EditorForm data={blog} />
    </div>
  );
}
