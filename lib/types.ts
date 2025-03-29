import { Blog } from "@prisma/client";

export interface BlogsPage {
  blogs: Blog[];
  nextCursor: string | null;
}
