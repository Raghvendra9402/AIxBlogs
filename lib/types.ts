import { Prisma } from "@prisma/client";

export const userDataSelect = {
  id: true,
  name: true,
  image: true,
} satisfies Prisma.UserSelect;

export const blogDataInclude = {
  user: {
    select: userDataSelect,
  },
} satisfies Prisma.BlogInclude;

export type BlogData = Prisma.BlogGetPayload<{
  include: typeof blogDataInclude;
}>;

export interface BlogsPage {
  blogs: BlogData[];
  nextCursor: string | null;
}
