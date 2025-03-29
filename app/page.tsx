import { auth } from "@/auth";
import { CardWrapper } from "@/components/shared/CardWrapper";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <CardWrapper title="Title" description="This is description">
        login form
      </CardWrapper>
    </div>
  );
}
