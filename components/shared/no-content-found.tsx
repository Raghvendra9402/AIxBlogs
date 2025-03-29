import Image from "next/image";
import NoContent from "@/public/no-content.jpg";
import { Button } from "../ui/button";
import Link from "next/link";

export function NoBlogFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
      <Image src={NoContent} alt="no-blog-found" width={400} height={400} />
      <Link href={"/write"}>
        <Button>Start your blog journey</Button>
      </Link>
    </div>
  );
}
