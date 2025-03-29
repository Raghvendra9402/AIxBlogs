import { Blog, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import car from "@/public/jinwoo.jpg";
import { formatDistanceToNow } from "date-fns";
import BlogCardFooter from "./blog-card-footer";
import { randomImage } from "@/lib/random-image";

interface BlogCardProps {
  data: Blog;
  userData: User;
}

export function BlogCard({
  data: { title, createdAt, id, userId, idPublished, updatedAt },
  userData,
}: BlogCardProps) {
  const authorLabel = userId === userData.id ? "You" : userData.name;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
  return (
    <Link href={`/write/${id}`} key={id}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={randomImage} alt="Doodle" fill className="object-fit" />
          <Overlay />
        </div>
        <BlogCardFooter
          isPublished={idPublished}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
}

const Overlay = () => {
  return (
    <div className="opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black" />
  );
};
